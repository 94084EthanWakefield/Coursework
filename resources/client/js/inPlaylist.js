"use strict";

function listSongsInPlaylist() {
    console.log("Invoked listSongsInPlaylist()");
    const url = "/playlists/listInPlaylist/";

    fetch(url, {
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

//NEXT DO API METHOD FOR SONGS IN PLAYLIST