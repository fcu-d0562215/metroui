function _resize(){
  return _changeContentSize(),!0
}
function _changeContentSize(){
  var n=_width();
  n<576?contentsize=1:n<768?contentsize=2:n<992?contentsize=3:n<1200?contentsize=4:contentsize=5
}
function scrolltop(){$(document).scrollTop(0)
}
function _width(){return window.innerWidth||document.documentElement.clientWidth||document.getElementsByTagName("body")[0].clientWidth}function _height(){return window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName("body")[0].clientHeight}
$(window).resize(function(){
  for (type in dataSource) {
    console.log(type)
      _processMain(content[type], type, contentno[type])
  }
  _resize()
}),$(document).ready(function(){$("ul.nav li.dropdown").hover(function(){$(this).find(".dropdown-menu").stop(!0,!0).delay(50).fadeIn(100),$(this).find("a").attr("aria-expanded","true"),$(this).addClass("open")},function(){$(this).find(".dropdown-menu").stop(!0,!0).delay(50).fadeOut(100),$(this).find("a").attr("aria-expanded","false"),$(this).removeClass("open")}),mainpage()});
