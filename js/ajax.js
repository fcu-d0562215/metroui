var pageno = 0
var pagemax = 0
var types, allInOne

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
                $(".progress").attr('value', percentComplete);
            }
        }, false);
        //Download progress
        xhr.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
                percentComplete = ((evt.loaded / evt.total) * 80) + 20;
                //Do something with download progress
                $(".progress").attr('value', percentComplete)
            }
        }, false);
        return xhr;
    }
});
$(document).ajaxStop(function() {
    hide_progressbar();
});
window.onpopstate = function() {
    if (event.state) {
        var data_type = (event.state).type;
        var data_response = (event.state).response;
        var data = data_response; //already array
        if (data_type == "history") {
            console.log(data_type + '-----' + data);
            $('.content').html(data);
        } else if (data_type == "page") {
            console.log(data_type + '-----' + data);
            $('.content').text(data);
        } else if (data_type == "new") {
            console.log(data_type + '-----' + data);
            $('.content').text(data);
        } else if (data_type == "googledocview") {
            console.log(data_type + '-----' + data);
            $('.content').html(data);
        }
    } else {
        if (document.location.search == "") {
            location.reload();
        } else {

        }
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

function _resetLayout() {
    $("#body").remove();
    $(".container-fluid").append('<div id="body"><div class="row"><img id="cover" src="" width="100%" height="100%"></div><div class="row" style="margin:20px 0 "><a id="title" style="font-size:150%;border-bottom:3px solid;"></a></div><div class="row"><h2 id="paragraph" style="font-size:100%"></h2></div><div class="row"><div></div></div></div>')
}

function _processData(data) {


    // for(var i in data1){
    //     console.log(data1.Huche)
    //     console.log(data1.keys('Huche'))
    // }
    _resetLayout();

    $("#title").text(data.title);
    $("#paragraph").text(data.paragraph);
    $("#cover").attr('src', data.cover).height(_height() * 0.45);
    var _content = document.querySelector("#body>div:nth-of-type(4)>div")
    if (data.content) {
        var _dataDetails = "",
            _dataContent = "";
        for (var i = 0; i < Object.keys(data.content).length; i++) {
            if (data.content[i].picture) {
                _dataContent += "<img src=" + data.content[i].picture + " style='margin-bottom:20px' width='40%' ><br>"
            }
            // console.log(document.querySelector("#body"))
            if (data.content[i].text) {
                _dataContent += "<p>" + data.content[i].text + "</p><br>"
            }
        }

        _content.innerHTML += '<div style="padding:10px 10px 0 10px">' + _dataContent + "</div>";
    }
    _content = document.querySelector("#body>div:nth-of-type(4)")
    console.log(Object.keys(data.details)[0])
    console.log(data.details["name"])
    if (data.details) {
        for(var i=0;i<Object.keys(data.details).length;i++){
            _dataDetails += Object.keys(data.details)[i]+" : "+data.details[Object.keys(data.details)[i]]+"<br>"
        }
        _content.innerHTML += "<div class='col-lg-3 text-xs-left' style='margin-bottom:15px;'><div style='padding:10px 5px 0 5px;font-size:100%;'>"+_dataDetails+"</p></div></div>"
    }
    if (data.lat) {
        _content.innerHTML += "<div class='col-lg-3'><div><p>地圖</p><p id='map'></p></div></div>";
        $("#body>div:nth-of-type(4)>div:nth-of-type(1)").addClass("col-lg-9")
        initMap(data.lat, data.long)
    }
        _resize()
}

function _getData(type, page) {
    $.ajax({
        type: 'Get',
        url: "https://raw.githubusercontent.com/fcu-d0562215/wp-project/master/"+type+".json",
        url: "./"+type+".json",
        dataType: "json",
        success: function(response) {
            allInOne = response
            pagemax = Object.keys(response).length - 1
            types  = type
            console.log(Object.keys(response)[0])
            _processData(response[Object.keys(response)[page]])
            $(document).scrollTop(0);
        }
    })
}

function nextpage(){
    if(pageno != pagemax){
        pageno+=1
        _getData(types,pageno)
    }
}

function previouspage(){
    if(pageno != 0){
        pageno-=1
        _getData(types,pageno)
    }
}

/*
function page(url) {
    event.preventDefault();
    var formdata = {};
    formdata.page = url;
    $.ajax({
        data: formdata,
        success: function(response) {
            response = eval(response);
            $('.content').text(response);
            history.pushState({ response: response, type: 'page' }, "逢甲海青班", "?page=" + url);
        }
    })
}

function news(url) {
    event.preventDefault();
    var formdata = {};
    formdata.news = url;
    $.ajax({
        data: formdata,
        success: function(response) {
            response = eval(response);
            $('.content').text(response);
            history.pushState({ response: response, type: 'news' }, "逢甲海青班", "?news=" + url);
        }
    })
}

function home() {
    event.preventDefault();
    var formdata = {};
    formdata.home = 'home';
    $.ajax({
        data: formdata,
        success: function(response) {
            $('.content').html(response);
            history.pushState({ response: response, type: 'history' }, "逢甲海青班", "?home");
        }
    })
}

function googledocview(one_element) {
    event.preventDefault();
    var url = encodeURIComponent(one_element.href);
    var str = '<iframe src="http://docs.google.com/viewer?embedded=true&url=' + url + '" width="100%" height="500px" style="border: none;"></iframe>';
    str += "<div style='position:absolute ;left: 3px;top: 3px;'><a href='" + one_element.href + "' download>下載</a></div>";
    history.pushState({ response: str, type: 'googledocview' }, "逢甲海青班", "?googledocview=" + url);
    $('.content').html(str);
}
*/
function hide_progressbar() {
    $("#loading").stop().animate({ opacity: 0 }, 300, function() { $("#loading").css('display', 'none'); });
    return $(".progress").stop().delay(300).animate({ opacity: 0 }, 300, function() { $(".progress").css('display', 'none').attr('value', 0); });

}
$(document).ready(function() {
    _getData("food", 0)
    window.onkeyup = function(e){
        if(e.keyIdentifier == "Right")
        nextpage()
        if(e.keyIdentifier == "Left")
        previouspage()
    }
});
