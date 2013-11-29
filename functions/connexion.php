<?php

/**
 * @return object
 */
function connexion()
{
	$db = new PDO('mysql:host=localhost;dbname=podzone', 'podzone', 'sTX7a3aR');
	$db->exec('SET NAMES utf8');
	return $db;
}