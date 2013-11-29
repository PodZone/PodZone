// Player initialization
player.init({
	player: '#audioPlayer',
	volume: 1,
	bar: '#bar',
	// Called when a player is created
	created: function(){
		// Display them to do some actions on.
		document.getElementById('audioPlayer').style.display = 'block';
		// Now time to play the file.
		player.play();
	},
	// Sometimes, if nothing is playing in jukebox, we have to hide the player :(
	destroyed: function(){
		document.getElementById('audioPlayer').style.display = 'none';
	},
	// After .play() action
	played: function(){
		// Change button
		$('.playpause').removeClass('fa-play');
		$('.playpause').addClass('fa-pause');
	},
	// After .pause() action
	paused: function(){
		// Change button
		$('.playpause').addClass('fa-play');
		$('.playpause').removeClass('fa-pause');
	},
	// After .stop() action
	stopped: function(){
		// Change button
		$('.playpause').addClass('fa-play');
		$('.playpause').removeClass('fa-pause');
	}
});

// Get (and display) the playlist (who is located in localStorage)
player.getplaylist();

// When clicking on an audiofile...
$('.audioelement').on('click', function(e){
	// Do not start browser player
	e.preventDefault();
	// get all infos about the podcast and do action...
	// Toplay start the file and toplaylist add the file in the playlist
	if($(this)[0].classList.contains('toplay')){
		var action = 'toplay';
	}
	else if($(this)[0].classList.contains('toplaylist')){
		var action = 'toplaylist';
	}
	else {
		var action = null;
	}
	// Sending datas.
	player.getpodcastinfos($(this).data('id'), action);
});

$('#audioPlayer .playpause').on('click', function(){
	console.log($(this).attr('class'));
	if($(this)[0].classList.contains('fa-play'))
	{
		player.play();
	}
	else {
		player.pause();
	}
});

// Okay. Now time to stop the current file
$('#audioPlayer .stop').on('click', function(){
	player.stop();
});

// Ho, you don't like this podcast ? Try the next one in playlist.
$('#audioPlayer .next').on('click', function(){
	player.nextfile();
});

// Display playlist panel (or hide)
$('.extend').on('click', function(){
	$('#extended').addClass('playlistfull');
});

// Preety pink bar.
$('audio').on('timeupdate', function(){
	player.displaybar();
});

// if you click on the bar, it's magic. The file is updating.
$('#progressbar').on('click', function(e){
	$('audio')[0].currentTime = (e.pageX - $(this).offset().left)*$('audio')[0].duration/this.offsetWidth;
});

// At the end of a podcast, it's time to start a new one
$('audio').on('ended', function(){
	player.nextfile();
});