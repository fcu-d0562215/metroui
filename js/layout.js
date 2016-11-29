$(window).resize(function() {
    // _resize("onresize")
});
$(document).ready(function() {
    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(100);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(100);
    });
    // if (_resize("onready")) {
    //     // $("#sidebar").mCustomScrollbar({
    //     //     theme: "minimal",
    //     //     scrollEasing: "easeInOutQuad",
    //     //     autoDraggerLength: true,

    //     //     advanced: {
    //     //         updateOnBrowserResize: true,
    //     //         updateOnContentResize: true
    //     //     }
    //     // });
    //     // $(".container2").mCustomScrollbar({
    //     //     theme: "minimal",
    //     //     scrollEasing: "easeInOutQuad",
    //     //     autoDraggerLength: true,
    //     //     keyboard: {
    //     //         enable: true,
    //     //         scrollType: "stepless"
    //     //     },
    //     //     contentTouchScroll: 30,
    //     //     advanced: {
    //     //         updateOnBrowserResize: true,
    //     //         updateOnContentResize: true
    //     //     }
    //     // });
    //     // $("body").animate({ opacity: 1 }, 500).css('background-color', '#3c3f41');
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

        document.oncontextmenu = function()
        {
            return false
        }
        if (document.layers)
        {
            window.captureEvents(Event.MOUSEDOWN);
            window.onmousedown = function(e)
            {
              if (e.target==document) return false;
            }
        }
        else
        {
          document.onmousedown = function() {return false}
        }
});


function _resize(resize_mode = null, a = null, b = null, c = null, d = null, e = null) {
    // var x = _width(),
    //     y = _height(),
    //     app_bar = $(".app-bar>.container_metro>.app-bar-element.branding"),
    //     container = $(".container2"),
    //     sidebar = $("#sidebar");
    // if (resize_mode != null) {
    //     if (resize_mode == "sidebar") {
    //         if (a == 0) {
    //             return false;
    //         }
    //         if (x >= 500) {
    //             container.css('right', '0').css('position', 'relative');
    //             if (a == 1) {
    //                 container.width(x - 52);
    //             } else if (a == 2) {
    //                 container.width(x - 200);
    //             }
    //         } else {
    //             if (a == 1) {
    //                 container.css('right', '0').css('position', 'relative');
    //             } else if (a == 2) {
    //                 container.css('right', '-148px').css('position', 'absolute');
    //             }

    //         }

    //     } else if (resize_mode == "onready") {
    //         var sidebar2 = $(".sidebar0"),
    //             sidebar_icon = sidebar2.find('.toggle_icon');
    //         if (x > 800) {
    //             sidebar2.addClass('sidebar2');
    //             sidebar_icon.addClass('mif-chevron-thin-left')
    //             container.width(x - 200);
    //         } else {
    //             sidebar2.addClass('sidebar');
    //             sidebar_icon.addClass('mif-chevron-thin-right')
    //             container.width(x - 52);
    //         }
    //     } else if (resize_mode == "onresize") {
    //         if (x < 800 && $(".sidebar0").hasClass('sidebar2')) {
    //             _toggle_sidebar();
    //         } else {
    //             container.width(x - sidebar.width())
    //         }
    //     }
    // }
    // var sidebar_item = $(".sidebar0>li"),
    //     sidebar_minheight,
    //     app_bar_height = app_bar.height(),
    //     sidebar_content_height = y - app_bar_height,
    //     appbar = $(".app-bar-menu"),
    //     appbar_logo = $(".app-bar-element.branding");
    // sidebar_item.each(function(index, el) {
    //     sidebar_minheight += $(this).height();
    // })
    // $(".sidebar0").height(sidebar_minheight);
    // sidebar.height(sidebar_content_height);
    // //appbar.width( x-appbar_logo.width()-appbar_logo.css('padding-left').replace("px","")-appbar_logo.css('padding-right').replace("px","")-3 )
    // //console.log(x,appbar_logo.width(),appbar_logo.css('padding-left'),appbar_logo.css('padding-right'))
    // container.height(sidebar_content_height);

    // //$(".content").append(_width()).append('<br>').append(_height()).append('<br>').append($(".content").width()).append('<br>');
    // scrolltop();
    // return true;
}

function scrolltop() {
    // return setTimeout(function() { $('.container2').mCustomScrollbar('scrollTo', 'top'); }, 200);
}

function scrollbottom() {
    // return setTimeout(function() { $('.container2').mCustomScrollbar('scrollTo', 'bottom'); }, 200);
}

function _toggle_sidebar() {
    // var sidebar = $(".sidebar0"),
    //     sidebar_icon = sidebar.find('.toggle_icon'),
    //     mode = 0;
    // if (sidebar.hasClass('sidebar2')) {
    //     sidebar_icon.removeClass('mif-chevron-thin-left').addClass('mif-chevron-thin-right')
    //     sidebar.addClass('sidebar').removeClass('sidebar2');

    //     mode = 1;
    // } else if (sidebar.hasClass('sidebar')) {
    //     sidebar_icon.removeClass('mif-chevron-thin-right').addClass('mif-chevron-thin-left')
    //     sidebar.addClass('sidebar2').removeClass('sidebar');

    //     mode = 2;
    // }
    // return _resize("sidebar", mode);
}

function _width() {
    return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
}

function _height() {
    return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
}
