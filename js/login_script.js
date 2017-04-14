(function(){
	window.onload = function() {
		Parse.initialize("ZIiQWefzDbK4hV6z3fH14h9XmxgwoTGncsbAgghp", "1lT0aAwri8gFtq1gIBNWrC2YdmwLDmwbLqo5Ur3o");
		var TestObject = Parse.Object.extend("TestObject");
		var testObject = new TestObject();
		// testObject.save({foo: "bar"}).then(function(object) {
		// 	console.log("yay! it worked");
		// });

		var currentUser = Parse.User.current();
		if (currentUser) { // user is already logged in (we know this via Local Storage)
		    // do stuff with the user
			window.location.assign("file:///Users/Cedric/Desktop/My%20Domain/Galleria/dashboard.html");
		} else { // no user is logged in yet
		    // show the signup or login page
		    initListeners();
		}
	}

	function initListeners () {
		$("#submit").click(function(){
			parseLogin();
		});

		$("input").keypress(function (e) {
	    	if (e.keyCode == 13) {
	    		parseLogin();
    		}
    	});

    	function parseLogin () {
    		Parse.User.logIn(document.getElementById("usernameInput").value, document.getElementById("passwordInput").value, {
				success: function(user) {
					// Do stuff after successful login.
					alert("Login is a success!");
					var currentUser = Parse.User.current();
					window.location.assign("file:///Users/Cedric/Desktop/My%20Domain/Galleria/dashboard.html");
				},
				error: function(user, error) {
					// The login failed. Check error to see why.
					if ($("#error_msg").length) {
						$("#error_msg").remove();
					}
					$("#submit").after("<div id='error_msg'>" + error.message + "</div>");
					console.log("Error: " + error.code + " " + error.message);
				}
			});
		}
	}
})();