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
                $(".progress").data("progress").set(percentComplete)
                console.log(percentComplete);
            }
        }, false);
        //Download progress
        xhr.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
                percentComplete = ((evt.loaded / evt.total) * 80) + 20;
                //Do something with download progress
                $(".progress").data("progress").set(percentComplete)
                console.log(percentComplete);
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

function buildFormData() {
    var fd = new FormData();

    for (var i = 0; i < 10000; i += 1) {
        fd.append('data[]', Math.floor(Math.random() * 999999));
    }

    return fd;
}

function homepage() {
    var a = buildFormData()
    $.ajax({
        url: 'homepage.php?asd=123123&dfs=134',
        data: a,
        processData: false,
        success: function(data) {
            $(".content>.row:first").html(data)
        }
    })

}
function test(){
    $(".app-bar-menu").append("<div class='app-bar-element place-right'><a class='dropdown-toggle fg-white'><span class='mif-enter'></span> Enter</a><div class='app-bar-drop-container bg-white fg-dark place-right' data-role='dropdown' data-no-close='true'><div class='padding20'><form><h4 class='text-light'>Login to service...</h4><div class='input-control text'><span class='mif-user prepend-icon'></span><input></div><div class='input-control text'><span class='mif-lock prepend-icon'></span><input type='password'></div><label class='input-control checkbox small-check'><input type='checkbox'><span class='check'></span><span class='caption'>Remember me</span></label><div class='form-actions'><button class='button'>Login</button><button class='button link'>Cancel</button></div></form></div></div></div>");
    var a = '<li class="stick"><a><span class="mif-tree icon"></span><span class="title">Sub menu</span><span class="counter">4</span></a><ul class="d-menu" data-role="dropdown" style="display:none"><li><a onclick=><span class="mif-vpn-publ icon"></span> Subitem 1</a></li><li><a >Subitem 2</a></li><li><a >Subitem 3</a></li><li><a >Subitem 4</a></li><li class="disabled"><a>Subitem 5</a></li></ul></li>'
    $(".sidebar0").append(a)
}
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

function hide_progressbar() {
    $("#loading").stop().animate({ opacity: 0 }, 300, function() { $("#loading").css('display', 'none'); });
    return $(".progress").stop().delay(300).animate({ opacity: 0 }, 300, function() { $(".progress").css('display', 'none').data("progress").set(0); });

}
