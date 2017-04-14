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
			// var usernameInput = document.getElementById("usernameInput").value;
			// var passwordInput = document.getElementById("passwordInput").value;
			// var emailInput = document.getElementById("emailInput").value;

			var User = Parse.Object.extend("User");
			var user = new Parse.User();
			user.set("username", document.getElementById("usernameInput").value);
			user.set("password", document.getElementById("passwordInput").value);
			user.set("email", document.getElementById("emailInput").value);
			user.set("name", "Name");
			user.set("bio", "Tell us about yourself...");
			// user.set("photos");

			// other fields can be set just like with Parse.Object
			// user.set("phone", "415-392-0202");

			user.signUp(null, {
				success: function(user) {
					// Hooray! Let them use the app now.
					if ($("#error_msg").length) {
						$("#error_msg").remove();
					}
					$("#submit").after("<div id='success_msg'>Success!</div>");
					console.log("Sign up is a success!");
					window.location.assign("file:///Users/Cedric/Desktop/My%20Domain/Galleria/dashboard.html");
				},
				error: function(user, error) {
					// Show the error message somewhere and let the user try again.
					/* Checks for: 
						- empty username
						- empty password
						- taken username
						- taken password
						- taken email
					*/
					if ($("#error_msg").length) {
						$("#error_msg").remove();
					}
					$("#submit").after("<div id='error_msg'>" + error.message + "</div>");
					console.log("Error: " + error.code + " " + error.message);
				}
			});

			
		});
		
	}
})();