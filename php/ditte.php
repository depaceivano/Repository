<?php

require_once('../classes/db/postgre.php');
require_once('../inc/conf.inc');
require_once("../classes/codebase/grid_connector.php");
require("../classes/codebase/db_postgre.php");
ini_set('display_errors', 'off');
ini_set('display_startup_errors', 'off');
set_time_limit(0);
error_reporting(0 );




$db = new postgres(PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWD);
	if($db->getLastError() != ""){
		return;
	}
	if ($_POST['opt']) $opt =  $_POST['opt'];
	else  $opt = $_GET['opt'];
	switch ($opt){
	
		case "tableDitte" : 
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);
				  
				$grid = new GridConnector($res,"Postgre");			
				
				$sql = 'SELECT a.idditta as id,a.ragioneSociale as "RAGIONE SOCIALE",a.piva as "P.IVA",a.codfiscale as "CODICE FISCALE",b.indirizzo as "INDIRIZZO",
						b.city as "CITTA",b.zipcode as "CAP",b.provincia as "PROVINCIA"
						FROM common.ditte as a 
						LEFT JOIN common.indirizzi as b ON a.idAdress = b.idIndirizzo 
						where a.hidden =false order by a.ragioneSociale ASC';
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idditta","id,RAGIONE SOCIALE,P.IVA,CODICE FISCALE,INDIRIZZO,CITTA,CAP,PROVINCIA");
				break;			
		case "listDitte" : 
				$sql = "SELECT idditta as id,ragioneSociale from common.ditte where hidden =false and antimafia=true ";
				$db->json($sql);
				break;		
		case "get" :
				$sql = "SELECT * from common.ditte as a LEFT JOIN common.indirizzi as b ON a.idAdress = b.idIndirizzo where idditta =" . $_POST['idDitta'];
				//echo $sql;
				$db->Json($sql);
				break;
		case "save" : 
			
				$arrJson = json_decode($_POST["arr"], true);
				
				$nome = $arrJson['nome'];
				$piva = $arrJson['piva'];
				$codicefiscale = $arrJson['codicefiscale'];
				$mail = $arrJson['mail'];
				$tel = $arrJson['tel'];
				$indirizzo = $arrJson['indirizzo'];
				$citta = $arrJson['citta'];
				$cap = $arrJson['cap'];
				$provincia = $arrJson['provincia'];
				
				if ($_POST["id"]=='null'){
					$idAddress = true;
					$sqlAdd =  "INSERT INTO common.indirizzi (indirizzo,city,zipCode,provincia,mail,telefono) VALUES (".
							"'".$indirizzo ."',".
							"'".$citta ."',".
							"'".$cap ."',".
							"'".$provincia ."',".
							"'".$mail ."',".
							"'".$tel ."') RETURNING idIndirizzo";
					$result = $db->update($sqlAdd,$_POST['iduser'],$idAddress);
					if ($result){
						$sqlDitta = "INSERT INTO common.ditte (ragioneSociale	,piva,codfiscale,idAdress) VALUES (".
						"'".$nome ."',".
						"'".$piva ."',".
						"'".$codicefiscale ."',".
						"".$idAddress .")";
						$result2 = $db->update($sqlDitta,$_POST['iduser']);
						echo $result2?1:$db->getLastError();
					}else{
						echo $db->getLastError();
					}
				
				}else{
					if ($_POST["idindirizzo"]!=null) {
						
						$sqlAdd =  "UPDATE 	common.indirizzi SET ".
								"indirizzo = '".$indirizzo."',".
								"city = '".$citta."',".
								"zipCode = '".$cap."',".
								"provincia = '".$provincia."',".
								"mail = '".$mail."',".
								"telefono = '".$tel."' WHERE idIndirizzo=".$_POST['idindirizzo'];
	
							$result = $db->update($sqlAdd,$_POST['iduser']);	
							if ($result){
								$sqlDitta =  "UPDATE common.ditte SET ".
										"ragioneSociale = '".$nome."',".
										"piva = '".$piva."',".
										"codfiscale = '".$codicefiscale."' WHERE idditta =".$_POST["id"];
								$result2 = $db->update($sqlDitta,$_POST['iduser']);
								echo $result2?1:$db->getLastError();
								
							}else{
								echo $db->getLastError();
							}
					}else{
						$idAddress = true;
						$sqlAdd =  "INSERT INTO common.indirizzi (indirizzo,city,zipCode,provincia,mail,telefono) VALUES (".
							"'".$indirizzo ."',".
							"'".$citta ."',".
							"'".$cap ."',".
							"'".$provincia ."',".
							"'".$mail ."',".
							"'".$tel ."') RETURNING idIndirizzo";
							
							$result = $db->update($sqlAdd,$_POST['iduser'],$idAddress);	
							if ($result){
								$sqlDitta =  "UPDATE common.ditte SET ".
										"ragioneSociale = '".$nome."',".
										"piva = '".$piva."',".
										"idAdress = ".$idAddress.",".
										"codfiscale = '".$codicefiscale."' WHERE idditta =".$_POST["id"];
								$result2 = $db->update($sqlDitta,$_POST['iduser']);
								echo $result2?1:$db->getLastError();
								
							}else{
								echo $db->getLastError();
							}							
							
							
					}						
					
					
					
				}
				
				break;
				
		case "delete" : 
			$sql = "UPDATE common.ditte SET hidden=true WHERE idditta="  .$_POST["id"];
			//echo $sql;exit;
			$result = $db->update($sql,$_POST['iduser']);
			echo $result?1:$db->getLastError();
			break;				
	}
	
?>