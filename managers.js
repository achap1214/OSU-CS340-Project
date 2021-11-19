// Title: addcustomer
// Date: 11/19/2021
// Adapted from Conor Hollenbach's project code for CS340
// Author: Connor Hollenbach

addManager()

function addManager(){
    document.getElementById("add-manager-btn").addEventListener("click", function(event){
        event.preventDefault()
        let fname = document.querySelector('#fName-input');
        let lname = document.querySelector('#lName-input');

        let req = new XMLHttpRequest();
        let data = {};

        data.ManagerFirstName = fname.value;
        data.ManagerLastName = lname.value;
        // console.log(data)

        req.open("POST", '/insert-manager', true);
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        req.addEventListener('load', () => {
            if(req.status >= 200 && req.status < 400){
                window.location.reload(true);
            } else{
                alert("Error - Please double check input fields");
            }
        })
        // console.log(req);
        req.send(JSON.stringify(data));
    })
}
