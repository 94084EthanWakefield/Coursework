package controllers;

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
    @Path("listForAlbum/{AlbumName}")
    public String listForAlbum(@PathParam("AlbumName") String AlbumName) {
        System.out.println("Invoked Songs.listForAlbum()");
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Songs WHERE AlbumID = (SELECT AlbumID FROM Albums WHERE AlbumName = ?)");
            ps.setString(1, AlbumName);
            ResultSet results = ps.executeQuery();
            while (results.next()==true) {
                JSONObject row = new JSONObject();
                row.put("Name", results.getInt(5));
                row.put("Artist", results.getString(2));
                row.put("Length_", results.getInt(3));
                row.put("Data", results.getString(7));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list items.  Error code xx.\"}";
        }
    }
}
