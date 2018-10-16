<?php

function getDBURL() {
	
	// could expand this to include a local config option.
	$dbUrl = getenv('DATABASE_URL');
	return $dbUrl;
}

function openDBConnection() {

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
		return $db;
	}
	catch (PDOException $ex)
	{
		echo 'Error!: ' . $ex->getMessage();
		throw $ex;
	}
}

function createNoteTables(PDO $db) {
$tableCreate = <<<EOD
	DROP TABLE IF EXISTS note;
	DROP TABLE IF EXISTS note_user;
	CREATE TABLE note_user (
	  id SERIAL,
	  username VARCHAR(255),
	  password VARCHAR(255),
	  PRIMARY KEY (id)
	);

	CREATE TABLE note (
	  id SERIAL,
	  userId INT NOT NULL,
	  content TEXT,
	  PRIMARY KEY (id),
	  FOREIGN KEY (userId) REFERENCES note_user (id)
	);
EOD;
	$result = $db->exec($tableCreate);
}
function insertNoteData(PDO $db) {
	$result = $db->query("INSERT INTO note_user (username, password) VALUES ('john', 'pass')");
	$result = $db->query("INSERT INTO note_user (username, password) VALUES ('jane', 'byui')");
	$result = $db->query("INSERT INTO note (userId, content) VALUES (1, 'A note for John')");
	$result = $db->query("INSERT INTO note (userId, content) VALUES (1, 'Another note for John')");
	$result = $db->query("INSERT INTO note (userId, content) VALUES (2, 'And this is a note for Jane')");
	// we do nothing with the result for now
}

function queryNoteTables(PDO $db) {
	$statement = $db->query('SELECT username, password FROM note_user');
	while ($row = $statement->fetch(PDO::FETCH_ASSOC))
	{
	  echo 'user: ' . $row['username'] . ' password: ' . $row['password'] . "<br/>\n";
	}
}

function preparedQueryNoteTables(PDO $db) {
	$name = 'john';
	$stmt = $db->prepare('SELECT * FROM note_user WHERE username=:name');
	$stmt->execute(array(':name' => $name));
	$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	var_dump($rows);
} 

$db = openDBConnection();

createNoteTables($db);
insertNoteData($db);
queryNoteTables($db);
preparedQueryNoteTables($db);

