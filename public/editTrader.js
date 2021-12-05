// function editTrader(stud_id, traderFirstName, traderLastName){
//     const box = document.getElementById('edit_trader');
//     box.textContent = "";
//     const form = document.createElement('form');
//     form.action = '/update-stud';
//     box.appendChild(form);
//     const fieldset = document.createElement('fieldset');
//     form.appendChild(fieldset);
//     const legend = document.createElement('legend');
//     legend.textContent = "Edit Trader #" + stud_id;
//     fieldset.appendChild(legend);

//     const firstName = document.createElement('label');
//     firstName.textContent = "Trader First Name: ";
//     fieldset.appendChild(firstName);
//     const firstName_input = document.createElement('input')
//     firstName_input.type = "text";
//     firstName_input.name = "TraderFirstName";
//     firstName_input.required = true;
//     firstName_input.value = traderFirstName;
//     firstName.appendChild(firstName_input);

//     const lastName = document.createElement('label');
//     lastName.textContent = "Trader Last Name: ";
//     fieldset.appendChild(lastName);
//     const lastName_input = document.createElement('input')
//     lastName_input.type = "text";
//     lastName_input.name = "TraderLastName";
//     lastName_input.required = true;
//     lastName_input.value = traderLastName;
//     lastName.appendChild(lastName_input);
    
// }


function updateTrader(id){
    $.ajax({
        url: '/traders/' + id,
        type: 'PUT',
        data: $('#update-trader').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};