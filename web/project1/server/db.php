<?php
function getDBURL() {
	
	// could expand this to include a local config option.
	$dbUrl = getenv('DATABASE_URL');
	return $dbUrl;
}

/**
 * @return PDO
 */
function openDBConnection($systemUserId) {
	if (!is_int($systemUserId)) {
		throw new InvalidArgumentException('$systemUserId must be a valid integer');
	}

	try {
		$dbUrl = getDBURL();
		$dbOpts = parse_url($dbUrl);
		$dbHost = $dbOpts["host"];
		$dbPort = $dbOpts["port"];
		$dbUser = $dbOpts["user"];
		$dbPassword = $dbOpts["pass"];
		$dbName = ltrim($dbOpts["path"], '/');

		$db = new PDO("pgsql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUser, $dbPassword);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->exec('SET search_path TO crm');
		$db->exec("SET \"act_log.user\" = $systemUserId"); // set our session variable so we track what user is doing stuff on the connection
		return $db;
	}
	catch (PDOException $ex)
	{
		echo 'Error!: ' . $ex->getMessage();
		throw $ex;
	}
}