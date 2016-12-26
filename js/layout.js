//$(window).resize(function() {
//    mainpage()
//    _resize();
//});
//$(document).ready(function() {
//    $('ul.nav li.dropdown').hover(function() {
//        $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(100);
//        $(this).find('a').attr('aria-expanded', 'true');
//        $(this).addClass('open');
//    }, function() {
//        $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(100);
//        $(this).find('a').attr('aria-expanded', 'false');
//        $(this).removeClass('open');
//    });
//    mainpage()
//});
//
//function _resize() {
//    _changeContentSize();
//    return true;
//}
//
//function _changeContentSize() {
//    var w = _width();
//    if ( w< 576) {
//        contentsize = 1
//    } else if (w < 768) {
//        contentsize = 2
//    } else if (w < 992) {
//        contentsize = 3
//    } else if (w < 1200) {
//        contentsize = 4
//    } else {
//        contentsize = 5
//    }
//}
//
//function scrolltop() {
//    $(document).scrollTop(0);
//}
//
//function _width() {
//    return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
//}
//
//function _height() {
//    return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
//}
