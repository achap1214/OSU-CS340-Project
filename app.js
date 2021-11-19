// App.js

/*
    SETUP
*/
const express = require('express');   // We are using the express library for the web server
const app = express();            // We need to instantiate an express object to interact with the server in our code

// app.set('PORT', 5757);
var PORT = 5757;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const db = require('./database/db-connector.js')

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use('/', express.static('public'));
app.set('mysql', mysql);
app.use('/traders', require('./traders.js'));
app.use('/managers', require('./managers.js'));
app.use('/brokers', require('./brokers.js'));
app.use('/securities', require('./securities.js'));
app.use('/trades', require('./trades.js'));
app.use('/fills', require('./fills.js'));
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
app.get('/traders',function(req,res,next){
    var context = {};
    db.pool.query(displayTraders, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
    context.tradersResults = {rows: rows}
    res.render('traders', context);
    });
  });
  
  app.post('/insert-trader', (req, res, next) =>{
    db.pool.query(insertTrader, [req.body.TraderFirstName, req.body.TraderLastName], (err, result) => {
      if(err){
        next(err);
        return;
      }
      res.send(result);
    })
  })
  
  app.delete('/delete-trader',function(req,res,next){
    db.pool.query(deleteTrader, [req.body.TraderID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });
  
  app.put('/update-trader',function(req,res,next){
    db.pool.query(updateTrader, [req.body.TraderFirstName, req.body.TraderLastName], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });

// Managers Page
app.get('/managers',function(req,res,next){
    var context = {};
    db.pool.query(displayManagers, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
    context.managersResults = {rows: rows}
    res.render('managers', context);
    });
  });
  
  app.post('/insert-manager', (req, res, next) =>{
    db.pool.query(insertManager, [req.body.ManagerFirstName, req.body.ManagerLastName], (err, result) => {
      if(err){
        next(err);
        return;
      }
      res.send(result);
    })
  })
  
  app.delete('/delete-manager',function(req,res,next){
    db.pool.query(deleteManager, [req.body.ManagerID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });
  
  app.put('/update-manager',function(req,res,next){
    db.pool.query(updateManager, [req.body.ManagerFirstName, req.body.ManagerLastName], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });

// Brokers Page
app.get('/brokers',function(req,res,next){
    var context = {};
    db.pool.query(displayBrokers, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
    context.BrokersResults = {rows: rows}
    res.render('brokers', context);
    });
  });
  
  app.post('/insert-broker', (req, res, next) =>{
    db.pool.query(insertBroker, [req.body.BrokerName, req.body.BrokerStreetAddress, req.body.BrokerCity, req.body.BrokerState, req.body.BrokerZipCode], (err, result) => {
      if(err){
        next(err);
        return;
      }
      res.send(result);
    })
  })
  
  app.delete('/delete-broker',function(req,res,next){
    db.pool.query(deleteBroker, [req.body.BrokerID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });
  
  app.put('/update-broker',function(req,res,next){
    db.pool.query(updateBroker, [req.body.BrokerName, req.body.BrokerStreetAddress, req.body.BrokerCity, req.body.BrokerState, req.body.BrokerZipCode], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });

// Securities Page
  app.get('/securities',function(req,res,next){
    var context = {};
    db.pool.query(displaySecurities, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
    context.SecuritiesResults = {rows: rows}
    res.render('securities', context);
    });
  });
  
  app.post('/insert-security', (req, res, next) =>{
    db.pool.query(insertSecurity, [req.body.SecuritySymbol, req.body.CompanyName], (err, result) => {
      if(err){
        next(err);
        return;
      }
      res.send(result);
    })
  })
  
  app.delete('/delete-security',function(req,res,next){
    db.pool.query(deleteSecurity, [req.body.SecurityID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });
  
  app.put('/update-security',function(req,res,next){
    db.pool.query(updateSecurity, [req.body.SecuritySymbol, req.body.CompanyName], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });

// Trades Page
app.get('/trades',function(req,res,next){
    var context = {};
    db.pool.query(displayTrades, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
    context.TradesResults = {rows: rows}
    res.render('trades', context);
    });
  });
  
  app.post('/insert-trade', (req, res, next) =>{
    db.pool.query(insertTrade, [req.body.SecuritySymbol, req.body.Amount, req.body.TraderID, req.body.ManagerID, req.body.BrokerID, req.body.Time, req.body.Date], (err, result) => {
      if(err){
        next(err);
        return;
      }
      res.send(result);
    })
  })
  
  app.delete('/delete-trade',function(req,res,next){
    db.pool.query(deleteTrade, [req.body.TradeID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });
  
  app.put('/update-trade',function(req,res,next){
    db.pool.query(updateTrade, [req.body.SecuritySymbol, req.body.Amount, req.body.TraderID, req.body.ManagerID, req.body.BrokerID, req.body.Time, req.body.Date], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });

// Fills Page
app.get('/fills',function(req,res,next){
    var context = {};
    db.pool.query(displayFills, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
    context.FillsResults = {rows: rows}
    res.render('fills', context);
    });
  });
  
  app.post('/insert-fill', (req, res, next) =>{
    db.pool.query(insertFill, [req.body.TradeID, req.body.SecuritySymbol, req.body.Amount, req.body.Time, req.body.Date], (err, result) => {
      if(err){
        next(err);
        return;
      }
      res.send(result);
    })
  })
  
  app.delete('/delete-fill',function(req,res,next){
    db.pool.query(deleteFill, [req.body.FillID], function(err, result){
      if(err){
        next(err);
        return;
      }
      res.send(result);
    });
  });
  
  app.put('/update-fill',function(req,res,next){
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

app.listen(PORT), function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
};
