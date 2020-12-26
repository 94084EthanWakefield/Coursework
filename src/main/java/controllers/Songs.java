package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import java.util.Calendar;
import java.util.Date;
import java.time.ZonedDateTime;

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
            while (results.next() == true) {
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
    public String AddToPlaylist(@FormDataParam("chooseSong") String SongID, @FormDataParam("choosePlaylist") String PlaylistID) {
        System.out.println("Invoked Songs.addToPlaylist()");
        try {
            PreparedStatement ps = Main.db.prepareStatement("INSERT INTO Associated (PlaylistID, SongID) values (?, ?)");
            ps.setInt(1, Integer.parseInt(PlaylistID));
            ps.setInt(2, Integer.parseInt(SongID));
            ps.execute();
            return "{\"OK\": \"Added song.\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            if (exception.getMessage().equals("[SQLITE_CONSTRAINT]  Abort due to constraint violation (UNIQUE constraint failed: Associated.PlaylistID, Associated.SongID)")) {
                return "{\"Error\": \"Already in playlist.\"}";
            } else {
                return "{\"Error\": \"Unable to post item, please see server console for more info.\"}";
            }
        }
    }

    @POST
    @Path("removeFromPlaylist")
    public String RemoveFromPlaylist(@FormDataParam("SongID") String SongID, @FormDataParam("PlaylistID") String PlaylistID) {
        System.out.println("Invoked Songs.removeToPlaylist()");
        try {
            PreparedStatement ps = Main.db.prepareStatement("DELETE FROM Associated WHERE SongID = ? AND PlaylistID = ?");
            ps.setInt(1, Integer.parseInt(SongID));
            ps.setInt(2, Integer.parseInt(PlaylistID));
            ps.execute();
            return "{\"OK\": \"Remove song.\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to post item, please see server console for more info.\"}";
        }
    }


    @POST
    @Path("add/{SongID}")
    public String Add(@PathParam("SongID") int SongID, @CookieParam("SessionToken") String Token) {
        System.out.println("Invoked Songs.add()");
        try {
            Date date = new Date();
            long time = date.getTime();
            PreparedStatement ps = Main.db.prepareStatement("INSERT INTO Listenings (SongID, UserName, TimesWeek, TimesMonth, TimesYear, MostRecent) VALUES (?, (SELECT UserName FROM Users WHERE SessionToken = ?), 0, 0, 0, ?)");
            ps.setInt(1, SongID);
            ps.setString(2, Token);
            ps.setLong(3, time);
            System.out.println(time);
            ps.execute();
            return "{\"OK\": \"Updated.\"}";

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to post item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("update/{SongID}")
    public String Update(@PathParam("SongID") int SongID, @CookieParam("SessionToken") String Token) {
        System.out.println("Invoked Songs.updatet()");
        try {
            PreparedStatement ps = Main.db.prepareStatement("UPDATE Listenings SET TimesWeek = TimesWeek + 1  WHERE UserName = (SELECT UserName FROM Users WHERE SessionToken = ?) AND SongID = ?");
            PreparedStatement ps2 = Main.db.prepareStatement("UPDATE Listenings SET TimesMonth = TimesMonth + 1  WHERE UserName = (SELECT UserName FROM Users WHERE SessionToken = ?) AND SongID = ?");
            PreparedStatement ps3 = Main.db.prepareStatement("UPDATE Listenings SET TimesYear = TimesYear + 1  WHERE UserName = (SELECT UserName FROM Users WHERE SessionToken = ?) AND SongID = ?");
            ps.setString(1, Token);
            ps.setInt(2, SongID);
            ps.execute();
            ps2.setString(1, Token);
            ps2.setInt(2, SongID);
            ps2.execute();
            ps3.setString(1, Token);
            ps3.setInt(2, SongID);
            ps3.execute();
            return "{\"OK\": \"Updated.\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to post item, please see server console for more info.\"}";
        }
    }
}


