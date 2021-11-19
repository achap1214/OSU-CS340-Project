addBroker()

function addBroker(){
    document.getElementById("add-broker-btn").addEventListener("click", function(event){
        event.preventDefault()
        let bname = document.querySelector('#bName-input');
        let bstreetaddress = document.querySelector('#bstreetaddress-input');
        let bcity = document.querySelector('#bcity-input');
        let bstate = document.querySelector('#bstate-input');
        let bzipcode = document.querySelector('#bzipcode-input');

        let req = new XMLHttpRequest();
        let data = {};

        data.BrokerName = bname.value;
        data.BrokerStreetAddress = bstreetaddress.value;
        data.BrokerCity = bcity.value;
        data.BrokerState = bstate.value;
        data.BrokerZipCode = bzipcode.value;
        // console.log(data)

        req.open("POST", '/insert-broker', true);
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