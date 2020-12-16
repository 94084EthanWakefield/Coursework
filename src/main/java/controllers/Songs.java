package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("songs/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Songs {

    @GET
    @Path("listForAlbum/{AlbumID}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String listForAlbum(@PathParam("AlbumID") String AlbumID) {
        System.out.println("Invoked Songs.listForAlbum() + " + AlbumID);
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Songs WHERE AlbumID = ?");
            ps.setString(1, AlbumID);
            ResultSet results = ps.executeQuery();
            while (results.next()==true) {
                JSONObject row = new JSONObject();
                row.put("Name", results.getString(5));
                row.put("Artist", results.getString(2));
                row.put("Length_", results.getInt(3));
                row.put("Data", results.getString(7));
                row.put("SongID", results.getInt(1));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list items.  Error code xx.\"}";
        }
    }

    @GET
    @Path("listInPlaylist/{PlaylistID}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String listSongsInPlaylist(@PathParam("PlaylistID") Integer PlaylistID) {
        System.out.println("Invoked Playlists.listInPlaylist() with playlistID " + PlaylistID);
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT Name, Artist, Data, SongID FROM Songs WHERE SongID IN (SELECT SongID FROM Associated WHERE PlaylistID = ?)");
            ps.setInt(1, PlaylistID);
            ResultSet results = ps.executeQuery();
            while (results.next() == true) {
                JSONObject row = new JSONObject();
                row.put("Name", results.getString(1));
                row.put("Artist", results.getString(2));
                row.put("Data", results.getString(3));
                row.put("SongID", results.getInt(4));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("addToPlaylist")
    public String UsersAdd(@FormDataParam("chooseSong") String SongID, @FormDataParam("choosePlaylist") String PlaylistID) {
        System.out.println("Invoked Users.UsersAdd()");
        try {
            PreparedStatement ps = Main.db.prepareStatement("INSERT INTO Associated (PlaylistID, SongID) values (?, ?)");
            ps.setInt(1, Integer.parseInt(PlaylistID));
            ps.setInt(2, Integer.parseInt(SongID));
            ps.execute();
            return "{\"OK\": \"Added song.\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to create new item, please see server console for more info.\"}";
        }
    }
}

