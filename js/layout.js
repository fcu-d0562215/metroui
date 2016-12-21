$(window).resize(function() {
    _resize("onresize")
});
$(document).ready(function() {
    // $(".container-fluid").css('margin-top', $(".navbar-fixed-top").css('height'));
    document.addEventListener('contextmenu', event => event.preventDefault());
    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(100);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(100);
    });
    $(window).keydown(function(event) {
        if (event.keyCode == 123 || event.ctrlKey && event.shiftKey && event.keyCode == 73) {
            return false;
        }
    });
    _resize()
});


function _resize(resize_mode = null, a = null, b = null, c = null, d = null, e = null) {

    if(_width()<998){
        $("#body>div:nth-of-type(4)>div>div>img").width(_width()*0.5)
        $("#body>div:nth-of-type(4)>div>div>img").height(_height()*0.4)
    }else{
        $("#body>div:nth-of-type(4)>div>div>img").width(_width()*0.3)
        $("#body>div:nth-of-type(4)>div>div>img").height(_height()*0.4)
    }

    return true;
}

function scrolltop() {
    $(document).scrollTop(0);
}

function _width() {
    return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
}

function _height() {
    return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
}


// if (_resize("onready")) {
//     $("#sidebar").mCustomScrollbar({
//         theme: "minimal",
//         scrollEasing: "easeInOutQuad",
//         autoDraggerLength: true,

//         advanced: {
//             updateOnBrowserResize: true,
//             updateOnContentResize: true
//         }
//     });
//     $(".container2").mCustomScrollbar({
//         theme: "minimal",
//         scrollEasing: "easeInOutQuad",
//         autoDraggerLength: true,
//         keyboard: {
//             enable: true,
//             scrollType: "stepless"
//         },
//         contentTouchScroll: 30,
//         advanced: {
//             updateOnBrowserResize: true,
//             updateOnContentResize: true
//         }
//     });
//     $("body").animate({ opacity: 1 }, 500).css('background-color', '#3c3f41');
// }
// $(".stick>a").on('click', '', function(event) {
//     event.preventDefault();
//     if ($(".sidebar0").hasClass('sidebar')) {
//         _toggle_sidebar();
//     }
//     $(".sidebar0 .d-menu").css('z-index', '0');
// });
// $(".stick>ul>li>a").on('click', '', function(event) {
//     if ($(".sidebar0").hasClass('sidebar2') && _width() <= 800) {
//         _toggle_sidebar();
//     }
//     $(".sidebar0 .d-menu").css('z-index', '0');
//     event.preventDefault();
// });
