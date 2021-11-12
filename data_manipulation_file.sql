

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