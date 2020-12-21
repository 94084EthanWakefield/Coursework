"use strict";
function listForGenre() {
    console.log("Invoked listForGenre()");
    const url = "/albums/listforgenre";
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatAlbums(response, "genre");
        }
    });
}

function listLatest() {
    console.log("Invoked listLatest()");
    const url = "/albums/listlatest";
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatAlbums(response, "latest");
        }
    });
}

function formatAlbums(myJSONArray, type) {
    let i = 0;
    let j = 5;
    for (let item of myJSONArray) {
        let dynamicHTML = "<div class='card'>" + item.AlbumName + item.Artist + "<input type='image' id='cover' src=# alt='image' onclick=# >" + "</div>";
        switch (type) {
            case "latest": {
                if (i >= 4) {
                    break;
                } else {
                    document.getElementById("DisplayAlbumsRecent").innerHTML += dynamicHTML;
                    changeImage(i, item);
                    i++;
                }
                break;
            }
            case "genre": {
                if (j >= 9) {
                    break;
                } else {
                    document.getElementById("DisplayAlbumsGenre").innerHTML += dynamicHTML;
                    changeImage(j, item);
                    j++;
                }
                break;
            }
        }
    }
}

function changeImage(choice, item) {
    document.getElementById("cover").setAttribute("id", choice);
    document.getElementById(choice).setAttribute("src", item.Cover);
    let whichID = item.AlbumID;
    document.getElementById(choice).setAttribute("onclick", `listSongsInAlbum(${whichID})`);
}










