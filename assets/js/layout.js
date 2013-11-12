$(function(){

	// Sidebar open/close
	$('.menu-button').on('click', function(){
		// Content opacity
		$('#filter').toggleClass('filterBlack');
		$('#filter').removeClass('over');	
		// Display sidebar
		$('#left-sidebar').toggleClass('open');
	});

	$('.menu-button').on('mouseenter', function(){
		$('#left-sidebar').toggleClass('over');
		$('#left-sidebar').on('mouseleave', function(){
			$('#left-sidebar').removeClass('over');
		});
	});

});