<?php


# Starting session
session_start();

# Including all functions
foreach (glob("functions/*.php") as $filename)
{
    include $filename;
}

include 'config/bootstrap.php';

# Including controller
if(isset($_GET['page']))
{
	if(file_exists('controllers/'.ucfirst($_GET['page']).'Controller.php'))
	{
		include 'controllers/'.ucfirst($_GET['page']).'Controller.php';
	}
	else
	{
		include 'controllers/404Controller.php';
	}
}
else
{
	include 'controllers/404Controller.php';
}

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
	include 'templates/pages/'.$_GET['page'].'.phtml';
}
else
{
	include 'layout/layout.phtml';
}
