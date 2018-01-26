<?php

require_once('../classes/db/postgre.php');
require_once('../inc/conf.inc');
require_once("../classes/codebase/grid_connector.php");
require("../classes/codebase/db_postgre.php");
ini_set('display_errors', 'off');
ini_set('display_startup_errors', 'off');
set_time_limit(0);
error_reporting(0);




$db = new postgres(PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWD);
	if($db->getLastError() != ""){
		return;
	}
	if ($_POST['opt']) $opt =  $_POST['opt'];
	else  $opt = $_GET['opt'];
	
	switch ($opt){
		case "tableDossier" : 
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);
				  
				$grid = new GridConnector($res,"Postgre");			
				
				$sql = 'SELECT iddossier as id, codice,descrizione FROM corrispondenze.dossiers
						where hidden =false order by descrizione ';
				//echo $sql;
				$grid->dynamic_loading(100);
			//
			$grid->render_sql($sql,"iddossier","id,codice,descrizione");
		
				break;			
		case 'save'	:
				$arrJson = json_decode($_POST["arr"], true);
				
				$codice = $arrJson['codice'];
				$descrizione = $arrJson['descrizione'];			
			
			if ($_POST["id"]=='null'){
					$sql = "INSERT INTO corrispondenze.dossiers (codice,descrizione) VALUES('".$codice."','". $descrizione."')";
					//echo $sql;exit;
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();
			}else{
				$sql = "UPDATE corrispondenze.dossiers set codice='".$codice."', descrizione = '".$descrizione."' where iddossier = ".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();				
			}
			break;		
		case "get" :	
				$sql = "SELECT * FROM corrispondenze.dossiers  where iddossier =" . $_POST['idDossier'];
				//echo $sql;
				$db->Json($sql);
				break;		
		case 'delete' :
				$sql = "UPDATE corrispondenze.dossiers set hidden=true WHERE iddossier=".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
				break;					
		case 'listDossier' : 
				$sql = "SELECT idDossier as id,codice,descrizione from corrispondenze.dossiers where hidden =false ;";
				$db->json($sql);				
				
	}
	
?>