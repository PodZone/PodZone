<?php

require 'getInfos.php';
require 'getsearchresults.php';
require 'connexion.php';

$db = connexion();

if(isset($_GET['emm']))
{
	echo json_encode(getEmmissionInfos($_GET['emm'], $db));
}

if(isset($_GET['q']))
{
	echo json_encode(getSearchResults($_GET['q'], $db));
}

