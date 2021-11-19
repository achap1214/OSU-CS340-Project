// Title: addcustomer
// Date: 11/19/2021
// Adapted from Conor Hollenbach's project code for CS340
// Author: Connor Hollenbach


addSecurity()

function addSecurity(){
    document.getElementById("add-security-btn").addEventListener("click", function(event){
        event.preventDefault()
        let securitysymbol = document.querySelector('#securitysymbol-input');
        let companyname = document.querySelector('#companyname-input');

        let req = new XMLHttpRequest();
        let data = {};

        data.SecuritySymbol = securitysymbol.value;
        data.CompanyName = companyname.value;
        // console.log(data)

        req.open("POST", '/insert-security', true);
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
