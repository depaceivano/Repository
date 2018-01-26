<?php

require_once('../classes/db/postgre.php');
require_once('../inc/conf.inc');

$db = new postgres(PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWD);
	if($db->getLastError() != "")
	{
		return;
	}


	switch ($_POST['opt'])
	{

		case 'login' :


				$sql = "SELECT iduser,login, nome, cognome, passwd, permission, mail FROM common.users WHERE lower(login) = '" . strtolower($_POST["user"]) . "' AND passwd = MD5('". $_POST['pwd'] . "') AND hidden = FALSE AND substring(permission from 1 for 1) = '1'";

				$table= $db->JSON($sql);
				//echo "<pre>**********";print_r($table);
				//echo "<pre>";print_r(json_decode($table));

				/*
				$table=	$db->getArrayAssoc ($sql);
				$obj = json_encode($table);

				echo $table[0]['iduser']; // 12345
				print_r($obj);
				//echo json_encode($table);
				*/
				break;

	}
