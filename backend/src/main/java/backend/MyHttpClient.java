package backend;

import java.io.IOException;
import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class MyHttpClient {

    private static final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    private String Auth_Token = this.login("superuser", "111111").body().split(" : ")[1].split(" ")[0];

    public MyHttpClient() throws IOException, InterruptedException {
    }
    public HttpResponse<String> login(String username, String password) throws IOException, InterruptedException {
        String json = new StringBuilder()
                .append("{")
                .append("\"username\":\"" + username + "\",")
                .append("\"password\":\"" + password + "\"")
                .append("}").toString();

        HttpRequest request = HttpRequest.newBuilder()
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .uri(URI.create("http://localhost:4758/login"))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .header("Content-Type", "application/json")
                .build();

        return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }

    public HttpResponse<String> createNewGood(String name, double price, int amount, String group_name, String about, String producer) throws IOException, InterruptedException {
        String json = new StringBuilder()
                .append("{")
                .append("\"name\":\"" + name + "\",")
                .append("\"group_name\":\"" + group_name + "\",")
                .append("\"price\":" + price + ",")
                .append("\"amount\":" + amount + ",")
                .append("\"about\":\"" + about + "\",")
                .append("\"producer\":\"" + producer + "\"")
                .append("}").toString();

        HttpRequest request = HttpRequest.newBuilder()
                .PUT(HttpRequest.BodyPublishers.ofString(json))
                .uri(URI.create("http://localhost:4758/api/good"))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + Auth_Token)
                .build();

        return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }

    public HttpResponse<String> updateGood(String name, double price, int amount, String group_name, String about, String producer) throws IOException, InterruptedException {
        String json = new StringBuilder()
                .append("{")
                .append("\"group_name\":\"" + group_name + "\",")
                .append("\"price\":" + price + ",")
                .append("\"amount\":" + amount + ",")
                .append("\"about\":\"" + about + "\",")
                .append("\"producer\":\"" + producer + "\"")
                .append("}").toString();

        HttpRequest request = HttpRequest.newBuilder()
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .uri(URI.create("http://localhost:4758/api/good/" + name))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + Auth_Token)
                .build();

        return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }

    public HttpResponse<String> getGoodByName(String name) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("http://localhost:4758/api/good/" + name))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .header("Authorization", "Bearer " + Auth_Token)
                .build();

        return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }

    public HttpResponse<String> deleteGoodByName(String name) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .DELETE()
                .uri(URI.create("http://localhost:4758/api/good/" + name))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .header("Authorization", "Bearer " + Auth_Token)
                .build();

        return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }

    public HttpResponse<String> createNewGroup(String name, String about) throws IOException, InterruptedException {
        String json = new StringBuilder()
                .append("{")
                .append("\"name\":\"" + name + "\",")
                .append("\"about\":\"" + about + "\"")
                .append("}").toString();

        HttpRequest request = HttpRequest.newBuilder()
                .PUT(HttpRequest.BodyPublishers.ofString(json))
                .uri(URI.create("http://localhost:4758/api/group"))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + Auth_Token)
                .build();

        return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }

    public HttpResponse<String> updateGroup(String name, String about) throws IOException, InterruptedException {
        String json = new StringBuilder()
                .append("{")
                .append("\"about\":\"" + about + "\"")
                .append("}").toString();

        HttpRequest request = HttpRequest.newBuilder()
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .uri(URI.create("http://localhost:4758/api/group/" + name))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + Auth_Token)
                .build();

        return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }

    public HttpResponse<String> getGroupByName(String name) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("http://localhost:4758/api/group/" + name))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .header("Authorization", "Bearer " + Auth_Token)
                .build();

        return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }

    public HttpResponse<String> deleteGroupByName(String name) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .DELETE()
                .uri(URI.create("http://localhost:4758/api/group/" + name))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .header("Authorization", "Bearer " + Auth_Token)
                .build();

        return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        //SimpleHttpClient client = new SimpleHttpClient();
        /*System.out.println("LOGIN STARTED");
        HttpResponse<String> login_response = client.login("superuser", "111111");
        System.out.println(login_response.statusCode());
        System.out.println(login_response.body().split(" : ")[1].split(" ")[0]);
        System.out.println("LOGIN FINISHED");
        System.out.println("GOODS FLOW STARTED");
        HttpResponse<String> create_good_response = client.createNewGood("Lemonade", 15.0, 100, "Food", "Lemonade test1", "Coca-cola");
        System.out.println(create_good_response.statusCode());
        System.out.println(create_good_response.body());
        HttpResponse<String> update_good_response = client.updateGood("Lemonade", 14.0, 10, "Food1", "Hurry UP", "Coca-cola1");
        System.out.println(update_good_response.statusCode());
        System.out.println(update_good_response.body());
        HttpResponse<String> get_good_response = client.getGoodByName("Lemonade");
        System.out.println(get_good_response.statusCode());
        System.out.println(get_good_response.body());
        HttpResponse<String> delete_good_response = client.deleteGoodByName("Lemonade");
        System.out.println(delete_good_response.statusCode());
        System.out.println(delete_good_response.body());
        System.out.println("GOODS FLOW FINISHED");*/
        /*HttpResponse<String> create_group_response = client.createNewGroup("Drinks", "Drinks test1");
        System.out.println(create_group_response.statusCode() + " c_g_r " + create_group_response.body());
        HttpResponse<String> update_group_response = client.updateGroup("Drinks","Non-alcohol Drinks");
        System.out.println(update_group_response.statusCode() +  " u_g_r " + update_group_response.body());
        HttpResponse<String> get_group_response = client.getGroupByName("Drinks");
        System.out.println(get_group_response.statusCode() + " g_g_p " + get_group_response.body());
        HttpResponse<String> delete_group_response = client.deleteGroupByName("Drinks");
        System.out.println(delete_group_response.statusCode() + " d_g_r " + delete_group_response.body());*/
    }

}
