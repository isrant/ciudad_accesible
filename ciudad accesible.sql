/*creando base de datos sql..*/

CREATE DATABASE administrador;
USE administrador;
CREATE TABLE Incidencias
(
id INT UNSIGNED AUTO_INCREMENT,
Título VARCHAR(255) NOT NULL,
Descripción VARCHAR(255) NOT NULL,
Foto LONGBLOB,
Ciudad VARCHAR(50) NOT NULL,
Barrio VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
)

