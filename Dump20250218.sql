-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: membres
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `calendari_debuts`
--

DROP TABLE IF EXISTS `calendari_debuts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendari_debuts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titol_event` varchar(45) NOT NULL,
  `lloc_event` varchar(45) NOT NULL,
  `data_event` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendari_debuts`
--

LOCK TABLES `calendari_debuts` WRITE;
/*!40000 ALTER TABLE `calendari_debuts` DISABLE KEYS */;
INSERT INTO `calendari_debuts` VALUES (1,'Assaig general','Teatre Victoria','2025-02-24 00:00:00'),(2,'Debut ','Teatre Victoria','2025-02-25 00:00:00'),(3,'Assaig','Escola','2025-02-02 00:00:00'),(4,'Assaig','Escola','2025-02-03 00:00:00'),(5,'Assaig','Escola','2025-02-04 00:00:00'),(6,'Assaig','Escola','2025-02-05 00:00:00');
/*!40000 ALTER TABLE `calendari_debuts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membres`
--

DROP TABLE IF EXISTS `membres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `cognom` varchar(45) NOT NULL,
  `rol` varchar(45) NOT NULL,
  `payroll` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membres`
--

LOCK TABLES `membres` WRITE;
/*!40000 ALTER TABLE `membres` DISABLE KEYS */;
INSERT INTO `membres` VALUES (1,'Sandra','Rovira','Tesorera',3990),(6,'Blas','Balcells','Actor',3700),(7,'Mariona','Muñoz','Actriu',2900),(8,'Xavi','Capell','Elèctric',4000),(10,'Conxita','Izquierdo','Actriu',4500),(11,'Pepe','Carreras','Figurant',1000),(12,'Montserrat','Capdevila','Directora',5000),(15,'Silvia','Munt','Escriptora',3200),(16,'Carles','Puig','Director Artístic',4000);
/*!40000 ALTER TABLE `membres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teatres_bcn`
--

DROP TABLE IF EXISTS `teatres_bcn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teatres_bcn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `adreça` varchar(200) NOT NULL,
  `latitud` decimal(10,8) NOT NULL,
  `longitud` decimal(11,8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teatres_bcn`
--

LOCK TABLES `teatres_bcn` WRITE;
/*!40000 ALTER TABLE `teatres_bcn` DISABLE KEYS */;
INSERT INTO `teatres_bcn` VALUES (9,'Teatre Romea','Hospital 51',41.38102000,2.17107000),(10,'Teatre Nacional','Plaça de les Arts 1',41.40080000,2.18538000),(11,'Teatre Tívoli','Casp 8',41.38900000,2.17038000),(12,'Teatre Victoria','Paral·lel 67',41.37494000,2.16879000),(13,'Teatre Condal','Paral·lel 91',41.37493000,2.16471000),(14,'Teatre Borràs','Plaça d\'Urquinaona 9',41.38901000,2.17535300);
/*!40000 ALTER TABLE `teatres_bcn` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-18 10:02:20
