package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("playlists/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Playlists {

    @GET
    @Path("listUserPlaylists")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String listUserPlaylists(@CookieParam("SessionToken") String Token) {
        System.out.println("Invoked Playlists.listUserPlaylist with token " + Token);
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT PlaylistName, PlaylistID FROM Playlists WHERE UserName = (SELECT UserName FROM Users WHERE SessionToken = ?)");
            ps.setString(1, Token);
            ResultSet results = ps.executeQuery();
            while (results.next()== true) {
                JSONObject row = new JSONObject();
                row.put("PlaylistName", results.getString(1));
                row.put("PlaylistID", results.getInt(2));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }


}

