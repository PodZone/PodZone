
	window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '1403396323226783', // App ID
	      status     : true, // check login status
	      cookie     : true, // enable cookies to allow the server to access the session
	    });
	    
	    // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
	  	// for any authentication related change, such as login, logout or session refresh. This means that
	  	// whenever someone who was previously logged out tries to log in again, the correct case below 
	  	// will be handled. 
		FB.Event.subscribe('auth.authResponseChange', function(response) 
		{
			// Here we specify what we do with the response anytime this event occurs.
			if (response.status === 'connected')
			{
	  			//SUCCESS
	  		}

	  		else if (response.status === 'not_authorized')
	  		{
				//FAILED
			} else
			{
	    		//UNKNOWN ERROR
	    	}
		});	
		
    };


   	function login()
	{
	
		FB.login(function(response) {
		   if (response.authResponse){
		    	
		    	getUserInfo();

  			} 
  			else{
  	    		console.log('User cancelled login or did not fully authorize.');
   			}
		 },{scope: 'publish_actions,user_photos, read_stream'});
	
	}

	function getUserInfo() 
	{
		FB.api('/me', function(response) {

			$('.btn-fb-connect span').html(response.name);
		    $('.btn-fb-connect i').hide();
		});

    }

	function postToWallCallBackHandler(response) 
	{
	    if (!response || response.error) {
	        console.log(response.error.message);
	    } else {
	        document.getElementById('fbSubmit').click();
	    }
 	}

	function postToWall(mymessage,mypic,mylink,myname,mydesc,callbackHandler) 
	{
	    // mymessage,mypic,mylink,myname,mydesc,callbackHandler
	    FB.api('/me/feed', 'post', { message: mymessage, picture: mypic, link: mylink, name: myname, description: mydesc },function (response){callbackHandler(response);} );
	}

	function logout()
	{
		FB.logout(function(){document.location.reload();});
	}

  // Load the SDK asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/fr_FR/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));

