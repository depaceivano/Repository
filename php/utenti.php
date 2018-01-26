<?php

require_once('../classes/db/postgre.php');
require_once('../inc/conf.inc');
require_once("../classes/codebase/grid_connector.php");
require("../classes/codebase/db_postgre.php");
ini_set('display_errors', 'off');
ini_set('display_startup_errors', 'off');
set_time_limit(0);
error_reporting(0 );


function cost_permission($arrPer,$new)
{
	GLOBAL $permission;
	if ($new==true)
	{

		for ($i=0; $i<count($arrPer)-1; $i++)
		{
				$pos = strpos($arrPer[$i], "|");
				$ind = substr($arrPer[$i],0,$pos);
				$val = substr($arrPer[$i],($pos+1));
				$permission[$ind-1] = $val;
		}
		return $permission ;
	}
}

 $permission ="00000000";

$db = new postgres(PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWD);
	if($db->getLastError() != ""){
		return;
	}

	if ($_POST['opt']) $opt =  $_POST['opt'];
	else  $opt = $_GET['opt'];
	switch ($opt){

		case "tableUtenti" :
				$postrgre_connection = "host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASSWD;
				$res=pg_connect($postrgre_connection);

				$grid = new GridConnector($res,"Postgre");
				$sql = 'SELECT a.iduser as id,a.cognome,a.nome,a.login as "username",a.mail as "email",c.ragioneSociale as "ditta"
						FROM common.users as a
						LEFT JOIN common.userInfo as b ON a.iduser = b.iduser  and b.hidden=false
						LEFT JOIN common.ditte as c ON c.idditta = b.idditta and c.hidden=false
						where a.hidden =false order by a.login';
				//echo $sql;
				$grid->dynamic_loading(100);
				$grid->render_sql($sql,"iduser","id,cognome,nome,username,email,ditta");
				break;

		case 'save'	:
									$arrJson    = json_decode($_POST["arr"], true);
									$arrPerm    = json_decode($_POST["arrPermission"], true);
									$cognome    = $arrJson['cognome'];
									$nome       = $arrJson['nome'];
									$login      = $arrJson['username'];
									$mail       = $arrJson['mail'];
									$tel        = $arrJson['tel'];
									$pwd        =	$arrJson['psw'];
									$idditta    =($arrJson['societa']==0?'null':$arrJson['societa']);
									$idruolo    =($arrJson['ruolo']==0?'null':$arrJson['ruolo']);
									$idlotto    =($arrJson['lotto']==0?'null':$arrJson['lotto']);
									$idtratta   =($arrJson['tratta']==0?'null':$arrJson['tratta']);
									$idfunzione =($arrJson['funzione']!=0?$arrJson['funzione']:'null');

				$permission = cost_permission($arrPerm,true);


			if ($_POST["id"]=='null')
			{
					$iduser = true;
					$sql = "INSERT INTO common.users (cognome,nome,login,mail,telefono,passwd,permission) VALUES(
							'".$cognome."',
							'". $nome."',
							'". $login."',
							'". $mail."',
							'". $tel."',
							MD5('". $pwd."'),
							'". $permission."') RETURNING iduser;";
					//echo $sql;exit;
					$result = $db->update($sql,$_POST['iduser'],$iduser);

					if ($result){
						$sqlAssoc = "INSERT INTO  common.userInfo (iduser,idditta,idruolo,idfunzione,idlotto,idtratta) VALUES (".$iduser.",".$idditta.",".$idruolo.",".$idfunzione.",".$idlotto.",".$idtratta.")";
						$resultAss = $db->update($sqlAssoc,$_POST['iduser']);
						echo $resultAss?1:$db->getLastError();
					}else{

						echo $db->getLastError();
					}
					//echo $result?1:$db->getLastError();
			}else{
				$sql = "UPDATE common.users SET ".
					   "cognome='".$cognome."',".
					   "nome='".$nome."',".
					   "login='".$login."',".
					   "mail='".$mail."',".
					   "telefono='".$tel."',".
					   ($pwd!=''?"passwd=MD5('".$pwd."'),":"").
					   "permission='".$permission."' ".
					   "WHERE iduser =".$_POST["id"];
				//echo $sql;exit;
				$result = $db->update($sql,$_POST['iduser']);
				if ($result){
					$sqlAssoc = "UPDATE common.userInfo SET hidden=true WHERE iduser =".$_POST["id"];
					//$sqlAssoc = "UPDATE common.userInfo SET idditta = ".$idditta .", idruolo = ".$idruolo. ", idfunzione = ". $idfunzione.", idlotto = ".$idlotto.", idtratta=".$idtratta." WHERE iduser = " .$_POST["id"];
					$resultAss = $db->update($sqlAssoc,$_POST['iduser']);
					if ($resultAss){

						$sqlAssoc = "INSERT INTO  common.userInfo (iduser,idditta,idruolo,idfunzione,idlotto,idtratta) VALUES (".$_POST["id"].",".$idditta.",".$idruolo.",".$idfunzione.",".$idlotto.",".$idtratta.")";
						$resultAss2 = $db->update($sqlAssoc,$_POST['iduser']);
						echo $resultAss2?1:$db->getLastError();
					}

				}else{
						echo $db->getLastError();
				}

			}
			break;

		case "get" :

			$sql = "SELECT a.*,b.idditta,b.idruolo,b.idfunzione,b.idlotto,b.idtratta from common.users as a LEFT JOIN common.userInfo as b ON a.iduser=b.iduser and b.hidden=false WHERE a.iduser = ".$_POST['idUser'];
			//echo $sql;
			$db->Json($sql);
			break;

		case "delete" :
			$sql = "UPDATE common.users SET hidden=true WHERE iduser="  .$_POST["id"];
			$result = $db->update($sql,$_POST['iduser']);
			echo $result?1:$db->getLastError();
			break;

		case "listRuoli" :
				$sql = "SELECT idRuolo as id,description from common.ruoli where hidden =false  ";
				$db->json($sql);
				break;

		case "listFunzioni" :
				$sql = "SELECT idFunzione as id,description from common.funzione where hidden =false and idruolo=".$_POST['idRuolo'];
				//echo $sql;exit;
				$db->json($sql);
				break;
		case 'listUtenti' :
				$sql = "SELECT iduser as id,cognome,nome, mail from common.users where hidden =false and cognome!='root'";
				//echo $sql;
				$db->json($sql);
				break;
	}

?>
