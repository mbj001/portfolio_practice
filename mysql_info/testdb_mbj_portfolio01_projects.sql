CREATE DATABASE  IF NOT EXISTS `testdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `testdb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: testdb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mbj_portfolio01_projects`
--

DROP TABLE IF EXISTS `mbj_portfolio01_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mbj_portfolio01_projects` (
  `num` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `orgimg1` varchar(50) DEFAULT NULL,
  `img1` varchar(50) DEFAULT NULL,
  `orgimg2` varchar(50) DEFAULT NULL,
  `img2` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mbj_portfolio01_projects`
--

LOCK TABLES `mbj_portfolio01_projects` WRITE;
/*!40000 ALTER TABLE `mbj_portfolio01_projects` DISABLE KEYS */;
INSERT INTO `mbj_portfolio01_projects` VALUES (1,'원피스','project02.jpg','637494517720fa6ebc9d24c207aead24','project_02.jpg','d13adcf1e58fc3b3cb931e3e004255df'),(2,'진격의거인','project01.jfif','fc55025e9168cf85fcd6e99a301fd85a','project_01.jpg','db4f08c37bd32d14d3b34cf8a5141840'),(3,'스파이 패밀리','project08.jpg','b43f9386051fa1f312f914e4df87e2c0','project_08.jpg','26aaf2e5b70472fb8c850422bc7fe5a3'),(4,'리제로','project_06.jpg','1d133a34e7ef5c922f5f59ba526f170a','project06.jpg','c03214cfda1f7ee1189c79b39db07c43'),(5,'귀멸의 칼날','project05.jpg','9091d064e61f889f318668d5e7e5e1b7','project_05.jpg','3203e413441695b80c399fc8dfa95a1f');
/*!40000 ALTER TABLE `mbj_portfolio01_projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-02 10:50:18
