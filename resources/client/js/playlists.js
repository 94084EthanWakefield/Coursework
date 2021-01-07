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
        document.getElementById("PlaylistDisplay").innerHTML += "<button class='playlistButton' type ='button' onclick=# id='playlist'>" + item.PlaylistName + "</button>";
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
        dataHTML += "<div id='eachSong'>" + item.Name + " - " + item.Artist + " " + "<audio id='audios' controls><source id='songData' src=# type='audio/mpeg'></audio>" + "</div>";
    }
    document.getElementById('SongsList').innerHTML = dataHTML;
    let k = 150;
    for (let item of myJSONArray) {
        document.getElementById('songData').setAttribute('id', k);
        document.getElementById(k).setAttribute('src', item.Data);
        k++;
    }
    document.getElementById('delete').innerHTML = "<div class='selects'>  <select id='chooseSong' name='chooseSong'></select> <select id='choosePlaylist' name='choosePlaylist'></select>  </div>";
    let i = 50;
    for (let item of myJSONArray) {
        document.getElementById('chooseSong').innerHTML += "<option id='base' value=#>" + item.Name + "</option>";
        document.getElementById('base').setAttribute('id', i);
        document.getElementById(i).value = item.SongID;
        i++;
    }
    const url = "/playlists/listUserPlaylists/";
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            let j = 100;
            for (let items of response) {
                document.getElementById('choosePlaylist').innerHTML += "<option id='base1' value=#>" + items.PlaylistName + "</option>";
                document.getElementById('base1').setAttribute('id', j);
                document.getElementById(j).value = items.PlaylistID;
                j++;
            }
        }

    });
    document.getElementById('buttonDelete').innerHTML = "<div class='addButton'><button type='button' onclick='deleteFromPlaylist()'>Remove</button></div>";
}

function deleteFromPlaylist() {
    console.log("Invoked deleteFromPlaylist");
    const url = "/playlists/delete";
    let formData = new FormData(document.getElementById("delete"));
    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json()
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            alert("Removed from playlist");
        }
    });
}

window.addEventListener("scroll", function(){
    let nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 127);
});

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






