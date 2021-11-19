// Title: addcustomer
// Date: 11/19/2021
// Adapted from Conor Hollenbach's project code for CS340
// Author: Connor Hollenbach
addTrades()

function addTrades(){
    document.getElementById("add-trades-btn").addEventListener("click", function(event){
        event.preventDefault()
        let TradeID = document.querySelector('#tradesID-input');
        let SecuritySymbol = document.querySelector('#securitysymbol-input');
        let Amount = document.querySelector('#amount-input');
        let TraderID = document.querySelector('#traderID-input');
        let ManagerID = document.querySelector('#manager-input');
        let BrokerID = document.querySelector('#broker-input');
        let Time = document.querySelector('#time-input');
        let Date = document.querySelector('#date-input');

        let req = new XMLHttpRequest();
        let data = {};

        data.TradeID = TradeID.value;
        data.SecuritySymbol = SecuritySymbol.value;
        data.Amount = Amount.value;
        data.TraderID = TraderID.value;
        data.ManaagerID = ManagerID.value;
        data.BrokerID = BrokerID.value;
        data.Time = Time.value;
        data.Data = Date.value;
        // console.log(data)

        req.open("POST", '/insert-trade', true);
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