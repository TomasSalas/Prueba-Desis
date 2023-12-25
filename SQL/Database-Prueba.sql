-- Server version	8.0.33
CREATE DATABASE IF NOT EXISTS Desis;
USE Desis;

DROP TABLE IF EXISTS `Candidato`;
CREATE TABLE `Candidato` (
  `ID_CANDIDATO` int NOT NULL,
  `NOMBRE` varchar(100) DEFAULT NULL,
  `APELLIDO` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID_CANDIDATO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Candidato` WRITE;
INSERT INTO `Candidato` VALUES (1,'Javiera','Barrios'),(2,'Tomas','Salas');
UNLOCK TABLES;


DROP TABLE IF EXISTS `Comuna`;
CREATE TABLE `Comuna` (
  `ID_COMUNA` int NOT NULL,
  `NOMBRE_COMUNA` varchar(100) DEFAULT NULL,
  `ID_REGION` int DEFAULT NULL,
  PRIMARY KEY (`ID_COMUNA`),
  KEY `Comuna_FK` (`ID_REGION`),
  CONSTRAINT `Comuna_FK` FOREIGN KEY (`ID_REGION`) REFERENCES `Region` (`ID_REGION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Comuna` WRITE;
INSERT INTO `Comuna` VALUES (1,'Arica',1),(2,'Camarones',1),(3,'Iquique',2),(4,'Alto Hospicio',2),(5,'Antofagasta',3),(6,'Mejillones',3),(7,'Copiapó',4),(8,'Caldera',4),(9,'La Serena',5),(10,'Coquimbo',5),(11,'Valparaíso',6),(12,'Viña del Mar',6),(13,'Santiago',7),(14,'Puente Alto',7),(15,'Rancagua',8),(16,'Machalí',8),(17,'Talca',9),(18,'Curicó',9),(19,'Chillán',10),(20,'San Carlos',10),(21,'Concepción',11),(22,'Talcahuano',11),(23,'Temuco',12),(24,'Villarrica',12),(25,'Valdivia',13),(26,'La Unión',13),(27,'Puerto Montt',14),(28,'Osorno',14),(29,'Coyhaique',15),(30,'Aysén',15),(31,'Punta Arenas',16),(32,'Puerto Natales',16);
UNLOCK TABLES;


DROP TABLE IF EXISTS `Region`;
CREATE TABLE `Region` (
  `ID_REGION` int NOT NULL,
  `NOMBRE_REGION` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID_REGION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Region` WRITE;
INSERT INTO `Region` VALUES (1,'Arica y Parinacota'),(2,'Tarapacá'),(3,'Antofagasta'),(4,'Atacama'),(5,'Coquimbo'),(6,'Valparaíso'),(7,'Metropolitana de Santiago'),(8,'Libertador General Bernardo OHiggins'),(9,'Maule'),(10,'Ñuble'),(11,'Biobío'),(12,'La Araucanía'),(13,'Los Ríos'),(14,'Los Lagos'),(15,'Aysén del General Carlos Ibáñez del Campo'),(16,'Magallanes y de la Antártica Chilena');
UNLOCK TABLES;

DROP TABLE IF EXISTS `Voto`;
CREATE TABLE `Voto` (
  `ID_VOTO` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_APELLIDO` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ALIAS` varchar(100) DEFAULT NULL,
  `RUT` varchar(100) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `ID_REGION` int DEFAULT NULL,
  `ID_COMUNA` int DEFAULT NULL,
  `ID_CANDIDATO` int DEFAULT NULL,
  `WEB` tinyint(1) DEFAULT NULL,
  `TV` tinyint(1) DEFAULT NULL,
  `REDES` tinyint(1) DEFAULT NULL,
  `AMIGO` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID_VOTO`),
  KEY `Voto_FK` (`ID_COMUNA`),
  KEY `Voto_FK_1` (`ID_REGION`),
  KEY `FK_CANDIDATO` (`ID_CANDIDATO`),
  CONSTRAINT `FK_CANDIDATO` FOREIGN KEY (`ID_CANDIDATO`) REFERENCES `Candidato` (`ID_CANDIDATO`),
  CONSTRAINT `Voto_FK` FOREIGN KEY (`ID_COMUNA`) REFERENCES `Comuna` (`ID_COMUNA`),
  CONSTRAINT `Voto_FK_1` FOREIGN KEY (`ID_REGION`) REFERENCES `Region` (`ID_REGION`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;