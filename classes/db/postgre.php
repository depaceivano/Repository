<?php
// ------------------------------------------------------------------------------------ //
//                                                                                      //
// DDT Pedemontana 1.0                                                                  //
// Data: 12/03/2013                                                                     //
// Descrizione: Sito per il portale web per la gestione delle DDT                       //
// Autore: SIPAL S.p.A. All rights reserved.                                            //
//                                                                                      //
// ------------------------------------------------------------------------------------ //

set_time_limit(36000);
error_reporting(E_ERROR | E_PARSE);
include_once('../../inc/conf.inc');

class postgres
{
	private $dbconn = FALSE;
	private $lastError = '';
	private $res = FALSE;
	private $lastSQL = '';
	private $disableSaveSQL = FALSE;

	// Inizializzazione della classe
	public function __construct($host, $port = 5432, $db, $user, $password)
	{
		// Crea la connessione al database
		$this->dbconn = pg_connect("host=".$host." dbname=".$db." user=".$user." password=".$password." port=".$port);

		if($this->dbconn == FALSE)
		{
			$this->lastError = pg_last_error();
		}
	}

	// Distruttore della classe
	public function __destruct()
	{
		// Disconnetti il database
		if($this->res)
			pg_free_result($this->res);
		if($this->dbconn)
			pg_close($this->dbconn);
	}

	// Restituisce l'ultimo errore
	public function getLastError(){
		return $this->lastError;
	}

	// Esegue la query: solo uso interno alla classe
	private function query($sql){
		if($this->res){
			pg_free_result($this->res);
		}
		if(!$this->disableSaveSQL)
			$this->lastSQL = $sql;
		$this->res = pg_query($this->dbconn, $sql);
		if($this->res == FALSE){
			$this->lastError = pg_last_error();
			return FALSE;
		}
		return TRUE;
	}

	public function getLastQuery(){
		return $this->lastSQL;
	}
	// Fornisce un singolo valore
	public function getSingleValue($sql){
		if(!$this->query($sql))
			return FALSE;
		// In $this->res c'è il valore di ritorno
		$line = pg_fetch_row($this->res);
		return $line[0];
	}

	// Fornisce la tabella dei risultati
	public function getTable($sql, $showHeader = FALSE){
		if(!$this->query($sql))
			return FALSE;
		$resArray = array();
		if($showHeader){
			for($i = 0; $i < $this->countFields(); $i++)
				$resArray["header"][$i] = pg_field_name($this->res, $i);
		}
		$curLine = 0;
		while($line = pg_fetch_row($this->res)){
			$curCol = 0;
			foreach($line as $colValue){
				$resArray[$curLine][$curCol] = $colValue;
				$curCol++;
			}
			$curLine++;
		}
		return $resArray;
	}

	// Stampa la tabella (solo per debug)
	public function printTable($table){
		echo "\n<table border=\"1\">";
		if($table['header']){
			// Stampa l'header di tabella
			echo "\n<tr>";
			for($i = 0; $i < $this->countFields(); $i++){
				echo "<th>".$table['header'][$i]."</th>";
			}
			echo "</tr>";
		}
		for($j = 0; $j < $this->countRows(); $j++){
			echo "\n<tr>";
			for($i = 0; $i < $this->countFields(); $i++){
				echo "<td>".$table[$j][$i]."</td>";
			}
			echo "</tr>";
		}
		echo "\n</table>";
	}

	// Restituisce il numero dei campi
	public function countFields(){
		if(!$this->res)
			return FALSE;
		return pg_num_fields($this->res);
	}

	// Restituisce il numero di righe
	public function countRows(){
		if(!$this->res)
			return FALSE;
		return pg_num_rows($this->res);
	}

	public function data($array, $fieldname, $rownum){
		$dummy = strtolower($fieldname);
		$i = 0;
		$found = false;
		foreach($array['header'] as $colName => $value){
			if($dummy == strtolower($value)){
				$found = true;
				break;
			}
			$i++;
		}
		if($found){
			return $array[$rownum][$i];
		}else{
			return FALSE;
		}
	}

	public function getArray($sql){
		if(!$this->query($sql))
			return;

		$tempArr = array();
		$i=0;
		while($values = pg_fetch_row($this->res)){
			$tempArr[$i] = $values;

			$i++;
		}

		return $tempArr;
	}

	public function getArrayAssoc($sql){
		if(!$this->query($sql))
			return null;

		$tempArr = array();
		$i=0;
		while($values = pg_fetch_assoc($this->res)) $tempArr[$i++] = $values;

		return $tempArr;
	}

	public function JsonCustom($sql){
		if(!$this->query($sql))
			return;
		// Create json structure
		echo "{\n\"resultset\":[\n";
		$rows = $this->countRows() - 1;
		$cols = $this->countFields();
		echo '{"name":"","realname":"","":"","iduser":"","idowner":""},';
		$i = 0;
		while($values = pg_fetch_row($this->res)){
			echo '{';
			for($j = 0; $j < $cols; $j++){
				echo '"'.pg_field_name($this->res, $j).'":"'.(USE_PROTECTION?str_replace("\"", "\\\"", $values[$j]):$values[$j]).'"';
				if($j < $cols - 1){
					echo ",\n";
				}
			}
			echo '}';
			if ($i < $rows)
				echo ",\n";
			$i++;
		}
		echo "\n]\n}";
	}

	public function Json($sql){
		if(!$this->query($sql))
			return;
		// Create json structure
		echo "{\n\"resultset\":[\n";
		$rows = $this->countRows() - 1;
		$cols = $this->countFields();
		$i = 0;
		while($values = pg_fetch_row($this->res)){
			echo '{';
			for($j = 0; $j < $cols; $j++){
				echo '"'.pg_field_name($this->res, $j).'":"'.(USE_PROTECTION?str_replace("\"", "\\\"", $values[$j]):$values[$j]).'"';
				if($j < $cols - 1){
					echo ",\n";
				}
			}
			echo '}';
			if ($i < $rows)
				echo ",\n";
			$i++;
		}
		echo "\n]\n}";
	}
	public function multJson ($arrSql){


		$tot ='{';

		for ($i=1;$i<count($arrSql);$i++){

			$tot .= '"'.$i.'": [';
			$tot .= $this->Json2($arrSql[$i]) ."],";
		}

		$tot = substr($tot, 0, -2);
		$tot .="]}";
		echo $tot;
	}
	public function Json2($sql){
		if(!$this->query($sql))
			return;
		// Create json structure
		$str= "{\n\"resultset\":[\n";
		$rows = $this->countRows() - 1;
		$cols = $this->countFields();
		$i = 0;
		while($values = pg_fetch_row($this->res)){
			$str.= '{';
			for($j = 0; $j < $cols; $j++){
				$str.= '"'.pg_field_name($this->res, $j).'":"'.(USE_PROTECTION?str_replace("\"", "\\\"", $values[$j]):$values[$j]).'"';
				if($j < $cols - 1){
					$str.= ",\n";
				}
			}
			$str.= '}';
			if ($i < $rows)
				$str.= ",\n";
			$i++;
		}
		$str.= "\n]\n}";
		return $str;
	}
	// Crea l json con nome a scelta
	public function Json3($sql,$name){
		if(!$this->query($sql))
			return;
		// Create json structure
		$str= "{\n\"$name\":[\n";
		$rows = $this->countRows() - 1;
		$cols = $this->countFields();
		$i = 0;
		while($values = pg_fetch_row($this->res)){
			$str.= '{';
			for($j = 0; $j < $cols; $j++){
				$str.= '"'.pg_field_name($this->res, $j).'":"'.(USE_PROTECTION?str_replace("\"", "\\\"", $values[$j]):$values[$j]).'"';
				if($j < $cols - 1){
					$str.= ",\n";
				}
			}
			$str.= '}';
			if ($i < $rows)
				$str.= ",\n";
			$i++;
		}
		$str.= "\n]\n}";
		return $str;
	}
	public function JsonTable($sql, $Header = false){
		if(!$this->query($sql))
			return;
		$rows = $this->countRows() - 1;
		$cols = $this->countFields();
		echo '[';
		if($Header){
			echo '[';
			$i = 0;
			for($j = 0; $j < $cols; $j++){
				echo '"'.pg_field_name($this->res, $j).'"';
					if($j < $cols - 1){
						echo ",";
					}
			}
			echo "]";
		}
		while($values = pg_fetch_row($this->res)){
			if($Header && ($i == 0))
				echo ",\n";
			echo "[";
			for($j = 0; $j < $cols; $j++){
				// echo "\n--" . pg_field_type($this->res, $j) ."--<BR>\n";
				if(pg_field_type($this->res, $j) != 'int4'){
					echo '"'.(USE_PROTECTION?str_replace("\"", "\\\"", $values[$j]): $values[$j]).'"';
				}else{
					echo $values[$j];
				}
				if($j < $cols - 1){
					echo ",";
				}
			}
			echo "]";
			if ($i < $rows)
				echo ",\n";
			$i++;
		}
		echo ']';
	}

	public function JsonTableCustom($sql, $Header = false){
		if(!$this->query($sql))
			return;
		$rows = $this->countRows() - 1;
		$cols = $this->countFields();
		echo '[';
		if($Header){
			echo '[';
			$i = 0;
			for($j = 0; $j < $cols; $j++){
				echo '"'.pg_field_name($this->res, $j).'"';
					if($j < $cols - 1){
						echo ",";
					}
			}
			echo "]";
		}
		while($values = pg_fetch_row($this->res)){
			if($Header && ($i == 0))
				echo ",\n";
			echo "[";
			for($j = 0; $j < $cols; $j++){
				echo '"'.(USE_PROTECTION?str_replace("\"", "\\\"", $values[$j]): $values[$j]).'"';

				if($j < $cols - 1){
					echo ",";
				}
			}
			echo "]";
			if ($i < $rows)
				echo ",\n";
			$i++;
		}
		echo ']';
	}

	public function JsonTableCustomPrint($sql, $Header = false){
		if(!$this->query($sql))
			return;
		$rows = $this->countRows() - 1;
		$cols = $this->countFields();
		$json;
		$json .= '[';
		if($Header){
			$json .= '[';
			$i = 0;
			for($j = 0; $j < $cols; $j++){
				$json .= '"'.pg_field_name($this->res, $j).'"';
					if($j < $cols - 1){
						$json .= ",";
					}
			}
			$json .= "]";
		}
		while($values = pg_fetch_row($this->res)){
			if($Header && ($i == 0))
				$json .= ",\n";
			$json .= "[";
			for($j = 0; $j < $cols; $j++){
				$json .= '"'.(USE_PROTECTION?str_replace("\"", "\\\"", $values[$j]): $values[$j]).'"';

				if($j < $cols - 1){
					$json .= ",";
				}
			}
			$json .= "]";
			if ($i < $rows)
				$json .= ",\n";
			$i++;
		}
		$json .= ']';

		return $json;
	}

	public function formatBytes($size, $precision = 2){
	    $base = log($size) / log(1024);
	    $suffixes = array('', ' kb', ' Mb', ' Gb', ' Tb');

	    return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
	}

	public function JsonTableSize($sql){
		if(!$this->query($sql))
			return;
		// Create json structure
		echo "[\n";
		$rows = $this->countRows() - 1;
		$cols = $this->countFields();
		$i = 0;
		while($values = pg_fetch_row($this->res)){
			echo '{';
			for($j = 0; $j < $cols; $j++){
				if($j==3){
					echo '"'.pg_field_name($this->res, $j).'":"'.$this->formatBytes($values[$j]).'"';
				}else{
					echo '"'.pg_field_name($this->res, $j).'":"'.$values[$j].'"';
				}
				if($j < $cols - 1){
					echo ",";
				}
			}
			echo '}';
			if ($i < $rows)
				echo ",\n";
			$i++;
		}
		echo "\n]";
	}

	public function JsonTable2($sql){
		if(!$this->query($sql))
			return;
		// Create json structure
		echo "[\n";
		$rows = $this->countRows() - 1;
		$cols = $this->countFields();
		$i = 0;
		while($values = pg_fetch_row($this->res)){
			echo '{';
			for($j = 0; $j < $cols; $j++){
				echo '"'.pg_field_name($this->res, $j).'":"'.$values[$j].'"';
				if($j < $cols - 1){
					echo ",";
				}
			}
			echo '}';
			if ($i < $rows)
				echo ",\n";
			$i++;
		}
		echo "\n]";
	}

	public function getArrayMulty($sql){
		if(!$this->query($sql))
			return;
		// Create json structure

		$rows = $this->countRows() - 1;
		$cols = $this->countFields();
		$i = 0;
		while($values = pg_fetch_row($this->res)){
			echo '{';
			for($j = 0; $j < $cols; $j++){
				echo '"'.pg_field_name($this->res, $j).'":"'.$values[$j].'"';
				if($j < $cols - 1){
					echo ",";
				}
			}
			echo '}';
			if ($i < $rows)
				echo ",\n";
			$i++;
		}

	}

	public function update($sql, $iduser, &$value){
		$result = false;
		if(isset($iduser)){
			$result = $this->query($sql);
			if(isset($value) && ($value == TRUE)){
				$line = pg_fetch_row($this->res);
				$value = $line[0];
			}

			$int_sql = "insert into logs (iduser, sql, result) values (" . $iduser . ", '" . $this->QUOTAS($sql) . "', " . ((int) $result) . "=1)";
			$this->disableSaveSQL = TRUE;
			$this->query($int_sql);
			$this->disableSaveSQL = FALSE;
		}
		return $result;
	}



	public function UTF8($text){
		// TODO: manage '
		return str_replace("\\'", "'", str_replace("'", "''", utf8_encode(html_entity_decode($text, ENT_QUOTES, 'UTF-8'))));
	}

	public function QUOTAS($text){
		// TODO: manage '
		return str_replace("\\'", "'", str_replace("'", "''", $text));
	}

	public function QUOTAS_IANNI($text){
		// TODO: manage '
		return str_replace("\\'", "", str_replace("'", "''", $text));
	}

	public function executeGetFileContents($oid){

		pg_query($this->dbconn, "begin");
	    $handle = pg_lo_open($this->dbconn, $oid, "r");
		$data='';
		while(($buffer = pg_lo_read($handle, 524288)) != FALSE){
			$data .= $buffer;
		}
		pg_query($this->dbconn, "commit");

		return $data;
	}

}
?>
