$(window).resize(function() {
    _resize("onresize")
});

$(document).ready(function() {
    if (_resize("onready")) {
        $("body").animate({ opacity: 1 }, 500).css('background-color', '#3c3f41');
    }
    $(".stick>a").on('click', '', function(event) {
        event.preventDefault();
        if ($(".sidebar0").hasClass('sidebar')) {
            _toggle_sidebar();
        }
        $(".d-menu").css('z-index', '0');
    });
    $(".stick>ul>li>a").on('click', '', function(event) {
        if ($(".sidebar0").hasClass('sidebar2') && _width() <= 800) {
            _toggle_sidebar();
        }
        $(".d-menu").css('z-index', '0');
        event.preventDefault();
    });
});


function _resize(resize_mode = null, a = null, b = null, c = null, d = null, e = null) {
    var x = _width(),
        y = _height(),
        app_bar = $(".app-bar"),
        container = $(".container2"),
        sidebar = $("#sidebar");
    if (resize_mode != null) {
        if (resize_mode == "sidebar") {
            if (a == 0) {
                return false;
            }
            if (x >= 500) {
                container.css('right', '0').css('position', 'relative');
                if (a == 1) {
                    container.width(x - 52);
                } else if (a == 2) {
                    container.width(x - 200);
                }
            } else {
                if (a == 1) {
                    container.css('right', '0').css('position', 'relative');
                } else if (a == 2) {
                    container.css('right', '-148px').css('position', 'absolute');
                }

            }

        } else if (resize_mode == "onready") {
            var sidebar2 = $(".sidebar0");

            if (x > 800) {
                sidebar2.addClass('sidebar2');
                container.width(x - 200);
            } else {
                sidebar2.addClass('sidebar');
                container.width(x - 52);
            }
        } else if (resize_mode == "onresize") {
            if (x < 800 && $(".sidebar0").hasClass('sidebar2')) {
                _toggle_sidebar();
            } else {
                container.width(x - sidebar.width())
            }
        }
    }
    var sidebar_item = $(".sidebar0>li"),
        sidebar_minheight,
        app_bar_height = app_bar.height(),
        sidebar_content_height = y - app_bar_height;
    sidebar_item.each(function(index, el) {
        sidebar_minheight += $(this).height();
    })
    if (sidebar_content_height < sidebar_minheight) {} else {
        //$(".sidebar0").height(sidebar_content_height);
    }
    $(".sidebar0").height(sidebar_minheight);
    sidebar.height(sidebar_content_height)
    container.height(sidebar_content_height);

    $(".content").append(_width()).append('<br>').append(_height()).append('<br>').append($(".content").width()).append('<br>')

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });
    container.mCustomScrollbar({
        theme: "minimal"
    });
    return true;
}

function _toggle_sidebar() {
    var sidebar = $(".sidebar0"),
        mode = 0;
    if (sidebar.hasClass('sidebar2')) {
        sidebar.addClass('sidebar').removeClass('sidebar2');
        mode = 1;
    } else if (sidebar.hasClass('sidebar')) {
        sidebar.addClass('sidebar2').removeClass('sidebar');
        mode = 2;
    }
    return _resize("sidebar", mode);
}

function _width() {
    return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
}

function _height() {
    return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
}
