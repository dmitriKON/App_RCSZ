package backend;

import com.sun.net.httpserver.*;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.Objects;
import java.util.concurrent.Executors;

public class MyHttpServer {

    public static final String DATABASE_NAME = "storeDB";
    static DatabaseManager database_manager = new DatabaseManager(DATABASE_NAME);
    static GoodsService goods_service = new GoodsService(database_manager);

    static GroupService group_service = new GroupService(database_manager);
    static UserService users_service = new UserService(database_manager);
    public static final int PORT = 5000;

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create();
        server.bind(new InetSocketAddress(PORT), 0);
        HttpContext context = server.createContext("/", new RequestHandler());
        context.setAuthenticator(new Auth());
        server.setExecutor(Executors.newCachedThreadPool());
        server.start();
    }


    static class RequestHandler implements HttpHandler {

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            InputStream in;
            JSONObject goods;
            JSONObject group;
            JSONParser json_parser = new JSONParser();
            String path = exchange.getRequestURI().getPath();
            String method = exchange.getRequestMethod();

            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            if (method.equalsIgnoreCase("OPTIONS")) {
                exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
                exchange.sendResponseHeaders(204, -1);
            }

            if (path.startsWith("/api/good")) {
                String[] splitted_path = path.split("/");
                String goods_name = "";
                if (splitted_path.length > 3) {
                    try {
                        goods_name = String.valueOf(splitted_path[3]);
                    } catch(NumberFormatException e) {
                        send_response("404: Resource not found", 404, exchange);
                        return;
                    }
                }
                try {
                    switch (method) {
                        case "GET":
                            if(goods_name == "all"){
                                send_response(goods_service.get_all_products().toJSONString(), 200, exchange);
                            }
                            else if (goods_name != "") {
                                send_response(goods_service.get_product_by_name(goods_name).toJSONString(), 200, exchange);
                            } else {
                                send_response("404: Resource not found", 404, exchange);
                            }
                            break;
                        case "PUT":
                            in = exchange.getRequestBody();
                            goods = (JSONObject) json_parser.parse(new InputStreamReader(in, StandardCharsets.UTF_8));

                            if (!validate_goods(goods, method)) {
                                send_response("409: Conflict - your data contains errors", 409, exchange);
                                return;
                            }
                            JSONObject goods_id = goods_service.create_new_product(goods);
                            send_response(goods_id.toJSONString(), 201, exchange);
                            return;
                        case "POST":
                            if (goods_name == "") {
                                send_response("400: Bad Request - Unspecified name in query for this endpoint", 400, exchange);
                            }
                            in = exchange.getRequestBody();
                            goods = (JSONObject) json_parser.parse(new InputStreamReader(in, StandardCharsets.UTF_8));

                            if (!validate_goods(goods, method)) {
                                send_response("409: Conflict - your data contains errors", 409, exchange);
                                return;
                            }
                            goods_service.update_product(goods_name, goods);
                            send_response("204: Updated object", 204, exchange);
                            break;
                        case "DELETE":
                            if (goods_name == "") {
                                send_response("400: Bad Request - Unspecified name in query for this endpoint", 400, exchange);
                            }

                            goods_service.delete_product(goods_name);
                            send_response("204: Deleted object", 204, exchange);
                            break;
                        default:
                            break;
                    }
                } catch (ParseException e) {
                    throw new RuntimeException(e);
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }

            }
            if (path.startsWith("/login") && Objects.equals("POST", method)) {
                try {
                    in = exchange.getRequestBody();
                    JSONObject user_json = (JSONObject) json_parser.parse(new InputStreamReader(in, StandardCharsets.UTF_8));

                    boolean verified = users_service.verify_login(user_json);
                    if (verified) {
                        String jwt = JWT.createJWT((String) user_json.get("username"));
                        exchange.getResponseHeaders().add("Authorization", "Bearer " + jwt);
                        JSONObject jwt_json = new JSONObject();
                        jwt_json.put("jwt", jwt);
                        send_response(jwt_json.toJSONString(), 200, exchange);
                    } else {
                        send_response("401: Unauthorized - authentication failed", 401, exchange);
                    }
                } catch (ParseException e) {
                    throw new RuntimeException(e);
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                } catch (NoSuchAlgorithmException e) {
                    throw new RuntimeException(e);
                }
            }
            if(path.startsWith("/api/group")){
                String[] splitted_path = path.split("/");
                String group_name = "";
                if (splitted_path.length > 3) {
                    try {
                        group_name = String.valueOf(splitted_path[3]);
                    } catch(NumberFormatException e) {
                        send_response("404: Resource not found", 404, exchange);
                        return;
                    }
                }
                try {
                    switch (method) {
                        case "GET":
                            if (group_name != "") {
                                send_response(group_service.get_group_by_name(group_name).toJSONString(), 200, exchange);
                            } else {
                                send_response("404: Resource not found", 404, exchange);
                            }
                            break;
                        case "PUT":
                            in = exchange.getRequestBody();
                            group = (JSONObject) json_parser.parse(new InputStreamReader(in, StandardCharsets.UTF_8));

                            if (!validate_group(group, method)) {
                                send_response("409: Conflict - your data contains errors", 409, exchange);
                                return;
                            }
                            JSONObject group_id = group_service.create_new_group(group);
                            send_response(group_id.toJSONString(), 201, exchange);
                            return;
                        case "POST":
                            if (group_name == "") {
                                send_response("400: Bad Request - Unspecified ID in query for this endpoint", 400, exchange);
                            }
                            in = exchange.getRequestBody();
                            group = (JSONObject) json_parser.parse(new InputStreamReader(in, StandardCharsets.UTF_8));

                            if (!validate_group(group, method)) {
                                send_response("409: Conflict - your data contains errors", 409, exchange);
                                return;
                            }
                            group_service.update_group(group_name, group);
                            send_response("204: Updated object", 204, exchange);
                            break;
                        case "DELETE":
                            if (group_name == "") {
                                send_response("400: Bad Request - Unspecified ID in query for this endpoint", 400, exchange);
                            }

                            group_service.delete_group(group_name);
                            send_response("204: Deleted object", 204, exchange);
                            break;
                        default:
                            break;
                    }
                } catch (ParseException e) {
                    throw new RuntimeException(e);
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }

            }
            send_response("404: Not Found", 404, exchange);
        }

        public void send_response(String message, int status_code, HttpExchange exchange) throws IOException {
            exchange.sendResponseHeaders(status_code, message.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(message.getBytes());
            os.close();
        }

        public boolean validate_goods(JSONObject goods, String method) {
            switch (method) {
                case "PUT":
                    if (
                            goods.containsKey("name") &&
                            goods.containsKey("group_name") &&
                            goods.containsKey("amount") &&
                            goods.containsKey("price") &&
                            goods.containsKey("about") &&
                            goods.containsKey("producer") &&
                            (!goods.get("group_name").equals("")) &&
                            ((long) goods.get("amount") >= 0) &&
                            ((double) goods.get("price") > 0) &&
                            (!goods.get("producer").equals(""))
                    )
                    {
                        return true;
                    }
                    break;
                case "POST":
                    if (goods.containsKey("group_name") && (goods.get("group_name").equals(""))){
                        return false;
                    }
                    if (goods.containsKey("amount") && ((long) goods.get("amount") <= 0)){
                        return false;
                    }
                    if (goods.containsKey("price") && ((double) goods.get("price") <= 0)){
                        return false;
                    }
                    if (goods.containsKey("producer") && (goods.get("producer").equals(""))){
                        return false;
                    }
                    return true;
                default:
                    break;
            }
            return false;
        }

        public boolean validate_group(JSONObject groups, String method) {
            if (groups.containsKey("about") && ((String) groups.get("about")).length() != 0)
                return true;

            return false;
        }
    }

    static class Auth extends Authenticator {
        @Override
        public Result authenticate(HttpExchange httpExchange) {
            try {
                String path = httpExchange.getRequestURI().getPath();
                String method = httpExchange.getRequestMethod();
                if (path.equals("/login"))
                    return new Success(new HttpPrincipal("Default", "realm"));
                if (method.equalsIgnoreCase("OPTIONS"))
                    return new Success(new HttpPrincipal("Default", "realm"));
                String jwt = String.valueOf(httpExchange.getRequestHeaders().getFirst("Authorization")).replace("Bearer ", "");
                if(jwt.equals("null"))
                    return new Success(new HttpPrincipal("d", "realm"));
                String username = JWT.extractUsername(jwt);
                User user = users_service.get_user_by_username(username);
                if (user == null) return new Failure(403);
                else
                    return new Success(new HttpPrincipal(user.getUsername(), "realm"));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }


}
