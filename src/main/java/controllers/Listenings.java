package controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("listenings/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Listenings {

    @GET
    @Path("get")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String getTimesListened(@CookieParam("SessionToken") String Token) {
        System.out.println("Invoked Listenings.getTimesListened");
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT Songs.Name, Listenings.TimesWeek, Listenings.TimesMonth, Listenings.TimesYear FROM Listenings INNER JOIN Songs ON Listenings.SongID = Songs.SongID WHERE UserName = (SELECT UserName FROM Users WHERE SessionToken = ?)");
            ps.setString(1, Token);
            ResultSet results = ps.executeQuery();
            while (results.next() == true) {
                JSONObject row = new JSONObject();
                row.put("SongName", results.getString(1));
                row.put("TimesWeek", results.getInt(2));
                row.put("TimesMonth", results.getInt(3));
                row.put("TimesYear", results.getInt(4));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }
}
