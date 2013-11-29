$(function(){
	// On click on an element
	$("a[rel='tab']").on('click', function(e){
		// Don't start them
		e.preventDefault();
		// url of mp3 file
		urltogo = $(this).attr('href');
		// Load new content
		$('#content').load(urltogo+'?rel=tab');
		// If url != current url
		if(urltogo != window.location){
			// THen, we add them to history
			window.history.pushState({
				path:urltogo
			},'',urltogo);	
		}
	});
});

// On loading
$(window).on('popstate', function(){
	$('#content').load(location.pathname+'?rel=tab');
});

