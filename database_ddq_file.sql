-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: TradeOrderManagement
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Traders`
--

DROP TABLE IF EXISTS `Traders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Traders` (
  `TraderID` int(11) UNIQUE NOT NULL,
  `TraderFirstName` varchar(255) NOT NULL,
  `TraderLastName` varchar(255) NOT NULL,
  PRIMARY KEY (`TraderID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Traders`
--

LOCK TABLES `Traders` WRITE;
/*!40000 ALTER TABLE `Traders` DISABLE KEYS */;
INSERT INTO `Traders` VALUES (1,'James','McAvoy'),(2,'Michael','Fassbender'),(3,'Patrick','Stewart');
/*!40000 ALTER TABLE `Traders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Managers`
--

DROP TABLE IF EXISTS `Managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Managers` (
  `ManagerID` int(11) UNIQUE NOT NULL,
  `ManagerFirstName` varchar(255) NOT NULL,
  `ManagerLastName` varchar(255) NOT NULL,
  PRIMARY KEY (`ManagerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Managers`
--

LOCK TABLES `Managers` WRITE;
/*!40000 ALTER TABLE `Managers` DISABLE KEYS */;
INSERT INTO `Managers` VALUES (1,'Michael','Scott'),(2,'Steve','Carrell'),(3,'John','Krasinski');
/*!40000 ALTER TABLE `Managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Brokers`
--

DROP TABLE IF EXISTS `Brokers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Brokers` (
  `BrokerID` int(11) UNIQUE NOT NULL,
  `BrokerName` varchar(255) UNIQUE NOT NULL,
  `BrokerAddress` varchar(255) NOT NULL,
  PRIMARY KEY (`BrokerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Brokers`
--

LOCK TABLES `Brokers` WRITE;
/*!40000 ALTER TABLE `Brokers` DISABLE KEYS */;
INSERT INTO `Brokers` VALUES (1,'Goldman Sachs','NYC'),(2,'JP Morgan','NYC'),(3,'Morgan Stanley','NYC');
/*!40000 ALTER TABLE `Brokers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Securities`
--

DROP TABLE IF EXISTS `Securities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Securities` (
  `SecuritySymbol` varchar(255) UNIQUE NOT NULL,
  `CompanyName` varchar(255) UNIQUE NOT NULL,
  PRIMARY KEY (`SecuritySymbol`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Securities`
--

LOCK TABLES `Securities` WRITE;
/*!40000 ALTER TABLE `Securities` DISABLE KEYS */;
INSERT INTO `Securities` VALUES ('AAPL','Apple'),('AMZN','Amazon'),('MSFT','Microsoft');
/*!40000 ALTER TABLE `Securities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trades`
--

DROP TABLE IF EXISTS `Trades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Trades` (
  `TradeID` int(11) UNIQUE NOT NULL,
  `SecuritySymbol` varchar(255) NOT NULL,
  `Amount` int(11) NOT NULL,
  `TraderID` int(11) NOT NULL,
  `ManagerID` int(11) NOT NULL,
  `BrokerID` int(11) NOT NULL,
  `Time` Time NOT NULL,
  `Date` Date NOT NULL,
  PRIMARY KEY (`TradeID`),
  CONSTRAINT `TradesSecuritySymbol` FOREIGN KEY (`SecuritySymbol`) REFERENCES `Securities` (`SecuritySymbol`),
  CONSTRAINT `TradesTraderID` FOREIGN KEY (`TraderID`) REFERENCES `Traders` (`TraderID`),
  CONSTRAINT `TradesManagerID` FOREIGN KEY (`ManagerID`) REFERENCES `Managers` (`ManagerID`),
  CONSTRAINT `TradesBrokerID` FOREIGN KEY (`BrokerID`) REFERENCES `Brokers` (`BrokerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trades`
--

LOCK TABLES `Trades` WRITE;
/*!40000 ALTER TABLE `Trades` DISABLE KEYS */;
INSERT INTO `Trades` VALUES (1,'AAPL','1000',1,2,1,'9:30:20','2021-01-01'),(2,'AMZN','500',2,1,2,'9:35:25','2021-01-01'),(3,'MSFT','750',1,1,1,'9:37:43','2021-01-02');
/*!40000 ALTER TABLE `Trades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Fills`
--

DROP TABLE IF EXISTS `Fills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Fills` (
  `FillID` int(11) UNIQUE NOT NULL,
  `TradeID` int(11) NOT NULL,
  `SecuritySymbol` varchar(255) NOT NULL,
  `Amount` int(11) NOT NULL,
  `Time` Time NOT NULL,
  `Date` Date NOT NULL,
  PRIMARY KEY (`FillID`),
  CONSTRAINT `FillsTradeID` FOREIGN KEY (`TradeID`) REFERENCES `Trades` (`TradeID`),
  CONSTRAINT `FillsSecuritySymbol` FOREIGN KEY (`SecuritySymbol`) REFERENCES `Securities` (`SecuritySymbol`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for Fills `Trades`
--

LOCK TABLES `Fills` WRITE;
/*!40000 ALTER TABLE `Fills` DISABLE KEYS */;
INSERT INTO `Fills` VALUES (1,1,'AAPL','500','9:30:35','2021-01-01'),(2,1,'AAPL','250','9:31:50','2021-01-01'),(3,2,'AMZN','350','9:35:57','2021-01-01');
/*!40000 ALTER TABLE `Fills` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-03  0:38:33
