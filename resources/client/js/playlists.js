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
        document.getElementById("PlaylistDisplay").innerHTML += "<input type ='button' onclick='SongsInPlaylist()' id='playlist' name='WhichPlaylist' value='a'>";
        changeValue(i, item,);
        i++
    }
}

function changeValue(i, item,) {
    document.getElementById('playlist').setAttribute('id', i);
    document.getElementById(i).value = item.PlaylistName;
}


function SongsInPlaylist() {
    window.open("inPlaylist.html", "_self");
    console.log("Invoked listSongsInPlaylist()");
    const url = "/playlists/listInPlaylist/";
    const formData = new FormData(document.getElementById("PlaylistDisplay"))

    fetch(url, {
        method: "GET",
        body: formData,

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
        dataHTML += "<tr><td>" + item.Name + "<td><td>" + item.Artist + "<td><td>" + item.Data + "<tr><td>";
    }
    document.getElementById("listSongsInPlaylist").innerHTML = dataHTML;
}

