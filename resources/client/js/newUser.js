"use strict";
function addUser() {
    if (document.getElementById('Password').value === document.getElementById('ConfirmPassword').value) {
        console.log("Invoked addUser() ");
        let url = "/users/new";
        let d = new Date();
        let formData = new FormData(document.getElementById('LoginForm'));
        formData.append('CreationDay', d.getDate().toString());
        formData.append('CreationMonth', d.getMonth().toString());
        formData.append('CreationYear', d.getFullYear().toString());
        fetch(url, {
            method: "POST",
            body: formData,
        }).then(response => {
            return response.json();
        }).then(response => {
            if (response.hasOwnProperty("Error")) {
                alert(JSON.stringify(response));
            } else {
                window.open("login.html", "_self")
            }
        })
    }
    else {
        alert('Passwords do not match')
    }
}

