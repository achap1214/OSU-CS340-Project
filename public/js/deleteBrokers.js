function deleteBroker(BrokerID){
    $.ajax({
        url: '/Brokers/' + BrokerID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

