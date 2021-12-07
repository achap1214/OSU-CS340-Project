

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