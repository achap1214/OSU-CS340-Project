module.exports = function(){
    const express = require('express');
    const router = express.Router();

    function getBrokers(res, mysql, context, complete){
        mysql.pool.query("SELECT BrokerID as BrokerID, BrokerName, BrokerAddress FROM Brokers", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Brokers = results;
            complete()
        })
    }

    // function getBrokerAddress()







    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteBrokers.js","filterBrokers.js","SearchFunctions.js"];
        var mysql = req.app.get('mysql');
        getBrokers(res, mysql, context, complete);
        // getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('people', context);
            }

        }
    });




}