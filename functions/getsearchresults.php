<?php

function getSearchResults($tosearch, $db)
{
	$req = $db->prepare('SELECT * FROM pod_podcast WHERE pod_podcast.podcast_title LIKE :search');
	$req->execute(array(':search' => $tosearch.'%'));

	$studios = $req->fetchAll(PDO::FETCH_ASSOC);

	return $studios;
}