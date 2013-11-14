<?php

# Starting session
session_start();

# Including all functions
foreach (glob("functions/*.php") as $filename)
{
    include $filename;
}

# Main variables
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

// Including main layout
include 'layout/layout.phtml';