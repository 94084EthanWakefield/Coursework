"use strict";
function DisplayAllAlbums() {
    //debugger;
    console.log("Invoked DisplayAllAlbums()");     //console.log your BFF for debugging client side - also use debugger statement
    const url = "/albums/list";    		// API method on web server will be in Users class, method list
    fetch(url, {
        method: "GET",				//Get method
    }).then(response => {
        return response.json();                 //return response as JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
            alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert (pop up window)
        } else {
            formatAllAlbums(response);          //this function will create an HTML table of the data (as per previous lesson)
        }
    });
}

window.addEventListener("scroll", function(){
    let nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 127);
});

function formatAllAlbums(myJSONArray) {

    let rockID = 0;
    let EDMID = 5;
    let jazzID = 10;
    let classicalID = 15;
    let metalID = 20;
    let ambientID = 25;

    for (let item of myJSONArray) {
        let dynamicHTML = "<div class='card'>" + "<input class='image' type='image' height='250px' width='250px' id='cover' src=# alt='image' onclick=# >" + "<div class='details'>" + "<p>" + item.AlbumName + "</p>" + "<p>" + item.Artist + "</p>" + "</div>" + "</div>";
        switch (item.Genre) {
            case "Rock": {
                if (rockID >= 4) {
                    break;
                } else {
                    document.getElementById("innerRockAlbums").innerHTML += dynamicHTML;
                    changeImage(rockID, item);
                    rockID++;
                }
                break;
            }
            case "EDM": {
                if (EDMID >= 9) {
                    break;
                } else {
                    document.getElementById("innerEDMAlbums").innerHTML += dynamicHTML;
                    changeImage(EDMID, item);
                    EDMID++;
                }
                break;
            }
            case "Jazz": {
                if (jazzID >= 14) {
                    break;
                } else {
                    document.getElementById("innerJazzAlbums").innerHTML += dynamicHTML;
                    changeImage(jazzID, item);
                    jazzID++;
                }
                break
            }
            case "Classical": {
                if (classicalID >= 19) {
                    break;
                } else {
                    document.getElementById("innerClassicalAlbums").innerHTML += dynamicHTML;
                    changeImage(classicalID, item);
                    classicalID++;
                }
                break
            }
            case "Metal": {
                if (metalID >= 24) {
                    break;
                } else {
                    document.getElementById("innerMetalAlbums").innerHTML += dynamicHTML;
                    changeImage(metalID, item);
                    metalID++;
                }
                break;
            }
            case "Ambient": {
                if (ambientID >= 29) {
                    break;
                } else {
                    document.getElementById("innerAmbientAlbums").innerHTML += dynamicHTML;
                    changeImage(ambientID, item);
                    ambientID++;
                }
            }
        }
    }
}


function changeImage(genreID, item) {
    document.getElementById("cover").setAttribute("id", genreID);
    document.getElementById(genreID).setAttribute("src", item.Cover);
    let whichID = item.AlbumID;
    document.getElementById(genreID).setAttribute("onclick", `listSongsInAlbum(${whichID})`);
}


        /* switch (item.Genre) {
     case "Rock":
         if (rockID === 4) {
             break;
         } else {
             document.getElementById("RockAlbums").innerHTML += data;
             document.getElementById("cover").setAttribute("id", rockID);
             document.getElementById(rockID).setAttribute("src", myJSONArray[rockID].Cover)
             rockID++
         }
         break;
     case "EDM":
         if (EDMID === 9) {
             break;
         } else {
             document.getElementById("EDMAlbums").innerHTML += data;
             document.getElementById("cover").setAttribute("id", EDMID);
             document.getElementById(EDMID).setAttribute("src", myJSONArray[EDMID].Cover)
             EDMID++
         }
         break;

     case "Jazz":
         document.getElementById("JazzAlbums").innerHTML += data;
         for (let i = 0; i < 5; i++) {
             document.getElementById("cover").setAttribute("id", i);
             document.getElementById(i).setAttribute("src", myJSONArray[i].Cover)
         }
         break;
     case "Classical":
         document.getElementById("ClassicalAlbums").innerHTML += data;
         for (let i = 0; i < 5; i++) {
             document.getElementById("cover").setAttribute("id", i);
             document.getElementById(i).setAttribute("src", myJSONArray[i].Cover)
         }
         break;
     case "Metal":
         document.getElementById("MetalAlbums").innerHTML += data;
         for (let i = 0; i < 5; i++) {
             document.getElementById("cover").setAttribute("id", i);
             document.getElementById(i).setAttribute("src", myJSONArray[i].Cover)
         }
         break;
}

}


}*/
