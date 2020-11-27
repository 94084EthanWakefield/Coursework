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
    for (let item of myJSONArray) {
        if (item.Genre === "Rock") {
            if (rockID >= 4) {
                break;
            } else {
                document.getElementById("RockAlbums").innerHTML += "<div class='card'>" + item.AlbumName + item.Genre + item.Artist + "<img id='cover' src='https://picsum.photos/100' alt='image'>" + "</div>";
                document.getElementById("cover").setAttribute("id", rockID);
                document.getElementById(rockID).setAttribute("src", item.Cover);
                rockID++
            }
        }
        if (item.Genre === "EDM") {
            if (EDMID >= 9) {
                break;
            } else {
                document.getElementById("EDMAlbums").innerHTML += "<div class='card'>" + item.AlbumName + item.Genre + item.Artist + "<img id='cover' src='https://picsum.photos/100' alt='image'>" + "</div>";
                document.getElementById("cover").setAttribute("id", EDMID);
                document.getElementById(EDMID).setAttribute("src", item.Cover);
                EDMID++
            }
        }
        if (item.Genre === "Jazz") {
            if (jazzID >= 14) {
                break;
            } else {
                document.getElementById("JazzAlbums").innerHTML += "<div class='card'>" + item.AlbumName + item.Genre + item.Artist + "<img id='cover' src='https://picsum.photos/100' alt='image'>" + "</div>";
                document.getElementById("cover").setAttribute("id", jazzID);
                document.getElementById(jazzID).setAttribute("src", item.Cover);
                jazzID++
            }
        }
        if (item.Genre === "Classical") {
            if (classicalID >= 19) {
                break;
            } else {
                document.getElementById("ClassicalAlbums").innerHTML += "<div class='card'>" + item.AlbumName + item.Genre + item.Artist + "<img id='cover' src='https://picsum.photos/100' alt='image'>" + "</div>";
                document.getElementById("cover").setAttribute("id", classicalID);
                document.getElementById(classicalID).setAttribute("src", item.Cover);
                classicalID++
            }
        }
        if (item.Genre === "Metal") {
            if (metalID >= 24) {
                break;
            } else {
                document.getElementById("MetalAlbums").innerHTML += "<div class='card'>" + item.AlbumName + item.Genre + item.Artist + "<img id='cover' src='https://picsum.photos/100' alt='image'>" + "</div>";
                document.getElementById("cover").setAttribute("id", metalID);
                document.getElementById(metalID).setAttribute("src", item.Cover);
                metalID++
            }
        }
        if (item.Genre === "Ambient") {
            if (ambientID >= 29) {
                break;
            } else {
                document.getElementById("AmbientAlbums").innerHTML += "<div class='card'>" + item.AlbumName + item.Genre + item.Artist + "<img id='cover' src='https://picsum.photos/100' alt='image'>" + "</div>";
                document.getElementById("cover").setAttribute("id", ambientID);
                document.getElementById(ambientID).setAttribute("src", item.Cover);
                ambientID++
            }
        }
    }
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
