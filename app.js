// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code

// app.set('PORT', 5757);
var PORT = 5757;

var db = require('./database/db-connector.js')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

var exphbs = require('express-handlebars');

app.engine('.handlebars', exphbs({
  extname: ".handlebars"
}));

app.set('view engine', '.handlebars');

app.use('/', express.static('public'));
// app.use('/traders', require('./traders.js'));
// app.use('/managers', require('./managers.js'));
// app.use('/brokers', require('./brokers.js'));
// app.use('/securities', require('./securities.js'));
// app.use('/trades', require('./trades.js'));
// app.use('/fills', require('./fills.js'));
app.use('/', express.static('public'));

// Title: index.js
// Date: 11/19/2021
// Adapted from Conor Hollenbach's project code for CS340
// Author: Connor Hollenbach

// SQL Queries for displaying tables
const displayTraders = 'SELECT TraderID, TraderFirstName, TraderLastName FROM Traders ORDER BY TraderID';
const displayManagers = 'SELECT ManagerID, ManagerFirstName, ManagerLastName FROM Managers ORDER BY ManagerID';
const displayBrokers = 'SELECT BrokerID, BrokerName, BrokerStreetAddress, BrokerCity, BrokerState, BrokerZipCode FROM Brokers ORDER BY BrokerID';
const displaySecurities = 'SELECT SecurityID, SecuritySymbol, CompanyName FROM Securities ORDER BY SecuritySymbol';
const displayTrades = 'SELECT TradeID, SecuritySymbol, Amount, TraderID, ManagerID, BrokerID, Time, Date FROM Trades ORDER BY TradeID';
const displayFills = 'SELECT FillID, TradeID, SecuritySymbol, Amount, Time, Date FROM Fills ORDER BY FillID';

// SQL Queries for inserting rows
const insertTrader = 'INSERT INTO Traders(TraderFirstName, TraderLastName) VALUES(?, ?, ?);'
const insertManager = 'INSERT INTO Managers(ManagerFirstName, ManagerLastName) VALUES(?, ?, ?);'
const insertBroker = 'INSERT INTO Brokers(BrokerName, BrokerStreetAddress, BrokerCity, BrokerState, BrokerZipCode) VALUES(?, ?, ?, ?, ?);'
const insertSecurity = 'INSERT INTO Securities(SecuritySymbol, CompanyName) VALUES(?, ?);'
const insertTrade = 'INSERT INTO Trades(SecuritySymbol, Amount, TraderID, ManagerID, BrokerID, Time, Date) VALUES(?, ?, ?, ?, ?, ?, ?);'
const insertFill = 'INSERT INTO Fills(TradeID, SecuritySymbol, Amount, Time, Date) VALUES(?, ?, ?, ?, ?);'

// Queries for updating rows
const updateTrader = 'UPDATE Traders SET TraderFirstName = ?, TraderLastName = ? WHERE TraderID = ?;'
const updateManager = 'UPDATE Managers SET ManagerFirstName = ?, ManagerLastName = ? WHERE ManagerID = ?;'
const updateBroker = 'UPDATE Brokers SET BrokerName = ?, BrokerStreetAddress = ?, BrokerCity = ?, BrokerState = ?, BrokerZipCode = ? WHERE BrokerID = ?;'
const updateSecurity = 'UPDATE Securities SET CompanyName = ? WHERE SecuritySymbol = ?;'
const updateTrade = 'UPDATE Trades SET SecuritySymbol = ?, Amount = ?, TraderID = ?, ManagerID = ?, BrokerID = ?, Time = ?, Date = ? WHERE TradeID = ?;'
const updateFill = 'UPDATE Fills SET TradeID = ?, SecuritySymbol = ?, Amount = ?, Time = ?, Date = ? WHERE FillID = ?;'

// Queries for deleting rows
const deleteTrader = 'DELETE FROM Traders WHERE TraderID = ?;'
const deleteManager = 'DELETE FROM Managers WHERE ManagerID = ?;'
const deleteBroker = 'DELETE FROM Brokers WHERE BrokerID = ?;'
const deleteSecurity = 'DELETE FROM Securities WHERE SecurityID = ?;'
const deleteTrade = 'DELETE FROM Trades WHERE TradeID = ?;'
const deleteFill = 'DELETE FROM Fills WHERE FillID = ?;'

/*
    ROUTES
*/
// app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
//     {
//         res.send("The server is running!")      // This function literally sends the string "The server is running!" to the computer
//     });                                         // requesting the web site.

// Home Page
app.get('/', function(req, res){
    res.render('index');
});

// Traders Page
app.get('/traders',function(req,res){
  let query = "SELECT * FROM Traders;";
  db.pool.query(query, function(err, rows, fields){
    res.render('traders', { data: rows});
  });
});

app.get('/insert-trader', (req, res) =>{
  var values = [req.query.TraderID, req.query.TraderFirstName, req.query.TraderLastName];
  let query = `INSERT INTO Traders(TraderID, TraderFirstName, TraderLastName) 
              VALUES(?,?,?);`;
  db.pool.query(query, values, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect('/traders');
  });
});

app.get('/delete-trader',function(req,res,next){
  db.pool.query("DELETE FROM "+req.query.table+" WHERE TraderID=?", [req.query.id], function(error, result){
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect("/" + req.query.page);
  })
});

app.get('/update-trader',function(req,res){
  // var values = [req.query.TraderFirstName, req.query.TraderLastName, req.query.TraderID];
  // let query = `UPDATE Traders SET TraderFirstName=?, TraderLastName=? WHERE TraderID=?`
  db.pool.query("UPDATE Traders SET TraderFirstName=?, TraderLastName=? WHERE TraderID=?",
  [req.query.TraderFirstName, req.query.TraderLastName, req.query.TraderID],function(error, result){
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect('/traders');
  })
  // db.pool.query(query,values, function(error, result){
  //   if (error) {
  //     console.log(error);
  //     res.sendStatus(400);
  //   }
  //   res.redirect('/traders');
  // });


  // let TraderID = req.query.TraderID;
  // let TraderFirstName = req.query.TraderFirstName;
  // let TraderLastName = req.query.TraderLastName;

  // // Query to get a Customer record
  // let query = `UPDATE Traders SET TraderID = ${parseInt(TraderID)}, TraderFirstName = ${TraderFirstName}, TraderLastName = ${TraderLastName} WHERE TraderID = ${TraderID};`;

  // db.pool.query(query, function (error, rows, fields) {
  //     if (error) {
  //         console.log(error);
  //         res.sendStatus(400);
  //     } else {
  //         res.redirect('/traders');
  //     }
  // });
});

// Managers Page
app.get('/managers',function(req,res){
  let query = "SELECT * FROM Managers;";
  db.pool.query(query, function(err, rows, fields){
    res.render('managers', { data: rows});
  });
});
  
app.get('/insert-manager', (req, res) =>{
  var values = [req.query.ManagerID, req.query.ManagerFirstName, req.query.ManagerLastName];
  db.pool.query("INSERT INTO Managers (ManagerID, ManagerFirstName, ManagerLastName) VALUES (?,?,?)", values, (error, result) => {
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect('/managers');
  })
})

app.get('/delete-manager',function(req,res,next){
  db.pool.query("DELETE FROM "+req.query.table+" WHERE ManagerID=?", [req.query.id], function(error, result){
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect("/" + req.query.page);
  })
});

app.put('/update-manager',function(req,res){
  db.pool.query(updateManager, [req.body.ManagerFirstName, req.body.ManagerLastName], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.send(result);
  });
});

// Brokers Page
app.get('/brokers',function(req,res){
  let query = "SELECT * FROM Brokers;";
  db.pool.query(query, function(err, rows, fields){
    res.render('brokers', { data: rows});
  });
});

app.get('/insert-broker', (req, res) =>{
  var values = [req.query.BrokerID, req.query.BrokerName, req.query.BrokerStreetAddress, req.query.BrokerCity, req.query.BrokerState, req.query.BrokerZipCode];
  db.pool.query("INSERT INTO Brokers (BrokerID, BrokerName, BrokerStreetAddress, BrokerCity, BrokerState, BrokerZipCode) VALUES (?,?,?,?,?,?)", values, (error, result) => {
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect('/brokers');
  })
})

app.get('/delete-broker',function(req,res,next){
  db.pool.query("DELETE FROM "+req.query.table+" WHERE BrokerID=?", [req.query.id], function(error, result){
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect("/" + req.query.page);
  })
});

app.put('/update-broker',function(req,res){
  db.pool.query(updateBroker, [req.body.BrokerName, req.body.BrokerStreetAddress, req.body.BrokerCity, req.body.BrokerState, req.body.BrokerZipCode], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.send(result);
  });
});

// Securities Page
app.get('/securities',function(req,res){
  let query = "SELECT * FROM Securities;";
  db.pool.query(query, function(err, rows, fields){
    res.render('securities', { data: rows});
  });
});
  
app.post('/insert-security', (req, res) =>{
  db.pool.query(insertSecurity, [req.body.SecuritySymbol, req.body.CompanyName], (err, result) => {
    if(err){
      next(err);
      return;
    }
    res.send(result);
  })
})

app.get('/insert-security', (req, res) =>{
  var values = [req.query.SecurityID, req.query.SecuritySymbol, req.query.CompanyName];
  db.pool.query("INSERT INTO Securities (SecurityID, SecuritySymbol, CompanyName) VALUES (?,?,?)", values, (error, result) => {
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect('/securities');
  })
})

app.get('/delete-security',function(req,res,next){
  db.pool.query("DELETE FROM "+req.query.table+" WHERE SecurityID=?", [req.query.id], function(error, result){
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect("/" + req.query.page);
  })
});

app.put('/update-security',function(req,res){
  db.pool.query(updateSecurity, [req.body.SecuritySymbol, req.body.CompanyName], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.send(result);
  });
});

// Trades Page
app.get('/trades',function(req,res){
  let query = "SELECT * FROM Trades;";
  db.pool.query(query, function(err, rows, fields){
    res.render('trades', { data: rows});
  });
});

app.get('/insert-trade', (req, res) =>{
  var values = [req.query.TradeID, req.query.SecuritySymbol, req.query.Amount, req.query.TraderID, req.query.ManagerID, req.query.BrokerID, req.query.Time, req.query.Date];
  db.pool.query("INSERT INTO Brokers (TradeID, SecuritySymbol, Amount, TraderID, ManagerID, BrokerID, Time, Date) VALUES (?,?,?,?,?,?,?,?)", values, (error, result) => {
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect('/trades');
  })
})

app.get('/delete-trade',function(req,res,next){
  db.pool.query("DELETE FROM "+req.query.table+" WHERE TradeID=?", [req.query.id], function(error, result){
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect("/" + req.query.page);
  })
});

app.put('/update-trade',function(req,res){
  db.pool.query(updateTrade, [req.body.SecuritySymbol, req.body.Amount, req.body.TraderID, req.body.ManagerID, req.body.BrokerID, req.body.Time, req.body.Date], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.send(result);
  });
});

// Fills Page
app.get('/fills',function(req,res){
  let query = "SELECT * FROM Fills;";
  db.pool.query(query, function(err, rows, fields){
    res.render('fills', { data: rows});
  });
});
  
app.post('/insert-fill', (req, res) =>{
  db.pool.query(insertFill, [req.body.TradeID, req.body.SecuritySymbol, req.body.Amount, req.body.Time, req.body.Date], (err, result) => {
    if(err){
      next(err);
      return;
    }
    res.send(result);
  })
})

app.get('/insert-fill', (req, res) =>{
  var values = [req.query.FillID, req.query.TradeID, req.query.SecuritySymbol, req.query.Amount, req.query.Time, req.query.Date];
  db.pool.query("INSERT INTO Fills (FillID, TradeID, SecuritySymbol, Amount, Time, Date) VALUES (?,?,?,?,?,?)", values, (error, result) => {
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect('/fills');
  })
})

app.get('/delete-fill',function(req,res,next){
  db.pool.query("DELETE FROM "+req.query.table+" WHERE FillID=?", [req.query.id], function(error, result){
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
    res.redirect("/" + req.query.page);
  })
});

app.put('/update-fill',function(req,res){
  db.pool.query(updateFill, [req.body.TradeID, req.body.SecuritySymbol, req.body.Amount, req.body.Time, req.body.Date], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.send(result);
  });
});

// Error Routes
app.use(function(req, res){
    res.status(404);
    res.render("404");
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render("500");
});

/*npm
    LISTENER
*/
// app.listen(app.get('PORT'), function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
//     console.log('Express started on http://localhost:' + app.get('PORT') + '; press Ctrl-C to terminate.')
// });

app.listen(PORT, () => {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log('Server listening on port ${PORT}...');
});
