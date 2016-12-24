$(document).ready(function() {
    $(window).keydown(function(event) {
        if (event.keyCode == 123 || event.ctrlKey && event.shiftKey && event.keyCode == 73) {
            return false;
        }
    });
});