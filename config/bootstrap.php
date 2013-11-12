<?php

# Database Connexion
//$db = connexion();

$path = explode('/', $_SERVER['PHP_SELF']);
# Root URL
$url = 'http://'.$_SERVER['SERVER_NAME'].'/';
# media dir
$css_dir = $url.'assets/css/';
$img_dir = $url.'assets/img/';
$js_dir  = $url.'assets/js/';
