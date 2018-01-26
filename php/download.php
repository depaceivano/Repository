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
	if($db->getLastError() != ""){
		return;
	}
	
	if ($_POST['opt']) $opt =  $_POST['opt'];
	else  $opt = $_GET['opt'];
	$arrDoc = json_decode($_GET['arrayDoc']);

	switch ($opt){
		
		
		case "WBS" : 
					
					if (count($arrDoc)>1){
							$filename =  "../attach/export.zip";    
							$zip = new Zip();
							$zip->zip_start($filename);
							for ($i=0;$i<count($arrDoc);$i++){
								$sql = "SELECT path,name from common.wbsAttach WHERE idWbsAttach = " . $arrDoc[$i];
								$res = $db->getArrayAssoc($sql);
								$path = $res[0]['path'];
								$name = $res[0]['name'];									
								$zip->zip_add($path); // adding a file
							}
							$zip->zip_end();							
							header("Expires: Sat, 01 Jan 2100 00:00:00 GMT");
							header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
							header("Pragma: public");
							header("Expires: 0");
							header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
							header("Cache-Control: public");
							header("Content-Description: Download File");
							session_cache_limiter("must-revalidate");
							header("Content-type: Application/octet-stream");
							header('Content-Disposition: attachment; filename="export.zip"');
							header('Content-Length: ' . filesize($filename));
							ob_clean();
							flush();
							readfile($filename);		
							unlink($filename);
					} else {
						$sql = "SELECT path,name from common.wbsAttach WHERE idWbsAttach = " . $arrDoc[0];
						
						$res = $db->getArrayAssoc($sql);
						
						$path = $res[0]['path'];
						$name = $res[0]['name'];
					
						//echo "path " . $path;
						if(!$path){ // file does not exist
							die('file not found');
						} else {
							header("Cache-Control: public");
							header("Content-Description: File Transfer");
							header("Content-Disposition: attachment; filename=$name");
							header("Content-Type: application/zip");
							header("Content-Transfer-Encoding: binary");
						
							// read the file from disk
							readfile($path);
						}

				
					}	
			break;
		case "corrispondenze" : 
					
					if (count($arrDoc)>1){
							$filename =  "../attach/export.zip";    
							$zip = new Zip();
							$zip->zip_start($filename);
							for ($i=0;$i<count($arrDoc);$i++){
								$sql = "SELECT path,name from corrispondenze.protocolliAttach WHERE idprotocolloAttach = " . $arrDoc[$i];
								$res = $db->getArrayAssoc($sql);
								$path = $res[0]['path'];
								$name = $res[0]['name'];									
								$zip->zip_add($path); // adding a file
							}
							$zip->zip_end();							
							header("Expires: Sat, 01 Jan 2100 00:00:00 GMT");
							header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
							header("Pragma: public");
							header("Expires: 0");
							header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
							header("Cache-Control: public");
							header("Content-Description: Download File");
							session_cache_limiter("must-revalidate");
							header("Content-type: Application/octet-stream");
							header('Content-Disposition: attachment; filename="export.zip"');
							header('Content-Length: ' . filesize($filename));
							ob_clean();
							flush();
							readfile($filename);		
							unlink($filename);
					} else {
						$sql = "SELECT path,name from corrispondenze.protocolliAttach WHERE idprotocolloAttach = " . $arrDoc[0];
						
						$res = $db->getArrayAssoc($sql);
						
						$path = $res[0]['path'];
						$name = $res[0]['name'];
					
						//echo "path " . $path;
						if(!$path){ // file does not exist
							die('file not found');
						} else {
							header("Cache-Control: public");
							header("Content-Description: File Transfer");
							header("Content-Disposition: attachment; filename=$name");
							header("Content-Type: application/zip");
							header("Content-Transfer-Encoding: binary");
						
							// read the file from disk
							readfile($path);
						}

				
					}	
			break;		
	}

?>