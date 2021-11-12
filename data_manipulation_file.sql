

/*Traders*/
--Query for adding a new trader functionality 
INSERT INTO `Traders`(`TraderID`,`TraderFirstName`, `TraderLastName`) 
VALUES (:traderIDInput, :traderFnameInput, :traderLnameInput) ;

--Query for deleting a trader
DELETE FROM `Traders` WHERE `TraderID`= :traderIDselected;

--Query for updating a specific Trader
UPDATE `Traders` 
SET `TraderID` = :traderIDInput, `TraderFirstName` = :traderFnameInput, `TraderLastName` = :traderLnameInput
WHERE `TraderID` = :traderIDselected;

--Query for getting all trader names
SELECT * FROM `Traders`;

/*Managers*/
--Query for adding a new trader functionality 
INSERT INTO `Managers`(`ManagerID`,`ManagerFirstName`, `ManagerLastName`) 
VALUES (:managerIDInput, :managerFnameInput, :managerLnameInput) ;

--Query for deleting a manager
DELETE FROM `Managers` WHERE `ManagerID`= :managerIDselected;

--Query for updating a specific manager
UPDATE `Managers` 
SET `ManagerID` = :managerIDInput, `ManagerFirstName` = :managerFnameInput, `ManagerLastName` = :managerLnameInput
WHERE `ManagerID` = :managerIDselected;

--Query for getting all trader names
SELECT * FROM `Managers`;


/*Brokers*/
--Query for adding a new trader functionality 
INSERT INTO `Brokers`(`BrokerID`,`BrokerName`, `BrokerAddress`) 
VALUES (:brokerIDInput, :brokerNameInput, :brokerAddressInput) ;

--Query for deleting a broker
DELETE FROM `Brokers` WHERE `BrokerID` = :brokerIDselected;

--Query for updating a specific broker
UPDATE `Brokers` 
SET `BrokerID` = :brokerIDInput, `BrokerName` = :brokerNameInput, `BrokerAddress` = :brokerAddressInput
WHERE `BrokerID` = :brokerIDselected;

--Query for getting all trader names
SELECT * FROM `Brokers`;

/*Securities*/
--Query for adding a new trader functionality 
INSERT INTO `Securities`(`SecuritySymbol`,`CompanyName`) 
VALUES (:securitySymbolInput, :companyNameInput) ;

--Query for deleting a security
DELETE FROM `Securities` WHERE `SecuritySymbol` = :securitySymbolselected;

--Query for updating a specific security
UPDATE `Securities` 
SET `SecuritySymbol` = :securitySymbolInput, `CompanyName` = :companyNameInput
WHERE `SecuritySymbol` = :securitySymbolselected;

--Query for getting all trader names
SELECT * FROM `Securities`;

/*Trades*/
--Query for adding a new trader functionality 
INSERT INTO `Trades`(`TradeID`,`SecuritySymbol`, `Amount`,`TraderID`, `ManagerID`, `BrokerID`,`Time`, `Date`) 
VALUES (:tradeIDInput, :securitySymbolInput, :amountInput, :traderIDInput, :managerIDInput, :brokerIDInput, :timeInput, :dateInput) ;

--Query for deleting a broker
DELETE FROM `Trades` WHERE `TradeID` = :tradeIDselected;

--Query for updating a specific broker
UPDATE `Trades` 
SET `TradeID` = :tradeIDInput, `SecuritySymbol` = :securitySymbolInput, `Amount`=:amountInput,`TraderID`=:traderIDInput, `ManagerID`=:managerIDInput, `BrokerID`=:brokerIDInput,`Time`=:timeInput, `Date`=:dateInput
WHERE `TradeID` = :tradeIDselected;

--Query for getting all trader names
SELECT * FROM `Trades`;


/*Fills*/
--Query for adding a new trader functionality 
INSERT INTO `Fills`(`FillID`, `TradeID`,`SecuritySymbol`, `Amount`,`Time`, `Date`) 
VALUES (:fillsIDInput, :tradeIDInput, :securitySymbolInput, :amountInput, :timeInput, :dateInput) ;

--Query for deleting a broker
DELETE FROM `Fills` WHERE `FillID` = :fillIDselected;

--Query for updating a specific broker
UPDATE `Fills` 
SET `FillID`=:fillIDInput, `TradeID`=:tradeIDInput `SecuritySymbol`=:securitySymbolInput, `Amount`=:amountInput,`Time`=:timeInput, `Date`=:dateInput
WHERE `FillID` = :fillIDselected;

--Query for getting all trader names
SELECT * FROM `Fills`;