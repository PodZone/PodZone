$(function(){

	// Hover on menu button
	$('.menu-button').on('mouseenter', function(){
		$('#audioPlayer')[0].style.display = 'none';
		$('#left-sidebar').addClass('over');
	});

	// When leave extended bar in left sidebar
	$('#extended').on('mouseleave', function(){
		$('#extended').removeClass('playlistfull');
	});

	// If leave left-sidebar... we hiding them
	$('.menu-button, #left-sidebar').on('mouseleave', function(){
		$('#left-sidebar').removeClass('over');
		/*$('#extended').removeClass('playlistfull');*/
		$('#smallplayer')[0].style.display = 'none';
	});

	// On hober on left sidebar, we can expand them
	$('#left-sidebar').on('mouseenter', function(){
		if($('audio source').attr('src') != ''){
			$('#audioPlayer')[0].style.display = 'block';
		}
		$('#left-sidebar').addClass('open');
		$('#smallplayer')[0].style.display = 'none';
		$('#filter').addClass('filterBlack');
	});

	// Black filter
	$('#filter').on('mouseenter', function(){
		$('#filter').removeClass('filterBlack');
		$('#left-sidebar').removeClass('open');
	});

	// Black filter with play button on mouse over
	$('.thumbnails img').on('mouseenter', function(){
		$(this).prev().fadeIn(200);
		$('.thumbnails img').prev().on('mouseleave', function(){
			$(this).fadeOut(200);
		});
	});

	// On mouse leave...
	$('.thumbnails').on('mouseleave', function(){
		$('.buttonplay').fadeOut(200);
	});

});