<?php

require_once('../classes/db/postgre.php');
require_once('../inc/conf.inc');
require_once("../classes/codebase/grid_connector.php");
require("../classes/codebase/db_postgre.php");
ini_set('display_errors', 'off');
ini_set('display_startup_errors', 'off');
set_time_limit(0);
error_reporting(0);



function convertToReadableSize($size){
  $base = log($size) / log(1024);
  $suffix = array("", "KB", "MB", "GB", "TB");
  $f_base = floor($base);
  return round(pow(1024, $base - floor($base)), 1) . $suffix[$f_base];
}


$db = new postgres(PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWD);
	if($db->getLastError() != ""){
		return;
	}
	if ($_POST['opt']) $opt =  $_POST['opt'];
	else  $opt = $_GET['opt'];
	
	switch ($opt){	

		case 'WBS' : 
					$path = "../attach/wbs/".$_GET['code'];
					$size =  convertToReadableSize($_FILES["file"]["size"]);

					if (!is_dir($path)){
						if (!mkdir($path, 0777, true)) {
								die('Failed to create folders...');
						}
					}
					if (@$_REQUEST["mode"] == "html5" || @$_REQUEST["mode"] == "flash") {
						$trovato = false;
						if (@$_REQUEST["zero_size"] == "1") {

							$filename = @$_REQUEST["file_name"];
							$filename =str_replace(" ","",$filename);
							// just create empty file
							if (!file_exists($path."/".$filename)){
								file_put_contents($path."/".$filename, "");
							}else{
								$trovato = true;
							}
						} else {
							// get file name
							$filename = $_FILES["file"]["name"];
							$filename =str_replace(" ","",$filename);
							// save file
							if (!file_exists($path."/".$filename)){
								move_uploaded_file($_FILES["file"]["tmp_name"], $path."/".$filename);
							}else{
								$trovato = true;
							} 
							
						}
						if ($trovato == false){
							$sql = "INSERT INTO common.wbsAttach (idwbs,path,name,size) VALUES (
							".$_GET['idWBS'].",
							'". $path."/".$filename."',
							'".$filename."',
							'".$size."'
							)";
							$result = $db->update($sql,$_GET['iduser']);
							if ($result){			
								// response
								header("Content-Type: text/json");
								print_r(json_encode(array(
									"state" => true,    // saved or not saved
									"name"  => $filename,   // server-name
									"extra" => array(   // extra info, optional
											"info"  => "just a way to send some extra data",
											"param" => "some value here"
									)
								)));
							}
						}else{
							header("Content-Type: text/json");
								print_r(json_encode(array(
									"state" => true,    // saved or not saved
									"name"  => $filename,   // server-name
									"extra" => array(   // extra info, optional
											"info"  => "just a way to send some extra data",
											"param" => "some value here"
									)
								)));
						}
					}
					break;
		case 'protocollo' : 
					$path = "../attach/protocollo/".$_GET['code'];
					$size =  convertToReadableSize($_FILES["file"]["size"]);

					if (!is_dir($path)){
						if (!mkdir($path, 0777, true)) {
								die('Failed to create folders...');
						}
					}
					if (@$_REQUEST["mode"] == "html5" || @$_REQUEST["mode"] == "flash") {
						$trovato = false;
						if (@$_REQUEST["zero_size"] == "1") {

							$filename = @$_REQUEST["file_name"];
							$filename =str_replace(" ","",$filename);
							// just create empty file
							if (!file_exists($path."/".$filename)){
								file_put_contents($path."/".$filename, "");
							}else{
								$trovato = true;
							}
						} else {
							// get file name
							$filename = $_FILES["file"]["name"];
							$filename =str_replace(" ","",$filename);
							// save file
							if (!file_exists($path."/".$filename)){
								move_uploaded_file($_FILES["file"]["tmp_name"], $path."/".$filename);
							}else{
								$trovato = true;
							} 
							
						}
						if ($trovato == false){
							$sql = "INSERT INTO corrispondenze.protocolliAttach (idprotocollo,path,name,size) VALUES (
							".$_GET['idProtocollo'].",
							'". $path."/".$filename."',
							'".$filename."',
							'".$size."'
							)";
							$result = $db->update($sql,$_GET['iduser']);
							if ($result){			
								// response
								header("Content-Type: text/json");
								print_r(json_encode(array(
									"state" => true,    // saved or not saved
									"name"  => $filename,   // server-name
									"extra" => array(   // extra info, optional
											"info"  => "just a way to send some extra data",
											"param" => "some value here"
									)
								)));
							}
						}else{
							header("Content-Type: text/json");
								print_r(json_encode(array(
									"state" => true,    // saved or not saved
									"name"  => $filename,   // server-name
									"extra" => array(   // extra info, optional
											"info"  => "just a way to send some extra data",
											"param" => "some value here"
									)
								)));
						}
					}
					break;					
	}
?>