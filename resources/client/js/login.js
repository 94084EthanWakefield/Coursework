"use strict";
function getUsersList() {
    //debugger;
    console.log("Invoked getUsersList()");     //console.log your BFF for debugging client side - also use debugger statement
    const url = "/users/list/";    		// API method on web server will be in Users class, method list
    fetch(url, {
        method: "GET",				//Get method
    }).then(response => {
        return response.json();                 //return response as JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
            alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert (pop up window)
        } else {
            formatUsersList(response);          //this function will create an HTML table of the data (as per previous lesson)
        }
    });
}

function formatUsersList(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.Username + "<td><td>" + item.Password + "<tr><td>";
    }
    document.getElementById("UsersTable").innerHTML = dataHTML;
}

function UsersLogin() {

    console.log("Invoked UsersLogin() ");
    let url = "/users/login";
    let formData = new FormData(document.getElementById('LoginForm'));

    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            Cookies.set("SessionToken", response.SessionToken);
            Cookies.set("Username", response.Username);
            window.open("homepage.html", "_self");
        }
    });
}

//     let date = new Date();
//     formData.append("day", date.getDate().toString());
//     formData.append("month", date.getMonth().toString());
//     formData.append("year", date.getFullYear().toString());

