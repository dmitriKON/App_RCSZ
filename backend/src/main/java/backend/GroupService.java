package backend;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.SQLException;
import java.util.List;

public class GroupService {
    public DatabaseManager db;

    public GroupService(DatabaseManager db) {
        this.db = db;
    }

    public JSONObject get_group_by_name(String name) {
        List<Group> groups = db.get_groups_where("name", name);
        JSONObject groups_json = new JSONObject();
        groups_json.put("group_name", groups.get(0).getName());
        groups_json.put("about", groups.get(0).getAbout());
        groups_json.put("group_id", groups.get(0).getId());
        return groups_json;
    }

    public JSONObject get_groups() {
        List<Group> groups = db.get_groups();
        JSONArray groups_array = new JSONArray();
        JSONObject groups_json = new JSONObject();
        int i = 0;
        while(!groups.isEmpty()){
            JSONObject group_json = new JSONObject();
            group_json.put("name", groups.get(i).getName());
            group_json.put("about", groups.get(i).getAbout());
            group_json.put("group_id", groups.get(i).getId());
            groups.remove(i);
            groups_array.add(group_json);
        }
        groups_json.put("result", groups_array);
        return groups_json;
    }

    public JSONObject create_new_group(JSONObject group_json) throws SQLException {
        String name = (String) group_json.get("name");
        String about = (String) group_json.get("about");
        JSONObject group_id_json = new JSONObject();
        group_id_json.put("group_id", db.create_product_group(name, about));
        return group_id_json;
    }

    public void update_group(String name, JSONObject group_json) throws SQLException {
        Group group = db.get_groups_where("name", name).get(0);
        if (group_json.containsKey("about")) {
            String about = (String) group_json.get("about");
            if (group.getAbout() != about) {
                db.set_group_about_by_name(about, name);
            }
        }
    }

    public void delete_group(String name) throws SQLException {
        db.delete_group_goods_by_name(name);
        db.delete_group_by_name(name);
    }
}
