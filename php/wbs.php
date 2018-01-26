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

		// *************************************************************************
		// ******************************** OGGETTO ********************************
		// *************************************************************************
		case 'listOggetto' : 
				$sql = "SELECT idprogetto as id,codice,descrizione from common.progetto where hidden =false";
				$db->json($sql);
				break;				
		case 'tableOggetto':
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);
				
				$grid = new GridConnector($res,"Postgre");				
				$sql = "SELECT idprogetto as id,codice,descrizione from common.progetto where hidden =false order by codice";
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idprogetto","id,codice,descrizione");
				break;
		case 'saveOggetto'	:
			if ($_POST["id"]=='null'){
					$sql = "INSERT INTO common.progetto (codice,descrizione) VALUES('".$_POST['codice']."','". $_POST['descrizione']."')";
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();
			}else{
				$sql = "UPDATE common.progetto set codice='".$_POST['codice']."', descrizione = '".$_POST['descrizione']."' where idProgetto = ".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();				
			}
				break;
		case 'deleteOggetto' :
				$sql = "UPDATE common.progetto set hidden=true WHERE idprogetto=".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
				break;
			
		// ***************************************************************************		
		// ******************************** ATTIVITA' ********************************
		// ***************************************************************************		
		case 'listAttivita' : 
				$sql = "SELECT idattivita as id,codice,descrizione from common.attivita where hidden =false";
				$db->json($sql);
				break;	
		case 'tableAttivita':
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);
				
				$grid = new GridConnector($res,"Postgre");				
				$sql = "SELECT idattivita as id,codice,descrizione from common.attivita where hidden =false order by codice";
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idattivita","id,codice,descrizione");
				break;				
		case 'saveAttivita'	:
				if ($_POST["id"]=='null'){
					$sql = "INSERT INTO common.attivita (codice,descrizione) VALUES('".$_POST['codice']."','". $_POST['descrizione']."')";
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();
				}else{
				$sql = "UPDATE common.attivita set codice='".$_POST['codice']."', descrizione = '".$_POST['descrizione']."' where idAttivita = ".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();					
				}
				break;					
		case 'deleteAttivita' :
				$sql = "UPDATE common.attivita set hidden=true WHERE idAttivita=".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
				break;			
				
		// ***********************************************************************		
		// ******************************** LOTTO ********************************
		// ***********************************************************************
		case 'listLotto' : 
				$sql = "SELECT idlotto as id,codice,descrizione from common.lotto where hidden =false";
				$db->json($sql);
				break;	
		case 'tableLotto':
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);
				
				$grid = new GridConnector($res,"Postgre");				
				$sql = "SELECT idlotto as id,codice,descrizione from common.lotto where hidden =false order by codice";
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idlotto","id,codice,descrizione");	
				break;
		case 'saveLotto'	:
				if ($_POST["id"]=='null'){
					$sql = "INSERT INTO common.lotto (codice,descrizione) VALUES('".$_POST['codice']."','". $_POST['descrizione']."')";
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();
				}else{
					$sql = "UPDATE common.lotto set codice='".$_POST['codice']."', descrizione = '".$_POST['descrizione']."' where idLotto = ".$_POST['id'];
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();				
				}
				break;								
		case 'deleteLotto' :
				$sql = "UPDATE common.lotto set hidden=true WHERE idLotto=".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
				break;		
				
		// ***************************************************************************				
		// ******************************** TRATTA ***********************************
		// ***************************************************************************		
		case 'listTratta' : 
				$sql = "SELECT idtratta as id,codice,descrizione from common.tratta where hidden =false";
				$db->json($sql);
				break;
		case 'tableTratta':
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);
				
				$grid = new GridConnector($res,"Postgre");				
				$sql = "SELECT idtratta as id,codice,descrizione from common.tratta where hidden =false order by codice";
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idtratta","id,codice,descrizione");		
				break;
		case 'saveTratta'	:
				if ($_POST["id"]=='null'){
					$sql = "INSERT INTO common.tratta (codice,descrizione) VALUES('".$_POST['codice']."','". $_POST['descrizione']."')";
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();
				}else{
					$sql = "UPDATE common.tratta set codice='".$_POST['codice']."', descrizione = '".$_POST['descrizione']."' where idTratta = ".$_POST['id'];
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();					
				}
				break;							
		case 'deleteTratta' :
				$sql = "UPDATE common.tratta set hidden=true WHERE idTratta=".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
				break;	
				
		// ***************************************************************************		
		// ******************************** OPERA ************************************
		// ***************************************************************************		
		case 'listOpera' : 
				$sql = "SELECT idopera as id,codice,descrizione from common.opera where hidden =false";
				$db->json($sql);
				break;
		case 'tableOpera':
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);
				
				$grid = new GridConnector($res,"Postgre");				
				$sql = "SELECT idopera as id,codice,descrizione from common.opera where hidden =false order by codice";
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idopera","id,codice,descrizione");		
				break;				
		case 'saveOpera'	:
				if ($_POST["id"]=='null'){
					$sql = "INSERT INTO common.opera (codice,descrizione) VALUES('".$_POST['codice']."','". $_POST['descrizione']."')";
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();
				}else {
					$sql = "UPDATE common.opera set codice='".$_POST['codice']."', descrizione = '".$_POST['descrizione']."' where idOpera = ".$_POST['id'];
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();				
				}
				break;						
		case 'updateOpera' :
				$sql = "UPDATE common.opera set codice='".$_POST['codice']."', descrizione = '".$_POST['descrizione']."' where idOpera = ".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
				break;	
		case 'deleteOpera' :
				$sql = "UPDATE common.opera set hidden=true WHERE idOpera=".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
				break;						
				
		// ***************************************************************************		
		// ******************************** CARREGGIATA ******************************
		// ***************************************************************************		
		case 'listCarreggiata' : 
				$sql = "SELECT idcarreggiata as id,codice,descrizione from common.carreggiata where hidden =false";
				$db->json($sql);	
				break;
		case 'tableCarreggiata':
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);
				
				$grid = new GridConnector($res,"Postgre");				
				$sql = "SELECT idCarreggiata as id,codice,descrizione from common.Carreggiata where hidden =false order by codice";
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idCarreggiata","id,codice,descrizione");		
				break;					
		case 'saveCarreggiata'	:
				if ($_POST["id"]=='null'){
					$sql = "INSERT INTO common.carreggiata (codice,descrizione) VALUES('".$_POST['codice']."','". $_POST['descrizione']."')";
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();
				}else{
					$sql = "UPDATE common.carreggiata set codice='".$_POST['codice']."', descrizione = '".$_POST['descrizione']."' where idCarreggiata = ".$_POST['id'];
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();				
				}
				break;						
		case 'deleteCarreggiata' :
				$sql = "UPDATE common.carreggiata set hidden=true WHERE idCarreggiata=".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
				break;				
				
				
		case 'listDL' : 
				$sql = "SELECT iduser as id,nome,cognome from common.users where hidden =false and substring(permission from 3 for 1) = '1';";
				$db->json($sql);
				break;
		case 'listDT' : 

				$sql = "SELECT iduser as id,nome,cognome from common.users where hidden =false and substring(permission from 4 for 1) = '1';";
				$db->json($sql);
				break;
		case 'listCS' : 

				$sql = "SELECT iduser as id,nome,cognome from common.users where hidden =false and substring(permission from 5 for 1) = '1';";
				$db->json($sql);
				break;
				
		// ***************************************************************************				
		// ******************************** ATTACH WBS *******************************
		// ***************************************************************************		
		case 'tableAttach':
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);
				
				$grid = new GridConnector($res,"Postgre");				
				$sql = 'SELECT idWbsAttach as id,'."'false'".' as "check"  ,name,TO_CHAR(data,'."'dd/mm/YYYY')".' as "DATA",size as "DIMENSIONE" from common.wbsAttach WHERE idwbs='. $_GET['idWBS'];
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idWbsAttach","id,check,name,DATA,DIMENSIONE");
				break;
		case "deleteDoc" :
				$arrDoc = json_decode($_POST['arrayDoc']);
				for ($i=0;$i<count($arrDoc);$i++){
					$sql = "SELECT path,name from common.wbsAttach WHERE idWbsAttach = " . $arrDoc[$i];					
					$res = $db->getArrayAssoc($sql);					
					$path = $res[0]['path'];
					$name = $res[0]['name'];	
					//echo "path " . $path."<br>";
					$sqlDel = "DELETE FROM common.wbsAttach WHERE idWbsAttach = " . $arrDoc[$i];		
					$result = $db->update($sqlDel,$_POST['iduser']);
					if ($result){
						unlink($path);
					}else {
						echo "0";	
					}
				}
				echo "1";
				break;
				
		// ***************************************************************************				
		// ******************************** WBS **************************************
		// ***************************************************************************		
		
		case 'listWBS' : 
				$sql = "SELECT idWbs as id,codiceWbs,descrizione from common.wbss where hidden =false";
				$db->json($sql);
				break;		
		
		case 'tableWBS': 
			$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
			$res=pg_connect($postrgre_connection);
			
			$grid = new GridConnector($res,"Postgre");
			$sql = 'SELECT char_length(codiceWBS),a.idwbs as id,
					a.codiceWbs as "CODICE WBS",
					a.descrizione as "DESCRIZIONE",
					b.codice as "OGGETTO",
					b.descrizione as "DESC.OGGETTO", 
					c.codice as "ATTIVITA'."'". '",
					c.descrizione as "DESC.ATTIVITA'."'".'", 
					d.codice as "LOTTO",
					d.descrizione as "DESC.LOTTO",
					e.codice as "TRATTA",
					e.descrizione as "DESC.TRATTA",		
					f.codice as "OPERA",
					f.descrizione as "DESC.OPERA",
					g.codice as "CARREGGIATA",
					g.descrizione as "DESC.CARREGGIATA"
					FROM Common.wbss as a 
					LEFT JOIN common.progetto as b ON a.idProgetto=b.idProgetto 
					LEFT JOIN common.attivita as c ON a.idAttivita=c.idAttivita 
					LEFT JOIN common.lotto as d ON a.idLotto=d.idLotto 
					LEFT JOIN common.tratta as e ON a.idTratta=e.idTratta 
					LEFT JOIN common.opera as f ON a.idOpera=f.idOpera
					LEFT JOIN common.carreggiata as g ON a.idCarreggiata=g.idCarreggiata ';
			$condition = " WHERE a.hidden = false ";
			$order = " ORDER BY codiceWBS ASC	,char_length(codiceWBS) ASC";
			$sql .= $condition.$order;
			//echo "<pre>";echo $sql;exit;
			$grid->dynamic_loading(100);
			$grid->render_sql($sql,"a.idWbs","id,CODICE WBS,DESCRIZIONE,OGGETTO,DESC.OGGETTO,ATTIVITA',DESC.ATTIVITA',LOTTO,DESC.LOTTO,TRATTA,DESC.TRATTA,OPERA,DESC.OPERA,CARREGGIATA,DESC.CARREGGIATA");
				
			break;				
				
		case "save" :

				$arrJson = json_decode($_POST["arr"], true);
				//echo "2";
				//print_r($arrJson);
				$idOggetto = $arrJson[1];
				$idAttivita = $arrJson[3];
				$idLotto = $arrJson[5];
				$idTratta = $arrJson[7];
				$idOpera = $arrJson[9];
				$codice = $arrJson[11];
				$seperatore = $arrJson[12];
				$idCarreggiata = $arrJson[13];
				$codiceWbs = $arrJson[15];
				$descrizione = $arrJson[16];
				$importCode = $arrJson[17];
				$pkDA = $arrJson[18];
				$pkA = $arrJson[19];
				$dataInizioPrev =  substr($arrJson[20],0,10);
				if (strlen($dataInizioPrev)>0){
					$dataInizioPrev = date("d-m-Y", strtotime($dataInizioPrev));
				}
				$dataFinePrev =   substr($arrJson[21],0,10);
				if (strlen($dataFinePrev)>0){
					$dataFinePrev = date("d-m-Y", strtotime($dataFinePrev));
				}
				$dataInizioEff =   substr($arrJson[22],0,10);
				if (strlen($dataInizioEff)>0){
					$dataInizioEff  = date("d-m-Y", strtotime($dataInizioEff));
				}					
				$dataEndEff =   substr($arrJson[23],0,10);
				if (strlen($dataEndEff)>0){
					$dataEndEff = date("d-m-Y", strtotime($dataEndEff));
				}		
				$millesimi = $arrJson[24];
				$importo = $arrJson[25];
				$idDL = $arrJson[26];
				$idDT = $arrJson[27];
				$idCS = $arrJson[28];
				$sospeso = $arrJson[29];			
				// ******************** IF idWBS == null NUOVO INSERIMENTO ********************
				if ($_POST["idWBS"]=='null'){
				
					$idWbs = true;
					$sql = "INSERT INTO common.wbss (idProgetto,idAttivita,idLotto,idTratta,idOpera,idCarreggiata,codice,seperatore,codiceWBS,importcode,daPk	,aPk,initDataPrev,endDataPrev,initDataReal,endDataReal,millesimi,importo			
							,DirettoreLavori	
							,DirettoreTecnico
							,collaudatore	
							,sospeso		
							,descrizione) VALUES (
							".($idOggetto!=0?$idOggetto:'null').",
							".($idAttivita!=0?$idAttivita:'null').",
							".($idLotto!=0?$idLotto:'null').",
							".($idTratta!=0?$idTratta:'null').",
							".($idOpera!=0?$idOpera:'null').",
							".($idCarreggiata!=0?$idCarreggiata:'null').",
							'".$codice."',
							'".$seperatore."',
							'".$codiceWbs."',
							'".$importCode."',
							'".$pkDA."',
							'".$pkA."',
							".($dataInizioPrev!=''?"TO_TIMESTAMP('".$dataInizioPrev."','dd/mm/YYYY')":'null').",
							".($dataFinePrev!=''?"TO_TIMESTAMP('".$dataFinePrev."','dd/mm/YYYY')":'null').",
							".($dataInizioEff!=''?"TO_TIMESTAMP('".$dataInizioEff."','dd/mm/YYYY')":'null').",
							".($dataEndEff!=''?"TO_TIMESTAMP('".$dataEndEff."','dd/mm/YYYY')":'null').",
							".($millesimi!=null?$millesimi:'null').",
							".($importo!=null?$importo:'null').",
							".($idDL!=0?$idDL:'null').",
							".($idDT!=0?$idDT:'null').",
							".($idCS!=0?$idCS:'null').",
							".($sospeso==1?'true':'false').",
							'".$descrizione."') RETURNING idwbs; ";
							//echo $sql;exit;
					$result = $db->update($sql,$_POST['iduser'],$idWbs);
					if ($result){
					
						$arrDate = json_decode($_POST["arrSospDate"], true);
						$validate = true;
						for ($i=0;$i<count($arrDate);$i++){
							$sqlDate = "INSERT INTO common.sospesioneLavori (idwbs,initData,endData) VALUES (
							".$idWbs.",
							".($arrDate[$i]['sosp']!=''?"TO_TIMESTAMP('".$arrDate[$i]['sosp']."','dd/mm/YYYY')":'null').",
							".($arrDate[$i]['rip']!=''?"TO_TIMESTAMP('".$arrDate[$i]['rip']."','dd/mm/YYYY')":'null')."
							);";
							$result2 = $db->update($sqlDate,$_POST['iduser']);
							if (!$result2){
								$validate = false;
							}
						}
						if ($validate == true){
							echo "1";
						}
					}else{
						echo $db->getLastError();
					}		
					
					
					
				// ******************** IF idWBS != null UPDATE WBS ********************	
				}else{
					
					$sql = "UPDATE common.wbss set
							idProgetto=".($idOggetto!=0?$idOggetto:'null').",
							idAttivita=".($idAttivita!=0?$idAttivita:'null').",
							idLotto=".($idLotto!=0?$idLotto:'null').",
							idTratta=".($idTratta!=0?$idTratta:'null').",
							idOpera=".($idOpera!=0?$idOpera:'null').",
							idCarreggiata=".($idCarreggiata!=0?$idCarreggiata:'null').",
							codice='".$codice."',
							seperatore='".$seperatore."',
							codiceWBS='".$codiceWbs."',
							importcode='".$importCode."',
							daPk	='".$pkDA."',
							aPk='".$pkA."',
							initDataPrev=".($dataInizioPrev!=''?"TO_TIMESTAMP('".$dataInizioPrev."','dd/mm/YYYY')":'null').",
							endDataPrev=".($dataFinePrev!=''?"TO_TIMESTAMP('".$dataFinePrev."','dd/mm/YYYY')":'null').",
							initDataReal=".($dataInizioEff!=''?"TO_TIMESTAMP('".$dataInizioEff."','dd/mm/YYYY')":'null').",
							endDataReal=".($dataEndEff!=''?"TO_TIMESTAMP('".$dataEndEff."','dd/mm/YYYY')":'null').",
							millesimi=".($millesimi!=null?$millesimi:'null').",
							importo	=".($importo!=null?$importo:'null').",		
							DirettoreLavori =".($idDL!=0?$idDL:'null').",	
							DirettoreTecnico=".($idDT!=0?$idDT:'null').",
							collaudatore	=".($idCS!=0?$idCS:'null').",
							sospeso	=".($sospeso==1?'true':'false').",
							descrizione ='".$descrizione."' where idwbs=".$_POST["idWBS"];
					//	echo "<pre>";echo $sql;
					$result = $db->update($sql,$_POST['iduser']);
					if ($result){
						$idWbs=$_POST["idWBS"];
						$arrDate = json_decode($_POST["arrSospDate"], true);
						$validate = true;  
						$resultDel = $db->update("DELETE FROM common.sospesioneLavori where idwbs=".$idWbs ,$_POST['iduser']);
						for ($i=0;$i<count($arrDate);$i++){
							$sqlDate = "INSERT INTO common.sospesioneLavori (idwbs,initData,endData) VALUES (
							".$idWbs.",
							".($arrDate[$i]['sosp']!=''?"TO_TIMESTAMP('".$arrDate[$i]['sosp']."','dd/mm/YYYY')":'null').",
							".($arrDate[$i]['rip']!=''?"TO_TIMESTAMP('".$arrDate[$i]['rip']."','dd/mm/YYYY')":'null')."
							);";
							$result2 = $db->update($sqlDate,$_POST['iduser']);
							if (!$result2){
								$validate = false;
							}
						}
						if ($validate == true){
							echo "1";
						}
					}else{
						echo $db->getLastError();
					}									
				}

				//echo $result?1:0;
			break;
			// ************* MODIFICA WBS *******************
		case "get" :

				$sql = "SELECT idWbs,  			
							idProgetto,		
							idAttivita,		
							idLotto,			
							idTratta,		
							idOpera,			
							idCarreggiata,	
							codice,		  	
							seperatore,		
							codiceWBS,		
							importcode,		
							daPk,			
							aPk,				
							TO_CHAR(initDataPrev,'dd-mm-YYYY') as initDataPrev,	
							TO_CHAR(endDataPrev,'dd-mm-YYYY') as endDataPrev,		
							TO_CHAR(initDataReal,'dd-mm-YYYY') as initDataReal  ,	
							TO_CHAR(endDataReal,'dd-mm-YYYY') as endDataReal,			
							millesimi,		
							importo	,		
							DirettoreLavori,	
							DirettoreTecnico,
							collaudatore,	
							sospeso,			
							descrizione		 
				
				from common.wbss WHERE idwbs = " . $_POST['idWBS'];
				$sql2 = "SELECT idsospesioneLavori  
							idwbs		,		
							TO_CHAR(initData		,'dd-mm-YYYY') as initData,		
							TO_CHAR(endData		,'dd-mm-YYYY') as endData		
							from common.sospesionelavori WHERE idwbs = " . $_POST['idWBS'];
				$array[] = $var;
				array_push($array,$sql,$sql2);
				$multiJson = $db->multJson($array);					
			break;
		case "delete" : $sql = "UPDATE common.wbss set hidden = true WHERE idwbs =" . $_POST['idWBS'];
						// echo $sql;exit;
						 $result = $db->update($sql,$_POST['iduser']);
						 echo $result?1:$db->getLastError();
			break;
	}

?>