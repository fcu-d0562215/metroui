var URL;
var mode;
var _GET = [];
_GETURL();
var pageNo = 0;
var pageMax = 0;
var contentSize = 0;
var types;
var swipestart;
var fullData = {
    "food": {
        "url": "https://raw.githubusercontent.com/fcu-d0562215/wp-project/master/food.json",
        "contentNo": 0,
        "contentMax": 0,
        "content": {}
    },
    "travel": {
        "url": "https://raw.githubusercontent.com/fcu-d0562215/wp-project/master/travel.json",
        "contentNo": 0,
        "contentMax": 0,
        "content": {}
    }

}




function _processData(data) {
    _resetDataLayout();
    $("#title").text(data.title);
    $("#paragraph").text(data.paragraph);
    $("#cover").attr('src', data.cover).height(_height() * 0.45);
    var _content = document.querySelector("#body #DataBody #_content")
    if (data.content) {
        var _dataDetails = "",
            _dataContent = "";
        for (var i = 0; i < Object.keys(data.content).length; i++) {
            if (data.content[i].picture) {
                _dataContent += "<img src=" + data.content[i].picture + " style='margin-bottom:20px' width='70%' ><br>"
            }
            if (data.content[i].text) {
                _dataContent += "<p>" + data.content[i].text + "</p><br>"
            }
        }
        _content.innerHTML += '<div style="padding:10px 12% 0 12%">' + _dataContent + "</div>";
    }
    _content = $("#body>#DataBody>div:nth-of-type(4)>div:first")
    if (data.details) {
        for (var i = 0; i < Object.keys(data.details).length; i++) {
            _dataDetails += Object.keys(data.details)[i] + " : " + data.details[Object.keys(data.details)[i]] + "<br>"
        }
        _content.before("<div class='col-md-4 col-lg-3 text-xs-left push-md-8 push-lg-9' style='margin-bottom:15px;'><div id='details' style='padding:10px 5px;'><span>" + _dataDetails + "</span></div></div>");
    }
    _content = document.querySelector("#body>#DataBody>div:nth-of-type(4)")
    if (data.lat) {
        _content.innerHTML += "<div class='col-md-4 col-lg-3 push-md-8 push-lg-9'><div style='padding: 0px 10px;'><p>地圖</p><p id='map' ></p></div></div>";
        $("#body #_content").addClass("col-md-8 col-lg-9 float-md-right pull-md-4 pull-lg-3")
        initMap(data.lat, data.long)
    }
    return _resize();
}

function _getData(type, page) {
    if (page === undefined)
        page = 0;

    if (tmp = fullData[type].content[Object.keys(fullData[type].content)[page]]) {
        if (_processData(tmp)) {
            scrolltop();
            // if (Object.keys(tmp).length > 0) {
            //     $("#DataBody").append("<span id='nextpagebutton' onclick='nextpage()''>>></span>")
            // }
            if (history.state && history.state.url != "?" + type + "&page=" + page) {
                history.pushState({ response: $('.container-fluid').html(), type: type, page: page, url: "?" + type + "&page=" + page }, tmp.title, "?" + type + "&page=" + page);
            } else {
                history.replaceState({ response: $(".container-fluid").html(), type: type, page: page, url: "?" + mode + "&page=" + _GET["page"] }, tmp.title, "?" + mode + "&page=" + _GET["page"]);
            }
        }
    }
}


function nextpage(type) {
    if (pageNo != pageMax) {
        pageNo += 1
        _processData(fullData[type][Object.keys(fullData[type])[pageNo]])
        if (pageNo < pageMax) {
            if (!$("#nextpagebutton").html()) {
                $("#DataBody").append("<span id='nextpagebutton' onclick='nextpage()''></span>")
            }
        } else {
            $("#nextpagebutton").remove()
        }
        if (pageNo > 0 && !$("#prevpagebutton").html()) {
            $("#DataBody").prepend("<span id='prevpagebutton' onclick='previouspage()''></span>")
        }
    }
}

function previouspage(type) {
    if (pageNo != 0) {
        pageNo -= 1
        _processData(fullData[type][Object.keys(fullData[type])[pageNo]])
        if (pageNo > 0) {
            if (!$("#prevpagebutton").html()) {
                $("#DataBody").prepend("<span id='prevpagebutton' onclick='previouspage()''></span>")
            }
        } else {
            $("#prevpagebutton").remove()
        }
        if (pageNo < pageMax && !$("#nextpagebutton").html()) {
            $("#DataBody").append("<span id='nextpagebutton' onclick='nextpage()''></span>")
        }
    }
}


function mainpage() {
    _resetMainLayout();
    _processMain();
    if (history.state && history.state.url != "?main") {
        history.pushState({ response: $(".container-fluid").html(), url: "?main" }, "首頁", "?main")
    } else {
        history.replaceState({ response: $(".container-fluid").html(), url: "?main" }, "首頁", "?main")
    }
}

function _processMain(type) {
    if (type == 'undefined') {
        _writeMain(type, fullData[type]);
    } else {
        $.each(fullData, function(index, el) {
            _writeMain(index, el);
        });
    }
}

function _writeMain(index, el) {
    $('#' + index).html("")
    for (i = el.contentNo; i < el.contentNo + contentSize; i++) {
        if (tmp = el.content[Object.keys(el.content)[i]]) {
            var source = tmp;
            var title = source.title;
            var cover = source.cover;
            var paragraph = source.paragraph;
            var str = "_getData('" + index + "','" + i + "')"
            var string = '<div style="cursor:pointer;" class="mycard col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-2" onclick="' + str + '"><p style="cursor:pointer;" class="mycard_title">' + title + '</p><img style="cursor:pointer;" src="' + cover + '" alt=""><p style="cursor:pointer;" class="content">' + paragraph + '</p><a style="cursor:pointer;" class="moreInfo" href onclick="event.preventDefault();">More info ...</a></div>'
            $('#' + index).append(string);
        }
    }
    if (el.contentNo + contentSize > el.contentMax) {
        $('#next' + index).remove()
    } else {
        if (!$("#next" + index).html()) {
            $('#' + index + 'Content').append("<span id='next" + index + "' onclick='mainNextContent(" + index + ")'>></span>")
        }
    }
    if (el.contentNo <= 0) {
        $('#prev' + index).remove()
    } else {
        if (!$("#prev" + index).html()) {
            $('#' + index + 'Content').append("<span id='prev" + index + "' onclick='mainPrevContent(" + index + ")'><</span>")
        }
    }
}

function mainNextContent(type) {
    if (fullData[type.id].contentNo != fullData[type.id].contentMax && fullData[type.id].contentNo <= fullData[type.id].contentMax - contentSize) {
        fullData[type.id].contentNo += contentSize
        if (fullData[type.id].contentNo > fullData[type.id].contentMax - contentSize) {
            $('#next' + type.id).remove()
        }
        _processMain(type)
        if (fullData[type.id].contentNo != 0) {
            if (!$("#prev" + type.id).html()) {
                $("#" + type.id + "Content").prepend('<span id="prev' + type.id + '" onclick="mainPrevContent(' + type.id + ')"><</span>')
            }
        }
    }
}

function mainPrevContent(type) {
    if (fullData[type.id].contentNo != 0) {
        fullData[type.id].contentNo -= contentSize
        if (fullData[type.id].contentNo < 0) {
            fullData[type.id].contentNo = 0
        }
        _processMain(type)
        if (fullData[type.id].contentNo <= 0) {
            $('#prev' + type.id).remove()
        }

        if (fullData[type.id].contentNo != fullData[type.id].contentMax - contentSize) {
            if (!$("#next" + type.id).html()) {
                $('#' + type.id + 'Content').append("<span id='next" + type.id + "' onclick='mainNextContent(" + type.id + ")'>></span>")
            }
        }
    }
}

function mainSwipeStart() {
    e = this.event
    swipestart = e.touches[0].clientX
}

function mainSwipeEnd(type) {
    e = this.event
    if (swipestart - e.changedTouches[0].clientX >= 50 || swipestart - e.changedTouches[0].clientX <= -50) {
        if (swipestart > e.changedTouches[0].clientX) {
            mainNextContent(type)
        } else {
            mainPrevContent(type)
        }
    }
}

$("#DataBody").ready(function() {
    window.onkeyup = function(e) {
        if (e.keyIdentifier == "Right" || e.keyCode == 39) {
            nextpage("food");
        } else if (e.keyIdentifier == "Left" || e.keyCode == 37) {
            previouspage("food");
        }
    }
})

function _resize() {
    _changecontentSize();
    _processMain()


    return true;
}

function _changecontentSize() {
    var n = _width();
    n < 576 ? contentSize = 1 : n < 768 ? contentSize = 2 : n < 992 ? contentSize = 3 : n < 1200 ? contentSize = 4 : contentSize = 5
}

function scrolltop() {
    $(document).scrollTop(0)
}

function _width() {
    return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName("body")[0].clientWidth
}

function _height() {
    return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight
}
$(window).resize(function() {
    _resize()
});
$(document).ready(function() {
    $('ul.nav li').click(function(event) {
        if ($(".navbar-toggleable-xs.collapse ").hasClass('in')) {
            $('.navbar-toggler').click();
        }
    });
    $("ul.nav li.dropdown").hover(function() {
        $(this).find(".dropdown-menu").stop(!0, !0).delay(50).fadeIn(100), $(this).find("a").attr("aria-expanded", "true"), $(this).addClass("open")
    }, function() {
        $(this).find(".dropdown-menu").stop(!0, !0).delay(50).fadeOut(100), $(this).find("a").attr("aria-expanded", "false"), $(this).removeClass("open")
    });
    _getFullData();
});
$.ajaxSetup({
    method: "POST",
    cache: false,
    processData: false,
    contentType: false,
    beforeSend: function(xhr) {
        $("#loading").stop().css('display', 'block').animate({ opacity: 1 }, 1000);
        $(".progress").stop().css({
            opacity: '1',
            display: 'block'
        });
    },
    xhr: function() {
        var xhr = new window.XMLHttpRequest();
        var percentComplete = 0;
        //Upload progress
        xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
                percentComplete = (evt.loaded / evt.total) * 20;
                //Do something with upload progress
                console.log("  up " + percentComplete);
                $(".progress").attr('value', percentComplete);
            }
        }, false);
        //Download progress
        xhr.addEventListener("progress", function(evt) {
            // console.log(evt.loaded)
            if (evt.lengthComputable) {
                percentComplete = ((evt.loaded / evt.total) * 80) + 20;
                //Do something with download progress
                // console.log("down "+percentComplete);
                $(".progress").attr('value', percentComplete)
            }
        }, false);
        return xhr;
    }
});
$(document).ajaxStop(function() {
    if (mode == "food" || mode == "travel") {
        _getData(mode, _GET["page"]);
    } else {
        mainpage();
    }
});

function _GETURL() {
    URL = window.location.href.split("?");
    URL.shift()
    if (URL.length > 0 && URL[URL.length - 1] != "") {
        URL = URL.shift().split("&");
        mode = URL.shift();
        URL.forEach(function(get) {
            var tmp = get.split("=");
            _GET[tmp[0]] = tmp[1];
        })
    }
}
window.onpopstate = function() {
    if (event.state) {
        $('.container-fluid').html(event.state.response);
        scrolltop();
    }
}

function initMap(lati, long) {
    var uluru = {
        lat: lati,
        lng: long
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

function _getFullData() {
    $.each(fullData, function(index, el) {
        $.ajax({
                url: el.url,
                method: 'GET',
                dataType: 'json'
            })
            .done(function(response) {
                el.content = response;
                el.contentMax = Object.keys(response).length - 1;
            })
            .fail(function() {
                // console.log("error");
            })
            .always(function() {

                // console.log("complete");
            });

    });

}

function _resetDataLayout() {
    $("#body").remove();
    $(".container-fluid").append('<div id="body"><div id="DataBody"><div class="row"><img id="cover" src="" width="100%" height="100%"></div><div class="row" style="padding-top:20px;padding-bottom:20px; "><span id="title" style="border-bottom:3px solid;"></span></div><div class="row"><h2 id="paragraph" ></h2></div><div class="row"><div id="_content" style="margin-bottom:15px" ></div></div></div></div>')
}

function _resetMainLayout() {
    $("#body").remove();
    $(".container-fluid").append('<div class="row" id="body"><div id="MainBody"><div class="col-xs-12"><div id="frame" class="col-xs-12"><p>遊悠樂</p><span>您旅遊的最佳好幫手<br>讓您出遊悠哉又快樂</div></div><div class="calouse col-xs-12"><a id="calouse_Header" href="">Food</a><div class="col-xs-12" style="padding:0"><div id="foodContent" class="calouse_Content"  ><div id="food" class="col-xs-12" ontouchstart="mainSwipeStart(food)" ontouchend="mainSwipeEnd(food)"></div><span id="nextfood" onclick="mainNextContent(food)">></span></div></div></div><div class="calouse col-xs-12"><a id="calouse_Header" href="">Travel</a><div id="travelContent" class="calouse_Content col-xs-12" ><div id="travel" class="col-xs-12" ontouchstart="mainSwipeStart(travel)" ontouchend="mainSwipeEnd(travel)" ></div><span id="nexttravel" onclick="mainNextContent(travel)">></span></div></div></div></div>');
    _changecontentSize();
}
