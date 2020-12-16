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

function formatAllAlbums(myJSONArray) {

    let rockID = 0;
    let EDMID = 5;
    let jazzID = 10;
    let classicalID = 15;
    let metalID = 20;
    let ambientID = 25;

    for (let item of myJSONArray) {
        let dynamicHTML = "<div class='card'>" + item.AlbumName + item.Genre + item.Artist + "<img id='cover' src='https://picsum.photos/100' alt='image' onclick=#>" + "</div>";
        switch (item.Genre) {
            case "Rock": {
                if (rockID >= 4) {
                    break;
                } else {
                    document.getElementById("RockAlbums").innerHTML += dynamicHTML;
                    changeImage(rockID, item);
                    rockID++;
                }
                break;
            }
            case "EDM": {
                if (EDMID >= 9) {
                    break;
                } else {
                    document.getElementById("EDMAlbums").innerHTML += dynamicHTML;
                    changeImage(EDMID, item);
                    EDMID++;
                }
                break;
            }
            case "Jazz": {
                if (jazzID >= 14) {
                    break;
                } else {
                    document.getElementById("JazzAlbums").innerHTML += dynamicHTML;
                    changeImage(jazzID, item);
                    jazzID++;
                }
                break
            }
            case "Classical": {
                if (classicalID >= 19) {
                    break;
                } else {
                    document.getElementById("ClassicalAlbums").innerHTML += dynamicHTML;
                    changeImage(classicalID, item);
                    classicalID++;
                }
                break
            }
            case "Metal": {
                if (metalID >= 24) {
                    break;
                } else {
                    document.getElementById("MetalAlbums").innerHTML += dynamicHTML;
                    changeImage(metalID, item);
                    metalID++;
                }
                break;
            }
            case "Ambient": {
                if (ambientID >= 29) {
                    break;
                } else {
                    document.getElementById("AmbientAlbums").innerHTML += dynamicHTML;
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
