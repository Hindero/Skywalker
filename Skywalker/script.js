$(document).ready(function () {
	console.log("ready!");

	var myMusic = document.querySelector("#music");
	var elem = document.documentElement;

	$("#play").click(function () {
		document.querySelector("#music").play();
		console.log("playing music");	
		openFullscreen();
		topFunction();
	});
	
	function topFunction () {
		document.body.scrollTop = 0; // For Safari
  	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}
	
	/* View in fullscreen */
		function openFullscreen() {
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
				console.log("request fullscreen");
			} else if (elem.mozRequestFullScreen) { /* Firefox */
				elem.mozRequestFullScreen();
				console.log("request fullscreen");
			} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
				elem.webkitRequestFullscreen();
				console.log("request fullscreen");
			} else if (elem.msRequestFullscreen) { /* IE/Edge */
				elem.msRequestFullscreen();
				console.log("request fullscreen");
			}
		}

	var frameNumber = 0, // start video at frame 0
		// lower numbers = faster playback
		playbackConst = 500,
		// get page height from video duration
		setHeight = document.getElementById("set-height"),
		// select video element         
		vid = document.getElementById('v0');
	// var vid = $('#v0')[0]; // jquery option

	// dynamically set the page height according to video length
	vid.addEventListener('loadedmetadata', function () {
		setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
	});


	//var videolen = Math.floor(vid.duration) * playbackConst;
	//$('html,body').scrollTop(0);


	// Use requestAnimationFrame for smooth playback
	function scrollPlay() {
		var frameNumber = window.pageYOffset / playbackConst;
		vid.currentTime = frameNumber;
		window.requestAnimationFrame(scrollPlay);
	}

	window.requestAnimationFrame(scrollPlay);



	//--------------------------------------------------




	var checkScrollSpeed = (function (settings) {
		settings = settings || {};

		var lastPos, newPos, timer, delta,
			delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

		function clear() {
			lastPos = null;
			delta = 0;
		}

		clear();

		return function () {
			newPos = window.scrollY;
			if (lastPos != null) { // && newPos < maxScroll 
				delta = newPos - lastPos;
			}
			lastPos = newPos;
			clearTimeout(timer);
			timer = setTimeout(clear, delay);
			return delta;
		};
	})();

	// listen to "scroll" event
	window.onscroll = function () {
		
		 if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        console.log("you're at the bottom of the page");
			 topFunction();
    }
		
		
		myMusic.play();
		var round = (checkScrollSpeed() / 50).toFixed(2);
		if (round < 0.08) {
			if (round < 0) {
				round = -round;
			} else {
				round = 0;
			}

			//myMusic.pause();
		}
		console.log(round);
		myMusic.playbackRate = round;
	};

});
