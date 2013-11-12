$(function(){

	// Sidebar open/close
	$('.menu-button').on('click', function(){
		// Content opacity
		$('#filter').toggleClass('filterBlack');
		$('#filter').removeClass('over');	
		// Display sidebar
		$('#left-sidebar').toggleClass('open');
		if($('#filter').is('.filterBlack')){
			$('#filter').on('click', function(){
				$('#filter').removeClass('filterBlack');
				$('#left-sidebar').removeClass('open');
			});
		}
	});

	$('.menu-button').on('mouseenter', function(){
		$('#left-sidebar').toggleClass('over');
		$('#left-sidebar').on('mouseleave', function(){
			$('#left-sidebar').removeClass('over');
		});
	});

});