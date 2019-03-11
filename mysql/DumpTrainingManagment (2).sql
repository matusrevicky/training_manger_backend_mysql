CREATE DATABASE  IF NOT EXISTS `training_managment` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `training_managment`;
-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: localhost    Database: training_managment
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clusters`
--

DROP TABLE IF EXISTS `clusters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clusters` (
  `idCluster` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idCluster`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clusters`
--

LOCK TABLES `clusters` WRITE;
/*!40000 ALTER TABLE `clusters` DISABLE KEYS */;
INSERT INTO `clusters` VALUES (1,'Pc'),(2,'uc');
/*!40000 ALTER TABLE `clusters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `providers` (
  `idProvider` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idProvider`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `roles` (
  `idRole` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  PRIMARY KEY (`idRole`),
  UNIQUE KEY `UK_nb4h0p6txrmfc0xbrd1kglp9t` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'normal',0),(2,'approver1',0),(3,'approver2',0),(4,'approver3',0);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainings`
--

DROP TABLE IF EXISTS `trainings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `trainings` (
  `idTraining` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idTraining`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainings`
--

LOCK TABLES `trainings` WRITE;
/*!40000 ALTER TABLE `trainings` DISABLE KEYS */;
INSERT INTO `trainings` VALUES (1,'training1'),(2,'training2');
/*!40000 ALTER TABLE `trainings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainings_has_clusters`
--

DROP TABLE IF EXISTS `trainings_has_clusters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `trainings_has_clusters` (
  `idTraining` int(11) NOT NULL,
  `idCluster` int(11) NOT NULL,
  PRIMARY KEY (`idTraining`,`idCluster`),
  KEY `fk_Trainings_has_Clusters_Clusters1_idx` (`idCluster`),
  KEY `fk_Trainings_has_Clusters_Trainings1_idx` (`idTraining`),
  CONSTRAINT `fk_Trainings_has_Clusters_Clusters1` FOREIGN KEY (`idCluster`) REFERENCES `clusters` (`idcluster`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Trainings_has_Clusters_Trainings1` FOREIGN KEY (`idTraining`) REFERENCES `trainings` (`idtraining`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainings_has_clusters`
--

LOCK TABLES `trainings_has_clusters` WRITE;
/*!40000 ALTER TABLE `trainings_has_clusters` DISABLE KEYS */;
/*!40000 ALTER TABLE `trainings_has_clusters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainings_has_providers`
--

DROP TABLE IF EXISTS `trainings_has_providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `trainings_has_providers` (
  `idTraining` int(11) NOT NULL,
  `idProvider` int(11) NOT NULL,
  `Price` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTraining`,`idProvider`),
  KEY `fk_Trainings_has_Providers_Providers1_idx` (`idProvider`),
  KEY `fk_Trainings_has_Providers_Trainings1_idx` (`idTraining`),
  CONSTRAINT `fk_Trainings_has_Providers_Providers1` FOREIGN KEY (`idProvider`) REFERENCES `providers` (`idprovider`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Trainings_has_Providers_Trainings1` FOREIGN KEY (`idTraining`) REFERENCES `trainings` (`idtraining`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainings_has_providers`
--

LOCK TABLES `trainings_has_providers` WRITE;
/*!40000 ALTER TABLE `trainings_has_providers` DISABLE KEYS */;
/*!40000 ALTER TABLE `trainings_has_providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_role`
--

DROP TABLE IF EXISTS `user_has_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_has_role` (
  `idUser` int(11) NOT NULL,
  `idRole` int(11) NOT NULL,
  PRIMARY KEY (`idUser`,`idRole`),
  KEY `fk_User_has_Role_Role1_idx` (`idRole`),
  KEY `fk_User_has_Role_User1_idx` (`idUser`),
  CONSTRAINT `fk_User_has_Role_Role1` FOREIGN KEY (`idRole`) REFERENCES `roles` (`idrole`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_User_has_Role_User1` FOREIGN KEY (`idUser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_role`
--

LOCK TABLES `user_has_role` WRITE;
/*!40000 ALTER TABLE `user_has_role` DISABLE KEYS */;
INSERT INTO `user_has_role` VALUES (8,1),(10,1),(10,2),(11,3);
/*!40000 ALTER TABLE `user_has_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_substitute`
--

DROP TABLE IF EXISTS `user_has_substitute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_has_substitute` (
  `idUser` int(11) NOT NULL,
  `idSubstitute` int(11) NOT NULL,
  PRIMARY KEY (`idUser`,`idSubstitute`),
  KEY `fk_Users_has_Users_Users2_idx` (`idSubstitute`),
  KEY `fk_Users_has_Users_Users1_idx` (`idUser`),
  CONSTRAINT `fk_Users_has_Users_Users1` FOREIGN KEY (`idUser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Users_has_Users_Users2` FOREIGN KEY (`idSubstitute`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_substitute`
--

LOCK TABLES `user_has_substitute` WRITE;
/*!40000 ALTER TABLE `user_has_substitute` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_substitute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_training`
--

DROP TABLE IF EXISTS `user_has_training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_has_training` (
  `idUser` int(11) NOT NULL,
  `idTraining` int(11) NOT NULL,
  PRIMARY KEY (`idUser`,`idTraining`),
  KEY `fk_User_has_Training_Training1_idx` (`idTraining`),
  KEY `fk_User_has_Training_User1_idx` (`idUser`),
  CONSTRAINT `fk_User_has_Training_Training1` FOREIGN KEY (`idTraining`) REFERENCES `trainings` (`idtraining`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_User_has_Training_User1` FOREIGN KEY (`idUser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_training`
--

LOCK TABLES `user_has_training` WRITE;
/*!40000 ALTER TABLE `user_has_training` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_training` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `idBoss` int(11) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `username` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  KEY `fk_User_User1_idx` (`idBoss`),
  CONSTRAINT `fk_User_User1` FOREIGN KEY (`idBoss`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'u2','u','u',10,0,NULL,NULL),(9,'u3','u','u',10,0,NULL,NULL),(10,'b1','bb','b',11,0,NULL,NULL),(11,'b2','bb','b',12,0,NULL,NULL),(12,'b3','bb','b',NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-11 12:01:14
