<?php

// Get 12 last posts
$lastpodcasts = $db->query('SELECT * FROM pod_emission
							INNER JOIN pod_podcast ON pod_emission.id_podcast = pod_podcast.id
							INNER JOIN pod_studio ON pod_podcast.id_studio = pod_studio.id
							INNER JOIN pod_podcast_category ON pod_studio.id = pod_podcast_category.podcast_id
							INNER JOIN pod_category ON pod_podcast_category.podcast_category = pod_category.id
							ORDER BY pubdate DESC LIMIT 12');
$podcasts = $lastpodcasts->fetchAll(PDO::FETCH_ASSOC);


$lastemissions = $db->query('SELECT * FROM pod_podcast
						 	 INNER JOIN pod_studio ON pod_podcast.id_studio = pod_studio.id
						 	 INNER JOIN pod_podcast_category ON pod_studio.id = pod_podcast_category.podcast_id
						 	 INNER JOIN pod_category ON pod_podcast_category.podcast_category = pod_category.id
						 	 ORDER BY podcast_pubdate DESC LIMIT 12');

$emissions = $lastemissions->fetchAll(PDO::FETCH_ASSOC);
