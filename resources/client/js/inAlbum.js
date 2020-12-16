"use strict";

function listSongsInAlbum(which) {
    console.log("Invoked listSongsInAlbum");
    const url = "/songs/listForAlbum/";
    fetch(url + which, {
        method: "GET",
    }).then(response1 => {
        return response1.json();
    }).then(response1 => {
        if (response1.hasOwnProperty("Error")) {
            alert(JSON.stringify(response1));
        } else {
            console.log("Invoked listPlaylists()");
            const url = "/playlists/listUserPlaylists/";
            fetch(url, {
                method: "GET",
            }).then(response2 => {
                return response2.json();
            }).then(response2 => {
                if (response2.hasOwnProperty("Error")) {
                    alert(JSON.stringify(response2));
                } else {
                    formatSongs(response1, response2);
                }
            })
        }
    })
}


function formatSongs(SongsJSONArray, PlaylistJSONArray) {

    let dataHTML = "";
    for (let item of SongsJSONArray) {
        dataHTML += "<tr><td>" + item.Name + "<td><td>" + item.Length_ + "<tr><td>";
        document.getElementById('SongsList').innerHTML = dataHTML;
    }

    document.getElementById('SongsList').innerHTML += "<div>  <select id='chooseSong' name='chooseSong'></select> <select id='choosePlaylist' name='choosePlaylist'></select>  </div>";
    let i = 0;
    for (let item of SongsJSONArray) {
        document.getElementById('chooseSong').innerHTML += "<option id='base' value=#>" + item.Name + "</option>";
        document.getElementById('base').setAttribute('id', i);
        document.getElementById(i).value = item.SongID;
        i++;
    }
    let j = 100;
    for (let items of PlaylistJSONArray) {
        document.getElementById('choosePlaylist').innerHTML += "<option id='base1' value=#>" + items.PlaylistName + "</option>";
        document.getElementById('base1').setAttribute('id', j);
        document.getElementById(j).value = items.PlaylistID;
        j++;
    }
    document.getElementById('SongsList').innerHTML += "<button type='button' onclick='addToPlaylist()'>Add</button>";

}



function addToPlaylist() {
    console.log("Invoked AddToPlaylist() ");
    let url = "/songs/addToPlaylist";
    let formData = new FormData(document.getElementById('SongsList'));
    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            alert("Added to playlist")
        }
    });
}





