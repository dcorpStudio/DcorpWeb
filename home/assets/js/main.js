/*
	Halcyonic by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: [null, '736px']
	});

	// Nav.
	function createMobileNavMenu() {
		// Title Bar.
		$(
			'<div id="titleBar">' +
			'<a href="#navPanel" class="toggle"></a>' +
			'<span class="title">' + $('#logo').html() + '</span>' +
			'</div>'
		).appendTo($body);

		// Panel.
		$('<div id="navPanel"><nav>' + $('#nav').navList() + '</nav></div>')
			.appendTo($body).panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'left',
				target: $body,
				visibleClass: 'navPanel-visible'
			});
	}


	// ===============================================================
	// focus top menu page
	// ===============================================================

	function focusTopNav() {
		var pageName = document.location.pathname.match(/[^\/]+$/);
		if (pageName) pageName = pageName[0]
		else pageName = 'index.html';
		var childArr = document.getElementById('topNavContainer').childNodes[0].childNodes;
		for (let i in childArr) {
			// console.log(`pageName=${pageName} >> i=${i} > ${childArr[i].href}`);
			if (childArr[i].href && childArr[i].href.indexOf('#') == -1 && childArr[i].href.indexOf(pageName) != -1) {
				childArr[i].classList.add('topNavFous');
				break;
			}
		}
	};



	// ===============================================================
	// include HTML
	// ===============================================================


	function includeHTML(callbackSuccess) {
		var z, i, elmnt, file, xhttp;
		/* Loop through a collection of all HTML elements: */
		z = document.getElementsByTagName("*");
		for (i = 0; i < z.length; i++) {
			elmnt = z[i];
			/*search for elements with a certain atrribute:*/
			file = elmnt.getAttribute("w3-include-html");
			if (file) {
				/* Make an HTTP request using the attribute value as the file name: */
				xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
					if (this.readyState == 4) {
						if (this.status == 200) {
							elmnt.innerHTML = this.responseText;
							if (callbackSuccess) callbackSuccess(file);
						}
						if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
						/* Remove the attribute, and call this function once more: */
						elmnt.removeAttribute("w3-include-html");
						includeHTML();
					}
				}
				xhttp.open("GET", file, true);
				xhttp.send();
				/* Exit the function: */
				return;
			}
		}
	}
	includeHTML(function (includedFileName) {
		if (includedFileName == 'top_nav.html') {
			focusTopNav();
			createMobileNavMenu()
		}
	});



})(jQuery);


