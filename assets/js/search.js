// prevent default action on submit
$('header form').on('submit', function(e){
	e.preventDefault();
});

// New database search when typing a character in the search form
$('.search').on('input', function(){
	// Get value
	var tosearch = $(this).val();
	
	// If erasing all characters
	if(tosearch.length < 1)
	{
		// Just display default content
		$('#search-results h3, #result').empty();
		$('#search-results').fadeOut(300);
		$('#content').fadeIn(300);
	}

	// If one or more character 
	if(tosearch.length >= 1)
	{
		// Hiding content
		$('#content').fadeOut(300);
		// Display search result box (but don't do any search)
		$('#search-results').fadeIn(300, function(){
			$('#search-results h3').html('Résultats de recherche pour « '+tosearch+' »');
		});
	}

	// Now it's time to search o/
	if(tosearch.length >= 3)
	{
		// Clear oooold results
		$('#results').empty();
		// Database research (returning json)
		$.ajax({
			datatype: 'json',
			url: 'http://'+window.location.host+'/functions/ajax.php?q='+tosearch,
			success: function(datas){
				// Parsing json
				var results = JSON.parse(datas);
				// Display results
				$('#results').html($('<div>').attr('id', 'podcasts-find').html('Des podcasts ont été trouvés'));
				$.each(results, function(key, value){
					$('#results').append($('<h4>').html('<a rel="tab" href="/podcasts/'+value.author+'/'+value.slug+'/">'+value.podcast_title+'</a>'));
					$('#results').append($('<p>').html(value.description));
				});
			}
		});		
	}

});