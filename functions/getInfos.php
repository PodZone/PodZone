<?php

function getEmmissionInfos($id, $db)
{
	$req = $db->prepare('SELECT pod_emission.emm_id, pod_emission.title, pod_emission.guid, pod_emission.duration, pod_emission.description, pod_emission.number, pod_podcast.podcast_title, pod_podcast.image, pod_studio.name
						 FROM pod_emission INNER JOIN pod_podcast ON pod_emission.id_podcast = pod_podcast.id
						 					INNER JOIN pod_studio ON pod_podcast.id_studio = pod_studio.id
						 WHERE pod_emission.emm_id = :id
						 LIMIT 1');
	$req->execute(array(':id' => $id));

	$res = $req->fetch(PDO::FETCH_ASSOC);

	return $res;
}