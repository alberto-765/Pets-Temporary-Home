<?php

////  CONFIGURACIONES  ////
// SET GLOBAL FOREIGN_KEY_CHECKS=0; BASE DE DATOOOOOOOOOOOOOS 
define("URI", $_SERVER['REQUEST_URI']);
//////// Controlador por defecto
define("DEFAULT_CONTROLLER", "Inicio_c");
define("DEFAULT_METHOD", "Index");
///////// Path al core
define("CORE", "system/core/");
///////// Path a los controladores de la aplicación
define("PATH_CONTROLLERS", "app/controladores/");
///////// Path a las vistas de la aplicación
define("PATH_VIEWS", "app/vistas/");
///////// Path a los modelos de la aplicación
define("PATH_MODELS", "app/modelos/");

///////// Path a los modelos de la aplicación
define("PATH_ASSETS", "app/assets/");

/// cambiar las siguientes rutas para cada proyecto ///
///////// ROOT de nuestra aplicacion
// define("ROOT",  $_SERVER['DOCUMENT_ROOT'] . "/");

define("ROOT", $_SERVER['DOCUMENT_ROOT'] . "/proyecto_final_9/");

////////// URL BASE
// define("BASE_URL", "https://petstemporaryhome1.000webhostapp.com/");
define("BASE_URL", "http://localhost/proyecto_final_9/");


define("DB_HOST", "localhost");
// define("DB_USER", "id20563089_petstemporaryhome1");
define("DB_USER", "root");
// define("DB_PASS", ")t?aNq\JuJ^9v7DJ");
define("DB_PASS", "");
define("DB_NAME", "proyecto_final");
// define("DB_NAME", "id20563089_petstemporaryhome");
