var player = {

	// Defaults params if not set in myplayer.js
	defaults: {
		player: '#audioPlayer',
		volume: 1,
		bar: '#bar',
		created: function(){},
		destroyed: function(){},
		played: function(){},
		paused: function(){},
		stopped: function(){}
	},

	// Initializing params.
	init: function(opt){
		this.params = $.extend(this.defaults, opt);
	},	

	// Destroy html node :(
	destroyplayer: function(){
		$('#playerimg, #audiotitle, #audioinfos').empty();
		$('audio source').attr('src', '');
		this.params.destroyed.call(this);
	},

	// Create/complete html node
	createplayer: function(emission){
		// First, we have to destroy the player if have one.
		player.destroyplayer();

		// Set audio source (.mp3 file because there isn't any ogg podcast :()
		$('audio source').attr('src', emission.guid);
		
		// Just a trick to remember the database id of the file if we have to search some informations
		$('#audioinfos').data('id', emission.emm_id);
		// All podcasts must have a good picture
		$('#playerimg').append($('<img>').attr('src', emission.image));

		// Podacst title
		$('#audiotitle').append($('<h3>').html(emission.podcast_title));
		// Podcast informations
		$('#audioinfos').append($('<p>').html(emission.title));

		// Number of the podcast (prepend by a #)
		$('#audiotitle h3').append($('<span>').html('#'+emission.number));
		// Load the audio file
		$('audio')[0].load();
		// Set default volume
		$('audio')[0].volume = this.params.volume;
		// Duration of the file
		$('#time span:last-child').html(emission.duration);

		player.fbpublish(emission);
		this.params.created.call();
	},

	// Start current file
	play: function(datas){
		$('audio')[0].play();
		player.displaynotification();
		this.params.played.call();
	},

	// Pause current file
	pause: function(datas){
		$('audio')[0].pause();
		this.params.paused.call();
	},

	// Stop current file
	stop: function(datas){	
		$('audio')[0].pause();
		$('audio')[0].currentTime = 0;
		this.params.stopped.call();
	},

	checkifhavenextfile: function(){
		var havenext;
		if(localStorage.length == 0){
			$('.next').hide();
		}

	},

	// Play the next file if exist in localStorage
	nextfile: function(datas){
		// First we have to get the first element in localstorage
		var nextitem = parseInt(localStorage.key(0));
		// Parsing this item
		var next     = JSON.parse(localStorage.getItem(nextitem));

		// And the next of nextitem
		var thenextitem = parseInt(localStorage.key(1));

		// Get current file (which is playing now!)
		var current = $('#audioinfos').data('id');
		
		// if the audio file who is playing now and the next one are the same
		if(current == next.emm_id){
			// We remove them in the playlist
			player.removefromplaylist(0);
			// Then we have to set the next one will be played.
			var thenext = JSON.parse(localStorage.getItem(thenextitem));
		}
		// if not
		else {
			// The next one will be the first in localStorage
			var thenext = JSON.parse(localStorage.getItem(nextitem));
		}
		// Now we can create the player and start the file
		player.createplayer(thenext);
	},

	// sound volume
	changevolume: function(datas){

	},

	// Get all informations about one podcast.
	getpodcastinfos: function(id, action){
		// Database ajax request (PHP with only a PDO database request)
		$.getJSON('http://'+window.location.host+'/functions/ajax.php?emm='+id, function(emission){
			// If we have to play the file, so we start them now
			// If we have to add them in the playlist... 
			switch(action){
				case 'toplay':
					player.createplayer(emission);
					break;
				case 'toplaylist':
					player.addtoplaylist(emission);
					break;
			}
		});
	},	

	// Just display a new table line in #extended player view.
	renderplaylist: function(datas){
		$('#playlist tbody').append('<tr class="audioelement toplay" data-id="'+datas.emm_id+'"><td><i class="fa fa-play"></i></td><td>'+datas.podcast_title+'</td><td>'+datas.title+'</td><td>'+datas.duration+'</td>');
	},

	// Get playlist if exist in localstorage
	getplaylist: function(){
		// First we clean the html list
		$('#playlist tbody').empty();
		// And we display a new line for each playlist element.
		for(i in localStorage){
			this.renderplaylist(JSON.parse(localStorage.getItem(i)));
		}
	},

	// Add an item to playlist in localstorage
	addtoplaylist: function(emission){
		// Get current date. It's just to have a different key all the time...
		var currentdate = new Date().getTime();
		// Now we can add the file in our playlist.
		localStorage.setItem(currentdate, JSON.stringify({
			"emm_id"        : emission.emm_id,
			"guid"          : emission.guid,
			"duration"      : emission.duration,
			"podcast_title" : emission.podcast_title,
			"title"         : emission.title,
			"image"         : emission.image,
			"number"        : emission.number
		}));
		// And of course, we can refresh them in our html.
		player.getplaylist();
	},

	// Remove an item from the playlist in localstorage
	removefromplaylist: function(file){
		// File we have to remove from playlist
		var toremove = parseInt(localStorage.key(file));
		// Removing item
		localStorage.removeItem(toremove);
		// Refresh playlist
		player.getplaylist();
	},

	// Rendering progress and buffer bar.
	displaybar: function(){
		var progress = $('audio')[0].currentTime*100/$('audio')[0].duration;
		$('.progress')[0].style.width = progress+'%';
		var buffer = $('audio')[0].buffered.end(0)*100/$('audio')[0].duration;
		$('.buffer')[0].style.width = buffer+'%';
		// Update the current time
		$('#time span:first-child').html(displayTime($('audio')[0].currentTime));
	},

	// TODO : display notifications
	displaynotification: function(){
		
	},

	// Post on facebook 
	fbpublish: function(emission){
		postToWall(
			'J\'écoute actuellement un podcast sur http://PodZone.fr',
			emission.image,
			emission.guid,
			'PodZone',emission.description,
			postToWallCallBackHandler
		);
		console.log(emission);
	}
}