$(document).ready(function() {
	//Right Click menu disable
	document.addEventListener('contextmenu', event => event.preventDefault());
	//Keyboard disable
    $(window).keydown(function(event) {
        if (event.keyCode == 123 || event.ctrlKey && event.shiftKey && event.keyCode == 73) {
            return false;
        }
    });
});