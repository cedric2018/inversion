(function(){

	var cUser;

	window.onload = function() {
		// Parse.initialize("ZIiQWefzDbK4hV6z3fH14h9XmxgwoTGncsbAgghp", "1lT0aAwri8gFtq1gIBNWrC2YdmwLDmwbLqo5Ur3o");
		// var TestObject = Parse.Object.extend("TestObject");
		// var testObject = new TestObject();
		
		// var currentUser = Parse.User.current();
		//if (currentUser) {
		    // do stuff with the user
		    //cUser = currentUser;
		    initListeners();
		//} else {
		    // show the signup or login page
		    //window.location.assign("file:///Users/Cedric/Desktop/My%20Domain/Galleria/login .html");
		//}
		
	}

	function initListeners () {
		for (var i = 0; i < localStorage.length; i++){
		    console.log(localStorage.getItem(localStorage.key(i)));
		}

		//checkEmailVerify();
		// function checkEmailVerify () {
		// 	if (Parse.User.get("emailVerified") !== true) { // if the email has not been verified
		// 		$("body").append("<div id='email_verify'><div><center>Please verify your email</center></div></div>");
		// 		$("#email_verify").animate(
		// 			{
		// 				"bottom": "0"
		// 			}, 400
		// 		);
		// 	}
		// }

		// $("#logout").click(function(){
		// 	console.log("logging out");
		// 	Parse.User.logOut();
		// 	var currentUser = Parse.User.current();  // this will now be null
		// });

		$(".tab").hover(
			function(){
				if (!$(this).hasClass("active_tab")) {
					$(this).css("cursor", "pointer");
				}
			}, function(){
				if ($(this).hasClass("active_tab")) {
					$(this).css("cursor", "default");
				}
			}
		);

		$(".tab").click(function(){
			if (!$(this).hasClass("active_tab")) {
				if (this.id == "gallery_button") {
					$("#gallery_container").css("display", "block");
					$("#info_container").css("display", "none");
				} else {
					$("#gallery_container").css("display", "none");
					$("#info_container").css("display", "flex");
				}
				$(".active_tab").removeClass("active_tab");
				$(this).addClass("active_tab");
				
			}
			
		});

		//editListeners();

		$(function(){
		    $("#upload_link").click(function(e){
		        e.preventDefault();
		        $("#upload:hidden").trigger('click');
		    });
		});

		$("#upload").click(function(){
			var elem = document.getElementById("upload_link");
			// var names = [];
			// for (var i = 0; i < elem.files.length(); i++) {
			//    names.push(elem.files[i].name);
			// }
			console.log(elem.value);
		});

		$(function () {
		    $(":file").change(function () {
		        if (this.files && this.files[0]) {
		            var reader = new FileReader();
		            reader.onload = imageIsLoaded;
		            reader.readAsDataURL(this.files[0]);
		        }
		    });
		});

		function imageIsLoaded(e) {
			var stuff = e.target.result.split("/");
			console.log(stuff);
			console.log(stuff[stuff.length - 1]);
			console.log("image url = " + e.target.result);
		    $('.carousel_item').css('background', "url('" + stuff[stuff.length - 1] /*e.target.result*/ + "') no-repeat contain");
		    // $(".carousel_item").css()
		    // $("#gallery span").remove();
		    // $("#gallery").prepend("");
		};

		// The server will only accept audio files in the file upload
		//document.getElementById("upload").accept = "image/*";
	}

	function editListeners () {
		updateProfileInfo();
	  	function updateProfileInfo () {
			$("#name").attr("value", cUser.get("name"));
			console.log("updating user attr. Name = " + cUser.get("name"));
			$("#bio").attr("value", cUser.get("bio"));
			console.log("updating bio attr. Bio = " + cUser.get("bio"));
		}

		$("#edit_name").click(function(){
			$(this).hide();
			$(".info_field #name_span").show();
			$("#name").select();
			$("#name").prop("disabled", false).css("background-color", "#F2F2F2");
			nameListener();
		});

		function nameListener () {
			$("#name").keypress(function (e) {
		    	if (e.keyCode == 13) {
		    		var nameValue = document.getElementById("name").value;
		    		if (nameValue == "") {
		    			cUser.set("name", "Name");
		    		} else {
		    			cUser.set("name", document.getElementById("name").value);
		    		}
		    		cUser.save();

		    		document.getElementById("name").disabled = true;
		    		$("#name").prop("disabled", true).css("background-color", "white");
		    		$("#edit_name").show();
					$(".info_field #name_span").hide();

					updateProfileInfo();
	    		}
	    	});
		}

		$("#edit_bio").click(function(){
			$(this).hide();
			$(".info_field #bio_span").show();
			$("#bio").select();
			$("#bio").prop("disabled", false).css("background-color", "#F2F2F2");
			bioListener();
		});

		function bioListener () {
			$("#bio").keypress(function (e) {
		    	if (e.keyCode == 13) {
		    		var bioValue = document.getElementById("bio").value;
		    		if (bioValue == "") {
		    			cUser.set("bio", "Tell us about yourself...");
		    		} else {
		    			cUser.set("bio", document.getElementById("bio").value);
		    		}
		    		cUser.save();

		    		document.getElementById("bio").disabled = true;
		    		$("#bio").prop("disabled", true).css("background-color", "white");
		    		$("#edit_bio").show();
					$(".info_field #bio_span").hide();

					updateProfileInfo();
	    		}
	    	});
		}
	}
})();








