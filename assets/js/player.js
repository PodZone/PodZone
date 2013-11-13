var player = {

	params: {
		media: '#player',
		buttons: {
			playPause: '#playpause',
			prev: '#prev',
			next: '#next'
		}
	},

	init: function(options)
	{
		this.params = $.extend(this.params, options);
	},

	playpause: function()
	{
		console.log($(player.params.buttons.playPause).classList);
		if($(player.params.buttons.playPause).is('.play'))
		{
			document.querySelector(player.params.media).play();
		}
		else
		{
			document.querySelector(player.params.media).pause();
		}
		
	},
}



// $(function(){

// 	// Event on play pause button to start/pause mp3 file
// 	$('#playpause').on('click', function()
// 	{
// 		if($(this).is('.play'))
// 		{
// 			$('audio').get(0).play();
// 			$(this).attr('src', '<?php echo $img_dir; ?>pause.png');
// 			$(this).attr('class', 'pause');
// 		}
// 		else
// 		{
// 			$('audio').get(0).pause();
// 			$(this).attr('src', '<?php echo $img_dir; ?>play.png');
// 			$(this).attr('class', 'play');
// 		}
// 	});

// });