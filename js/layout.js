var sidebar200 = 200;
$(window).resize(function() {
    _resize()
});

$(document).ready(function() {
    if (_resize()) {
        $("body").animate({ opacity: 1 }, 500).css('background-color', '#3c3f41');
    }

});

function _toggle_sidebar() {
    var sidebar = $(".sidebar");
    var fullsidebar = $(".sidebar.compact");
    var thinksidebar = $(".sidebar.sidebar200");
    sidebar.toggleClass('compact').toggleClass('sidebar200 ');
    if (sidebar.hasClass('sidebar200')) {
        $(".container").width(_width() - sidebar200);
    } else if (sidebar.hasClass('compact')) {
        $(".container").width(_width() - 52);
    }
}

function _resize() {
    var x = _width(),
        y = _height(),
        app_bar = $(".app-bar"),
        sidebar = $("#sidebar"),
        sidebar_item = $(".sidebar li"),
        container = $(".container"),
        app_bar_height = app_bar.height(),
        sidebar_minheight = sidebar_item.height() * sidebar_item.length,
        sidebar_content_height = y - app_bar_height;
    if (sidebar_content_height < sidebar_minheight) {
        $(".sidebar").height(sidebar_minheight);
        container.height(sidebar_minheight);
    } else {
        $(".sidebar").height(sidebar_content_height);
    }
    container.height(sidebar_content_height);
    var container_width = x - sidebar.width();
    if (x > 800) {
        if ($("#menu_toggle").css('opacity') == 0) {
            $("#menu_toggle").css('opacity', '1').on('click', function() {
                _toggle_sidebar();
            });
        }
        if ($(".sidebar").hasClass('compact') == false && $(".sidebar").hasClass('sidebar200') == false) {
            $(".sidebar").toggleClass('sidebar200');
            container_width = x - sidebar200;
        }
    } else {
        if (($(".sidebar").hasClass('compact')) == false) {
            $(".sidebar").toggleClass('compact');
        } else if ($(".sidebar").hasClass('sidebar200')) {
            _toggle_sidebar();
            container_width = x - 52;
        }
        console.log($("#menu_toggle").css('opacity'))
        if ($("#menu_toggle").css('opacity')) {
            $("#menu_toggle").css('opacity', '0').off();

        }

    }
    container.width(container_width - 1)
    $(".container").mCustomScrollbar({
        theme: "minimal"
    });
    sidebar.mCustomScrollbar({
        theme: "minimal"
    });
    $(".content").html("").append(_width()).append('<br>').append(_height())
    return true;
    //console.log(container_height+" "+window_height+" "+app_bar_height+" "+x+" "+y);*/
}

function _width() {
    return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
}

function _height() {
    return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
}
