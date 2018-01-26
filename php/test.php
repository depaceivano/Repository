<?php

require_once('../classes/db/postgre.php');
require_once('../inc/conf.inc');

$db = new postgres(PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWD);
	if($db->getLastError() != ""){
		return;
	}
	
	$db->Json("SELECT * FROM common.users ");
?>