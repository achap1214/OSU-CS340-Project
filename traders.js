// Title: addcustomer
// Date: 11/19/2021
// Adapted from Conor Hollenbach's project code for CS340
// Author: Connor Hollenbach
addTraders()

function addTraders(){
    document.getElementById("add-trader-btn").addEventListener("click", function(event){
        event.preventDefault()
        let TraderID = document.querySelector('#traderID-input');
        let TraderFirstName = document.querySelector('#traderfname-input');
        let TraderLastName = document.querySelector('#traderlname-input');

        let req = new XMLHttpRequest();
        let data = {};

        data.traderIDInput = TraderID.value;
        data.traderFnameInput = TraderFirstName.value;
        data.traderLnameInput = TraderLastName.value;
        // console.log(data)

        req.open("POST", '/insert-trader', true);
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        req.addEventListener('load', () => {
            if(req.status >= 200 && req.status < 400){
                window.location.reload(true);
            } else{
                alert("Error: Incorrect Input");
            }
        })
        // console.log(req);
        req.send(JSON.stringify(data));
    })
}