
module.exports = function(){
    var express = require('express');
    var router = express.Router();



function getTrader(res, mysql, context, id, complete){
    var sql = "SELECT TraderID as id, TraderFirstName, TraderLastName FROM Traders WHERE TraderID = ?";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.Traders = results[0];
        complete();
    });
}

 /* Display one person for the specific purpose of updating people */
router.get('/:TraderID', function(req, res){
    callbackCount = 0;
    var context = {};
    context.jsscripts = ["editTrader.js"];
    var mysql = req.app.get('mysql');
    getTrader(res, mysql, context, req.params.TraderID, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('update-trader', context);
        }

    }
});


router.put('/:TraderID', function(req, res){
    const mysql = req.app.get('mysql');
    console.log(req.body)
    console.log(req.params.TraderID)
    const sql = "UPDATE Traders SET TraderFirstName=?, TraderLastName=? WHERE TraderID=?";
    const inserts = [req.body.TraderFirstName, req.body.TraderLastName, req.params.TraderID];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(error)
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.status(200);
            res.end();
        }
    });
});

return router;

}();