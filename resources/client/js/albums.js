"use strict";
function listForGenre() {
    console.log("Invoked listForGenre()");
    const Username = document.getElementById("Username").value;
    const url = "/albums/listforgenre/";
    fetch(url + Username, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatAlbumsList(response);
        }
    });
}

function formatAlbumsList(myJSONArray){
    let data = "";
    let count = 0;
    for (let item of myJSONArray) {
        data += "<div class='card'>" + item.AlbumName + item.Artist + "<img id='cover' src='https://picsum.photos/225' alt='image'>" + "</div>";
        count++;
        if (count === 5) {
            break;
        }
    }
    document.getElementById("DisplayAlbumsGenre").innerHTML = data;
    for (let i = 0; i < 5; i++) {
        document.getElementById("cover").setAttribute("id", i);
        document.getElementById(i).setAttribute("src", myJSONArray[i].Cover)
    }
}





