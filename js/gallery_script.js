(function(){
	window.onload = function() {
		if(typeof(Storage) !== "undefined") {
		    console.log("Local Storage is a GO!");
		    initEventListener();
		} else {
		    console.log("Sorry! No Web Storage support..");
		}
	}

	function initEventListener () {
		// make cursor change on hover
		$(".carousel_item").hover(function(){
			if (!$(this).hasClass("active")) {
				$(".active").find( '.description' ).css("display", "none");
				$(".active").removeClass("active");
				$(this).addClass("active");
				$(this).find( '.description' ).css("display", "block");
			}
		})
	}
})();