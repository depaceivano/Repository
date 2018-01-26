<?php

require_once('../classes/db/postgre.php');
require_once('../inc/conf.inc');
require_once("../classes/codebase/grid_connector.php");
require_once ("../classes/zip/Zip.php");
require("../classes/codebase/db_postgre.php");
ini_set('display_errors', 'off');
ini_set('display_startup_errors', 'off');
set_time_limit(0);
error_reporting(0 );




$db = new postgres(PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWD);
	if($db->getLastError() != "")
	{
		return;
	}
	if ($_POST['opt']) $opt =  $_POST['opt'];
	else  $opt = $_GET['opt'];
	switch ($opt){

				// *********************************************************************************
				// ******************************** Centro Di Costo ********************************
				// *********************************************************************************
		case 'listCDC' :
				$sql = "SELECT idCDC as id,codice,descrizione from corrispondenze.cdc where hidden =false";
				$db->json($sql);
				break;
		case 'tableCDC':
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);

				$grid = new GridConnector($res,"Postgre");
				$sql = "SELECT idCDC as id,codice,descrizione from corrispondenze.cdc where hidden =false order by codice";
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idCDC","id,codice,descrizione");
				break;
		case 'saveCDC'	:
			if ($_POST["id"]=='null'){
					$sql = "INSERT INTO corrispondenze.cdc (codice,descrizione) VALUES('".$_POST['codice']."','". $_POST['descrizione']."')";
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();
			}else{
				$sql = "UPDATE corrispondenze.cdc set codice='".$_POST['codice']."', descrizione = '".$_POST['descrizione']."' where idCDC = ".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
			}
				break;
		case 'deleteCDC' :
				$sql = "UPDATE corrispondenze.cdc set hidden=true WHERE idCDC=".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
				break;

				// *********************************************************************************
				// ******************************** Linee di protocollo ****************************
				// *********************************************************************************
		case 'listLinee' :
				$sql = "SELECT idLinea as id,codice,descrizione from corrispondenze.linee where hidden =false";
				$db->json($sql);
				break;
		case 'tableLinee':
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);

				$grid = new GridConnector($res,"Postgre");
				$sql = "SELECT idLinea as id,codice,descrizione from corrispondenze.linee where hidden =false order by codice";
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idLinea","id,codice,descrizione");
				break;
		case 'saveLinee'	:
			if ($_POST["id"]=='null'){
					$sql = "INSERT INTO corrispondenze.linee (codice,descrizione) VALUES('".$_POST['codice']."','". $_POST['descrizione']."')";
					$result = $db->update($sql,$_POST['iduser']);
					echo $result?1:$db->getLastError();
			}else{
				$sql = "UPDATE corrispondenze.linee set codice='".$_POST['codice']."', descrizione = '".$_POST['descrizione']."' where idLinea = ".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
			}
				break;
		case 'deleteLinee' :
				$sql = "UPDATE corrispondenze.linee set hidden=true WHERE idLinea=".$_POST['id'];
				$result = $db->update($sql,$_POST['iduser']);
				echo $result?1:$db->getLastError();
				break;

		case 'getNominativo' :
				if ($_POST['idFunzione']==0){
					$sql = "SELECT a.iduser as id, b.cognome, b.nome
							FROM common.userInfo as a
							INNER JOIN common.users as b ON a.iduser = b.iduser
							INNER JOIN common.ruoli as c ON a.idruolo = c.idruolo
							INNER JOIN common.ditte as e ON a.idditta= e.idDitta
							WHERE a.hidden = false and a.idruolo = " .$_POST['idRuolo'] . " and a.idditta = " .$_POST['idDitta'];
				}else{
					$sql = "SELECT a.iduser as id, b.cognome, b.nome
							FROM common.userInfo as a
							INNER JOIN common.users as b ON a.iduser = b.iduser
							INNER JOIN common.ruoli as c ON a.idruolo = c.idruolo
							INNER JOIN common.funzione as d ON a.idfunzione = d.idfunzione
							INNER JOIN common.ditte as e ON a.idditta= e.idDitta
							WHERE a.hidden = false and a.idruolo = " .$_POST['idRuolo'] . " and a.idfunzione =" .$_POST['idFunzione']. " and a.idditta = " .$_POST['idDitta'];
				}
				//echo $sql;
				$db->json($sql);
				break;
		case 'listArgomento' :
				$sql = "SELECT idargomento as id,codice,descrizione from corrispondenze.argomenti where hidden =false";
				$db->json($sql);
				break;
		case 'listTipologia' :
				$sql = "SELECT idtipologia as id,codice,descrizione from corrispondenze.tipologie where hidden =false";
				//echo $sql;
				$db->json($sql);
				break;
		case 'listTipoprotocollo' :
				$sql = "SELECT idtipoprotocollo as id,codice,descrizione from corrispondenze.tipoProtocollo where hidden =false";
				//echo $sql;
				$db->json($sql);
				break;
		case 'listMezziinvio' :
				$sql = "SELECT idmezzoInvio as id,codice,descrizione from corrispondenze.mezziInvio where hidden =false";
				//echo $sql;
				$db->json($sql);
				break;
		case 'listTipodocumento' :
				$sql = "SELECT idtipoDocumento as id,codice,descrizione from corrispondenze.tipiDocumento where hidden =false";
				//echo $sql;
				$db->json($sql);
				break;
		case 'listStatoriscontro' :
				$sql = "SELECT idtipoRiscontro as id,codice,descrizione from corrispondenze.tipoRiscontro where hidden =false";
				//echo $sql;
				$db->json($sql);
				break;
		case 'listProtocolli' :
				$sql = "SELECT a.idprotocollo as id,a.codProtocollo,b.descrizione from corrispondenze.protocolli as a INNER JOIN corrispondenze.tipoRiscontro as b on a.idtipoRiscontro = b.idtipoRiscontro where a.hidden =false";
				//echo $sql;
				$db->json($sql);
				break;

				// *********************************************************************************
				// ******************************** Corrispondenze ********************************
				// *********************************************************************************
		case 'tableCorrispondenze':
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);

				$grid = new GridConnector($res,"Postgre");

				$sql = "SELECT a.idprotocollo as id,
						a.codProtocollo as protocollo,
						b.descrizione as cdc,
						c.descrizione as tipoprot,
						d.codice as linea,
						a.numero as numprot,
						TO_CHAR(a.dataProtcollo,'dd/mm/YYYY') as dataprot,
						a.oggetto,
						e.ragioneSociale as mittente,
						a.protMittente as protmitt,
						TO_CHAR(a.dataProtMittente,'dd/mm/YYYY') as dataprotmitt,
						'<a href='||replace(f.path,'../','')||' target=_blank>'||f.name||'</a>'  as allegato
						FROM corrispondenze.protocolli as a
						INNER JOIN corrispondenze.cdc as b ON a.idcdc = b.idcdc
						INNER JOIN corrispondenze.tipoProtocollo as c ON  a.idtipoprotocollo = c.idtipoprotocollo
						INNER JOIN corrispondenze.linee as d ON d.idLinea =a.idLinea
						LEFT JOIN common.ditte as e on e.idditta = a.idSocietaMittente
						LEFT JOIN corrispondenze.protocolliAttach as f ON a.idprotocollo = f.idprotocollo and f.principale = true
						where a.hidden =false order by codProtocollo";
				//echo $sql;exit;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idprotocollo","id,protocollo,cdc,tipoprot,linea,numprot,dataprot,oggetto,mittente,protmitt,dataprotmitt,allegato");
				break;
		case 'save' ;
				$messErr = "";

				$arrJson = json_decode($_POST["arr"], true);
				$arrDest = json_decode($_POST["arrDest"], true);
				$arrWbs = json_decode($_POST["arrWbs"], true);
				$arrClass = json_decode($_POST["arrClass"], true);
				$arrRisc = json_decode($_POST["arrRisc"], true);
				$arrDist = json_decode($_POST["arrDist"], true);
				$arrDoc = json_decode($_POST["arrDoc"], true);

				$cdc = $arrJson['5'];
				$tipoProt = $arrJson['15'];
				$dataProt = $arrJson['20'];
				$dataProt =  substr($arrJson['20'],0,10);
				if (strlen($dataProt)>0){
					$dataProt = date("d-m-Y", strtotime($dataProt));
				}
				$lineaProt = $arrJson['25'];
				$Protocollo = $arrJson['35'];
				$oggetto = $arrJson['40'];
				$competenza = $arrJson['45'];
				$competenza = ($competenza!=0?$competenza:"null");
				$conoscenza = $arrJson['50'];
				$conoscenza = ($conoscenza!=0?$conoscenza:"null");
				$mezzo = $arrJson['55'];
				$mezzo = ($mezzo!=0?$mezzo:"null");
				$tipoDoc = $arrJson['60'];
				$tipoDoc = ($tipoDoc!=0?$tipoDoc:"null");
				$dittaMittente = $arrJson['65'];
				$dittaMittente = ($dittaMittente!=0?$dittaMittente:"null");
				$ruoloMittente = $arrJson['68'];
				$ruoloMittente = ($ruoloMittente!=0?$ruoloMittente:"null");
				$funzioneMittente = $arrJson['70'];
				$funzioneMittente = ($funzioneMittente!=0?$funzioneMittente:"null");
				$firmatario = $arrJson['75'];
				$firmatario = ($firmatario!=0?$firmatario:"null");
				$protMittente = $arrJson['80'];
				$dataProtMittente = substr($arrJson['85'],0,10);
				if (strlen($dataProtMittente)>0){
					$dataProtMittente = date("d-m-Y", strtotime($dataProtMittente));
				}
				$daRiscontrare = ($arrJson['145']==1?"true":"false");
				$dataRiscontro = substr($arrJson['147'],0,10);
				if (strlen($dataRiscontro)>0){
					$dataRiscontro = date("d-m-Y", strtotime($dataRiscontro));
				}

				$idTipoRiscontro = $arrJson['150'];
				$idTipoRiscontro = ($idTipoRiscontro!=0?$idTipoRiscontro:"null");
				$protMittente = $arrJson['80'];
				$sqlGetProgr = "SELECT case when MAX(Numero)>0 THEN MAX(Numero) ELSE 0 end as progressivo from corrispondenze.protocolli WHERE hidden = false and idCdc= ".$cdc. " and idtipoprotocollo = ".$tipoProt . " and idLinea = " . $lineaProt;

				// calcolo il progressivo cercando per stessi cdc, tipo e linea il massimo attualmente caricato e aggiungo 1
				$prog = $db->getSingleValue($sqlGetProgr);
				$prog++;
				if (strlen($prog)==1){
					$prog = "00".$prog;
				}else if (strlen($prog)==2){
					$prog = "0".$prog;
				}
				$Protocollo = str_replace("???",$prog,$Protocollo);
				//echo "Protocollo " . $Protocollo ;exit;
				// ***********************************************************************************************************************************************************
				// **************************** INSERIMENTO DATI CORRISPONDENZA ***********************************************************************************************
				// ***********************************************************************************************************************************************************
				if ($_POST['id']=='null'){

					$idprotocollo = true;
					$sqlInsert = "INSERT INTO corrispondenze.protocolli (idCdc,idtipoprotocollo,dataProtcollo,	idLinea	,Numero,codProtocollo,oggetto,idGruppoCompetenza	,idGruppoConoscenza	,idmezzoInvio,idtipoDocumento,idruoloMittente,idfunzioneMittente,idSocietaMittente,idFirmatario	,protMittente,dataProtMittente,daRiscontrare,dataRiscontrare,idtipoRiscontro	) VALUES (".
					$cdc.",".
					$tipoProt.",".
					($dataProt!=''?"TO_TIMESTAMP('".$dataProt."','dd/mm/YYYY')":'null').",".
					$lineaProt.",".
					$prog.",".
					"'".$Protocollo."',".
					"'".$oggetto."',".
					$competenza.",".
					$conoscenza.",".
					$mezzo.",".
					$tipoDoc.",".
					$ruoloMittente.",".
					$funzioneMittente.",".
					$dittaMittente.",".
					$firmatario.",".
					"'".$protMittente."',".
					($dataProtMittente!=''?"TO_TIMESTAMP('".$dataProtMittente."','dd/mm/YYYY')":'null').",".
					$daRiscontrare.",".
					($dataRiscontro!=''?"TO_TIMESTAMP('".$dataRiscontro."','dd/mm/YYYY')":'null').",".
					$idTipoRiscontro.
					") RETURNING idprotocollo;";
					//echo $sqlInsert;exit;
					$resCorr = $db->update($sqlInsert,$_POST['iduser'],$idprotocollo);
				}else {
				// ***********************************************************************************************************************************************************
				// **************************** MODIFICA DATI CORRISPONDENZA ***********************************************************************************************
				// ***********************************************************************************************************************************************************
					//echo "aaaa <br>";
					//print_r($arrDest);
					$idprotocollo = $_POST['id'];

					$sqlUpdDest = "UPDATE corrispondenze.protocolli SET
									dataProtcollo=TO_TIMESTAMP('".$dataProt."','dd/mm/YYYY'),
									oggetto='".$oggetto."',
									idGruppoCompetenza	= ".$competenza.",
									idGruppoConoscenza	= ". $conoscenza .",
									idmezzoInvio= ".$mezzo .",
									idtipoDocumento= ".$tipoDoc.",
									idruoloMittente= ".$ruoloMittente .",
									idfunzioneMittente=".$funzioneMittente.",
									idSocietaMittente=".$dittaMittente .",
									idFirmatario	= ".$firmatario .",
									protMittente='".$protMittente ."',
									dataProtMittente=TO_TIMESTAMP('".$dataProtMittente."','dd/mm/YYYY'),
									daRiscontrare= ".$daRiscontrare.",
									dataRiscontrare=TO_TIMESTAMP('".$dataRiscontro."','dd/mm/YYYY'),
									idtipoRiscontro= ".$idTipoRiscontro 	."
									WHERE idprotocollo = ". $idprotocollo;
					//echo 	$sqlUpdDest;exit;
					$resCorr = $db->update($sqlUpdDest,$_POST['iduser']);
				}

				if ($resCorr){
					// ***********************************************************************************************************************************************************
					// **************************** INSERIMENTO DATI DESTINATARI ***********************************************************************************************
					// ***********************************************************************************************************************************************************
					$sqlDel = "DELETE FROM corrispondenze.destinatari WHERE idprotocollo=".$idprotocollo;
					$resDel = $db->update($sqlDel,$_POST['iduser']);
					for ($i =0;$i <count($arrDest);$i++){
						$ditta = $arrDest[$i]['ditta'];
						$ruolo=	$arrDest[$i]['ruolo'];
						$funzione=	$arrDest[$i]['funzione'];
						$utente=	$arrDest[$i]['utente'];
						$pc=	$arrDest[$i]['pc'];

						$sqlInsDest = "INSERT INTO corrispondenze.destinatari (idprotocollo,idruolo,idfunzione,idDitta,idnominativo,perConoscenza) VALUES (".
									$idprotocollo.",".
									$ruolo.",".
									($funzione!=''?$funzione:"null").",".
									$ditta.",".
									($utente!=''?$utente:"null").",".
									($pc==1?"true":"false").")";

						$resDest = $db->update($sqlInsDest,$_POST['iduser']);
						if (!$resDest){
							echo $sqlInsDest;exit;
							$messErr .= "CI SONO STATI DEGLI ERRORI NELLA TABELLA DESTINARI <br>";
						}
					}

					// ***********************************************************************************************************************************************************
					// **************************** INSERIMENTO DATI WBS ***********************************************************************************************
					// ***********************************************************************************************************************************************************
					$sqlDel = "DELETE FROM corrispondenze.protocolloWBS WHERE idprotocollo=".$idprotocollo;
					$resDel = $db->update($sqlDel,$_POST['iduser']);
					for ($i =0;$i <count($arrWbs);$i++){
						$idwbs = $arrWbs[$i]['id'];

						$sqlInsWbs = "INSERT INTO corrispondenze.protocolloWBS (idprotocollo,idwbs) VALUES (".
									$idprotocollo.",".
									$idwbs.")";
						$resWbs = $db->update($sqlInsWbs,$_POST['iduser']);
						if (!$resWbs){

							$messErr .= "CI SONO STATI DEGLI ERRORI NELLA TABELLA WBS <br>";
						}
					}


					// ***********************************************************************************************************************************************************
					// **************************** INSERIMENTO DATI CLASSIFICAZIONE ***********************************************************************************************
					// ***********************************************************************************************************************************************************

					$sqlDel = "DELETE FROM corrispondenze.classificazioni WHERE idprotocollo=".$idprotocollo;
					$resDel = $db->update($sqlDel,$_POST['iduser']);
					for ($i =0;$i <count($arrClass);$i++){
						$argomento = $arrClass[$i]['argomento'];
						$tipologia = $arrClass[$i]['tipologia'];
						$dossier = $arrClass[$i]['dossier'];

						$sqlInsClass = "INSERT INTO corrispondenze.classificazioni (idprotocollo,idargomento,idtipologia,iddossier) VALUES (".
									$idprotocollo.",".
									$argomento.",".
									$tipologia.",".
									$dossier.")";
						//echo 		$sqlInsClass;
						$resClass = $db->update($sqlInsClass,$_POST['iduser']);
						if (!$resClass){

							$messErr .= "CI SONO STATI DEGLI ERRORI NELLA TABELLA CLASSIFICAZIONI <br>";
						}
					}

					// ***********************************************************************************************************************************************************
					// **************************** INSERIMENTO DATI RISCONTRO ***********************************************************************************************
					// ***********************************************************************************************************************************************************

					$sqlDel = "DELETE FROM corrispondenze.riscontri WHERE idprotocollo=".$idprotocollo;
					$resDel = $db->update($sqlDel,$_POST['iduser']);	;
					for ($i =0;$i <count($arrRisc);$i++){
						$protrisc = $arrRisc[$i]['protrisc'];

						$sqlInsRisc = "INSERT INTO corrispondenze.riscontri (idprotocollo,idprotocolloRisc) VALUES (".
									$idprotocollo.",".
									$protrisc.")";
						//echo 		$sqlInsRisc;
						$resRisc = $db->update($sqlInsRisc,$_POST['iduser']);
						if (!$resRisc){

							$messErr .= " CI SONO STATI DEGLI ERRORI NELLA TABELLA RISCONTRI <br>";
						}
					}


					// ***********************************************************************************************************************************************************
					// **************************** INSERIMENTO DATI DISTRIBUZIONE ***********************************************************************************************
					// ***********************************************************************************************************************************************************

					$sqlDel = "DELETE FROM corrispondenze.distribuzione WHERE idprotocollo=".$idprotocollo;
					$resDel = $db->update($sqlDel,$_POST['iduser']);
					for ($i =0;$i <count($arrDist);$i++){
						$idutente = $arrDist[$i]['utente'];
						$comp = ($arrDist[$i]['comp']==0?"false":"true");
						$cono = ($arrDist[$i]['cono']==0?"false":"true");
						$sqlInsDist = "INSERT INTO corrispondenze.distribuzione (idprotocollo,iduser,competenza,conoscenza) VALUES (".
									$idprotocollo.",".
									$idutente.",".
									$comp.",".
									$cono.")";
						//echo 		$sqlInsDist;
						$resDist = $db->update($sqlInsDist,$_POST['iduser']);
						if (!$resDist){

							$messErr .= " CI SONO STATI DEGLI ERRORI NELLA TABELLA DISTRIBUZIONE <br>";
						}
					}

					// ***********************************************************************************************************************************************************
					// **************************** UPDATE DOCUMENTO PRINCIPALE ***********************************************************************************************
					// ***********************************************************************************************************************************************************


					for ($i =0;$i <count($arrDoc);$i++){
						$idDoc = $arrDoc[$i]['id'];
						$principale = ($arrDoc[$i]['principale']==0?"false":"true");

						$sqlInsDist = "UPDATE corrispondenze.protocolliAttach
										SET principale=".$principale."
										WHERE idprotocolloAttach =".$idDoc;
						//echo 		$sqlInsDist;
						$resDist = $db->update($sqlInsDist,$_POST['iduser']);
						if (!$resDist){

							$messErr .= " CI SONO STATI DEGLI ERRORI NELLA TABELLA DISTRIBUZIONE <br>";
						}
					}


					if ($messErr!=''){
						echo "WARNING!!! PROTOCOLLO " . $Protocollo . " CREATO <br>".  $messErr;

					}else {

						echo "PROTOCOLLO " . $Protocollo . " CREATO CON SUCCESSO";
					}
				}else{

					echo "ERRORE DURANTE LA CREAZIONE DEL PROTOCOLLO";
					//echo $sqlInsert;
				}

				break;
			case 'get' :

				$sql = "SELECT idprotocollo,
							idcdc,
							idtipoprotocollo,
							TO_CHAR(dataProtcollo,'dd-mm-YYYY') as dataProtcollo,
							idLinea	,
							Numero,
							codProtocollo,
							oggetto,
							idGruppoCompetenza	,
							idGruppoConoscenza	,
							idmezzoInvio,
							idtipoDocumento,
							idruoloMittente,
							idfunzioneMittente,
							idSocietaMittente,
							idFirmatario,
							protMittente,
							TO_CHAR(dataProtMittente,'dd-mm-YYYY') as dataProtMittente,
							daRiscontrare,
							TO_CHAR(dataRiscontrare,'dd-mm-YYYY') as dataRiscontrare,
							idtipoRiscontro
							FROM corrispondenze.protocolli WHERE idprotocollo =" .$_POST['idProt'];
			$sql2 = "SELECT
							iddestinatario,
							idprotocollo,
							idruolo	,
							idfunzione,
							idDitta	,
							idnominativo,
							perConoscenza
							FROM corrispondenze.destinatari WHERE idprotocollo =" .$_POST['idProt'];
			$sql3 = "SELECT
							idwbs
							FROM corrispondenze.protocolloWBS WHERE idprotocollo =" .$_POST['idProt'];
			$sql4 = "SELECT
							idargomento,
							idtipologia,
							iddossier
							FROM corrispondenze.classificazioni WHERE idprotocollo =" .$_POST['idProt'];
			$sql5 = "SELECT
							idprotocolloRisc
							FROM corrispondenze.riscontri WHERE idprotocollo =" .$_POST['idProt'];
			$sql6 = "SELECT
							iduser,
							competenza,
							conoscenza
							FROM corrispondenze.distribuzione WHERE idprotocollo =" .$_POST['idProt'];
				//echo $sql2;
				$array[] = $var;
				array_push($array,$sql,$sql2,$sql3,$sql4,$sql5,$sql6 );
				$multiJson = $db->multJson($array)		;


				break;
		// ***************************************************************************
		// ******************************** ATTACH PROTCOLLO *******************************
		// ***************************************************************************
		case 'tableAttach':
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);

				$grid = new GridConnector($res,"Postgre");
				$sql = 'SELECT idprotocolloAttach as id,
						'."'false'".' as "check"  ,
						name,
						TO_CHAR(data,'."'dd/mm/YYYY')".' as "DATA",
						size as "DIMENSIONE",
						CASE WHEN principale = true THEN '."'true'".
						"ELSE  'false' end as principale

						from corrispondenze.protocolliAttach WHERE idprotocollo=". $_GET['idProtocollo'];
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"idprotocolloAttach","id,check,name,DATA,DIMENSIONE,principale");
				break;
		case "deleteDoc" :
				$arrDoc = json_decode($_POST['arrayDoc']);
				for ($i=0;$i<count($arrDoc);$i++){
					$sql = "SELECT path,name from corrispondenze.protocolliAttach WHERE idprotocolloAttach = " . $arrDoc[$i];
					$res = $db->getArrayAssoc($sql);
					$path = $res[0]['path'];
					$name = $res[0]['name'];
					//echo "path " . $path."<br>";
					$sqlDel = "DELETE FROM corrispondenze.protocolliAttach WHERE idprotocolloAttach = " . $arrDoc[$i];
					$result = $db->update($sqlDel,$_POST['iduser']);
					if ($result){
						unlink($path);
					}else {
						echo "0";
					}
				}
				echo "1";
				break;
		case "delete" : $sql = "UPDATE corrispondenze.protocolli set hidden = true WHERE idprotocollo =" . $_POST['idProtocollo'];
						// echo $sql;exit;
						 $result = $db->update($sql,$_POST['iduser']);
						 echo $result?1:$db->getLastError();
			break;
	}

?>
