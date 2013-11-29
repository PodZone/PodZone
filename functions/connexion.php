<?php

/**
 * @return object
 */
function connexion()
{
	$db = new PDO('mysql:host=localhost;dbname=dbname', 'dbuser', 'dbpass');
	$db->exec('SET NAMES utf8');
	return $db;
}
