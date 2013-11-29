<?php

$req = $db->prepare('SELECT * FROM pod_studio WHERE name = :name');
$req->execute(array(':name' => $_GET['studio']));

$studio = $req->fetch(PDO::FETCH_ASSOC);

$req2 = $db->prepare('SELECT * FROM pod_podcast INNER JOIN pod_studio ON pod_podcast.id_studio = pod_studio.id WHERE name = :name');
$req2->execute(array(':name' => $_GET['studio']));

$podcasts = $req2->fetchAll(PDO::FETCH_ASSOC);