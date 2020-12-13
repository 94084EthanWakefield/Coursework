"use strict";

function listPlaylists() {
    console.log("Invoked listPlaylists()");
    const url = "/playlists/listUserPlaylists/";
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatPlaylists(response);
        }
    })
}

function formatPlaylists(myJSONArray) {
    let i = 0;
    for (let item of myJSONArray) {
        document.getElementById("PlaylistDisplay").innerHTML += "<button type ='button' onclick=# id='playlist'>" + item.PlaylistName + "</button>";
        changeOnClick(i, item);
        i++
    }
}

function changeOnClick(i, item) {
    document.getElementById('playlist').setAttribute('id', i);
    document.getElementById(i).onclick = SongsInPlaylist(item.AlbumID);

}

function SongsInPlaylist(which) {

    console.log("Invoked songsInPlaylist()");
    const url = "/songs/listInPlaylist/";
    fetch(url + which, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {

            formatSongs(response);
        }
    })
}

function formatSongs(myJSONArray) {
    for (let item of myJSONArray) {
        document.getElementById("listSongsInPlaylist").innerHTML += "<div>" + item.Name + " " + item.Artist + " " + item.Data + "</div>";
    }
}






