package controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("albums/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Albums{
    @GET
    @Path("list")
    public String AlbumsList() {
        System.out.println("Invoked Albums.AlbumsList()");
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Albums");
            ResultSet results = ps.executeQuery();
            while (results.next()==true) {
                JSONObject row = new JSONObject();
                row.put("AlbumID", results.getInt(1));
                row.put("AlbumName", results.getString(2));
                row.put("Artist", results.getString(3));
                row.put("Length_", results.getInt(4));
                row.put("Genre", results.getString(5));
                row.put("Cover", results.getString(6));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list items.  Error code xx.\"}";
        }
    }

    @GET
    @Path("listforgenre")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String GetUserGenre(@CookieParam("SessionToken") String Token) {
        System.out.println("Invoked Albums.ListforGenre() with token " + Token);
        JSONArray response = new JSONArray();
        try {
        PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Albums WHERE Genre = (SELECT Genre FROM Songs WHERE SongID = (SELECT SongID FROM Listenings WHERE UserName = (SELECT UserName FROM USERS WHERE SessionToken = ?) AND TimesYear = (SELECT MAX(TimesYear) FROM Listenings WHERE UserName = (SELECT UserName FROM USERS WHERE SessionToken = ?))))");
            ps.setString(1, Token);
            ps.setString(2, Token);
            ResultSet results = ps.executeQuery();
            while (results.next()== true) {
                JSONObject row = new JSONObject();
                row.put("AlbumID", results.getInt(1));
                row.put("AlbumName", results.getString(2));
                row.put("Artist", results.getString(3));
                row.put("Length_", results.getInt(4));
                row.put("Genre", results.getString(5));
                row.put("Cover", results.getString(6));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }

    @GET
    @Path("listlatest")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String GetUserLatest(@CookieParam("SessionToken") String Token) {
        System.out.println("Invoked Albums.GetUserLatest() with token " + Token);
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Albums WHERE AlbumID IN (SELECT AlbumID FROM Songs WHERE SongID IN (SELECT SongID FROM Listenings WHERE Username = (SELECT UserName FROM USERS WHERE SessionToken = ?) ORDER BY MostRecent))");
            ps.setString(1, Token);
            ResultSet results = ps.executeQuery();
            while (results.next()== true) {
                JSONObject row = new JSONObject();
                row.put("AlbumID", results.getInt(1));
                row.put("AlbumName", results.getString(2));
                row.put("Artist", results.getString(3));
                row.put("Length_", results.getInt(4));
                row.put("Genre", results.getString(5));
                row.put("Cover", results.getString(6));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }


}

