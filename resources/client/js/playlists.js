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
    let whichID = item.PlaylistID;
    document.getElementById(i).setAttribute("onclick", `SongsInPlaylist(${whichID})`);

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
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<div>" + item.Name + " " + item.Artist + " " + item.Data + "</div>";
    }
    document.getElementById('SongsList').innerHTML = dataHTML;
}

function addPlaylist() {
    console.log("Invoked addPlaylist()");
    const url = "/playlists/new/";
    let formData = new FormData(document.getElementById("NewPlaylist"));
    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json()
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            alert("Added playlist");
        }
    });
}






