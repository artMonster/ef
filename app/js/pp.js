$('body').each(function() {
    var body = $(this);
    var img_url = $(this).data('img');

    var img = new Image();
    img.src = img_url;
    img.onload = function(){
        $('#pp').css('background-image', 'url(' + img_url + ')');
        $('#pp').css('height', img.height + 'px');
        var ppbtn = '<button onclick="myOff()" id="ppbtn" style="position:fixed;top:0;right:0;z-index:1000001">OFF</button>';
        var pp_up = '<button onclick="myGet(0)" id="ppbtn" style="position:fixed;top:30px;right:0;z-index:1000001">UP</button>';
        var pp_down = '<button onclick="myGet(1)" id="ppbtn" style="position:fixed;top:60px;right:0;z-index:1000001">DOWN</button>';
        var pp_left = '<button onclick="myGet(2)" id="ppbtn" style="position:fixed;top:90px;right:0;z-index:1000001">LEFT</button>';
        var pp_right = '<button onclick="myGet(3)" id="ppbtn" style="position:fixed;top:120px;right:0;z-index:1000001">RIGHT</button>';
        body.append(ppbtn);
        body.append(pp_up);
        body.append(pp_down);
        body.append(pp_left);
        body.append(pp_right);
    };
});

function myOff() {
    var ppbtntext = $('#ppbtn').text();
    if (ppbtntext == 'OFF') {
        $('#ppbtn').text('ON');
        $('#pp').css({'z-index' : '-1'});
    } else {
        $('#ppbtn').text('OFF');
        $('#pp').css({'z-index' : '1000000'});
    }
}

function myGet(traget) {
    var str = $('#pp')[0].style.transform;
    var n = str.replace(/[^0-9,]/g, "").split(',');
    var nx = +n[0];
    var ny = +n[1];
    var n_nx;
    var n_ny;

    if (traget == 0) {
        if (ny > 0) {
            n_ny = -ny - 2;
        } else {
            n_ny = ny + 2;
        }
        n_nx = nx;
    } else if (traget == 1) {
        if (ny > 0) {
            n_ny = -ny + 2;
        } else {
            n_ny = ny + 2;
        }
        n_nx = nx;
    }
/*
    if (nx < 0) {

    } else {
        n_nx = +n[1] - 1;
    }

    if (traget == 0) {
        n_nx = +n[0];
        n_ny = +n[1] - 1;
    } else if (traget == 1) {
        n_nx = +n[0];
        ny = +n[1] + 1;
    } else if (traget == 2) {
        n_nx = +n[0] - 1;
        ny = +n[1];
    } else if (traget == 3) { 
        n_nx = +n[0] + 1;
        ny = +n[1];
    }
    */
    $('#pp').css('transform', 'translate(' + n_nx + 'px, ' + n_ny + 'px)');   
}

$('html').keydown(function(){
  var ppbtntext = $('#ppbtn').text();
  if (event.keyCode == 81) {
    if (ppbtntext == 'OFF') {
        $('#ppbtn').text('ON');
        $('#pp').css({'z-index' : '-1'});
    } else {
        $('#ppbtn').text('OFF');
        $('#pp').css({'z-index' : '1000000'});
    }
  }
});