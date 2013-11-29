<?php

$req = $db->prepare('SELECT * FROM pod_emission INNER JOIN pod_podcast
					 ON pod_emission.id_podcast = pod_podcast.id
					 WHERE pod_podcast.slug = :name ORDER BY number DESC');

$req->execute(array(':name' => $_GET['podcast']));

$emissions = $req->fetchAll(PDO::FETCH_ASSOC);

$req2 = $db->prepare('SELECT * FROM pod_podcast WHERE pod_podcast.slug = :name');
$req2->execute(array(':name' => $_GET['podcast']));

$podcast = $req2->fetch(PDO::FETCH_ASSOC);

