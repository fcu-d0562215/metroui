$(window).resize(function() {

    _resize();
    for(i in content){
        _processMain(content[i],i,contentno[i]);
    }

});
$(document).ready(function() {
    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(100);
        $(this).find('a').attr('aria-expanded', 'true');
        $(this).addClass('open');
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(100);
        $(this).find('a').attr('aria-expanded', 'false');
        $(this).removeClass('open');
    });
    mainpage()
});

function _resize(resize_mode = null, a = null, b = null, c = null, d = null, e = null) {
    _changeContentSize();

    return true;
}
function _changeContentSize(){
    if (_width() < 576) {
        contentsize = 1
    } else if (_width() < 768) {
        contentsize = 2
    } else if (_width() < 992) {
        contentsize = 3
    } else if (_width() < 1200) {
        contentsize = 4
    } else {
        contentsize = 5
    }
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
