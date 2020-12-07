"use strict";

function listSongs() {
    console.log("Invoked listForGenre()");
    const url = "/songs/listForAlbum/";
    const albumName = def;
    fetch(url + albumName, {
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
        dataHTML += "<tr><td>" + item.Name + "<td><td>" + item.Length_ + "<tr><td>";
    }
    document.getElementById("UsersTable").innerHTML = dataHTML;

}

