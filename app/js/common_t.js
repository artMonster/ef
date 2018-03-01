/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');

      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };

}));

$(function() {

    var myDate = new Date();

    if($.cookie("timer")) {
        var myDate = $.cookie("timer");
    } else {
        myDate.setDate(myDate.getDate()+1);
        $.cookie("timer", myDate, {expires: 1})
    };
    function get_timer() {
        var date_t =new Date(myDate);
        var date = new Date();

        var timer = date_t - date;

        if(date_t > date) {
            //day
            var day = parseInt(timer / (24 * 60 * 60 * 1000));

            if(day < 10) {
                day = '0' + day;
            }
            day = day.toString();

            //hours
            var hour = parseInt(timer / (60 * 60 * 1000)) % 24;
            if(hour < 10) {
                hour = '0' + hour;
            }
            hour = hour.toString();

            //min
            var min = parseInt(timer / (60 * 1000)) % 60;
            if(min < 10) {
                min = '0' + min;
            }
            min = min.toString();

            //sec
            var sec = parseInt(timer / (1000)) % 60;
            if(sec < 10) {
                sec = '0' + sec;
            }
            sec = sec.toString();
            $("#day").html("<span id='stop'>" + day +"</span>");
            $("#hour").html("<span id='stop'>" + hour + "</span>");
            $("#min").html( min);
            $("#sec").html(sec);
            setTimeout(get_timer, 1000);
        };
    };
    get_timer();

  var $priceData = [
          {
            pak01: [1700, 1410, 1370, 1240, 1070, 1016],
            pak02: [2000, 1570, 1450, 1340, 1230, 1168],
            pak03: [2500, 1830, 1770, 1650, 1540, 1463],
            pak04: [3400, 2730, 2590, 2460, 2250, 2137],
            pak05: [8700, 7970, 7450, 7320, 6970, 6621],
          }
        ];

  $('.plus').bind("click", function() {
    var pak = $(this).data('pak');
    var numbCont = $(this).prev();
    var numb = +numbCont.text();
    if (+numb >= 1) {
      numb++;
      numbCont.text(numb);
      var percent;
      if (numb >= 5) {
        percent = 10;
      } else if (numb >= 3) {
        percent = 7;
      } else if (numb == 2) {
        percent = 5;
      } else {
        percent = 0;
      }
      var numpak;
      var formTickets = $('.'+pak).closest('.pak').find('form');
      var subm = formTickets.find('[name=push]');
      var numTickets = formTickets.find('[name=numTickets]');
      numTickets.val(numb);
      subm.text('КУПИТЬ БИЛЕТЫ');
      $('.'+pak).find('.txtBtn').text('«КУПИТЬ БИЛЕТЫ»');
      if (pak == 'pak01') {
        $('.'+pak).find('.p01').text($priceData[0].pak01[0]*numb);
        $('.'+pak).find('.p02').text($priceData[0].pak01[1]*numb);
        $('.'+pak).find('.p03').text($priceData[0].pak01[2]*numb);
        $('.'+pak).find('.p04').text($priceData[0].pak01[3]*numb);
        $('.'+pak).find('.priceNow').text($priceData[0].pak01[4]*numb);
        $('.'+pak).find('.priceOnline').text($priceData[0].pak01[5]*numb);
        formTickets.attr('data-price', $priceData[0].pak01[5]*numb);
      } else if (pak == 'pak02') {
        $('.'+pak).find('.p01').text( (($priceData[0].pak02[0] - ((($priceData[0].pak02[0])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p02').text( (($priceData[0].pak02[1] - ((($priceData[0].pak02[1])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p03').text( (($priceData[0].pak02[2] - ((($priceData[0].pak02[2])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p04').text( (($priceData[0].pak02[3] - ((($priceData[0].pak02[3])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceNow').text( (($priceData[0].pak02[4] - ((($priceData[0].pak02[4])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceOnline').text( (($priceData[0].pak02[5] - ((($priceData[0].pak02[5])/100)*percent))*numb).toFixed() );
        formTickets.attr('data-price', (($priceData[0].pak02[5] - ((($priceData[0].pak02[5])/100)*percent))*numb).toFixed() );
      } else if (pak == 'pak03') {
        $('.'+pak).find('.p01').text( (($priceData[0].pak03[0] - ((($priceData[0].pak03[0])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p02').text( (($priceData[0].pak03[1] - ((($priceData[0].pak03[1])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p03').text( (($priceData[0].pak03[2] - ((($priceData[0].pak03[2])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p04').text( (($priceData[0].pak03[3] - ((($priceData[0].pak03[3])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceNow').text( (($priceData[0].pak03[4] - ((($priceData[0].pak03[4])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceOnline').text( (($priceData[0].pak03[5] - ((($priceData[0].pak03[5])/100)*percent))*numb).toFixed() );
        formTickets.attr('data-price', (($priceData[0].pak03[5] - ((($priceData[0].pak03[5])/100)*percent))*numb).toFixed() );
      } else if (pak == 'pak04') {
        $('.'+pak).find('.p01').text( (($priceData[0].pak04[0] - ((($priceData[0].pak04[0])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p02').text( (($priceData[0].pak04[1] - ((($priceData[0].pak04[1])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p03').text( (($priceData[0].pak04[2] - ((($priceData[0].pak04[2])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p04').text( (($priceData[0].pak04[3] - ((($priceData[0].pak04[3])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceNow').text( (($priceData[0].pak04[4] - ((($priceData[0].pak04[4])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceOnline').text( (($priceData[0].pak04[5] - ((($priceData[0].pak04[5])/100)*percent))*numb).toFixed() );
        formTickets.attr('data-price', (($priceData[0].pak04[5] - ((($priceData[0].pak04[5])/100)*percent))*numb).toFixed() );
      } else if (pak == 'pak05') {
        $('.'+pak).find('.p01').text($priceData[0].pak05[0]*numb);
        $('.'+pak).find('.p02').text($priceData[0].pak05[1]*numb);
        $('.'+pak).find('.p03').text($priceData[0].pak05[2]*numb);
        $('.'+pak).find('.p04').text($priceData[0].pak05[3]*numb);
        $('.'+pak).find('.priceNow').text($priceData[0].pak05[4]*numb);
        $('.'+pak).find('.priceOnline').text($priceData[0].pak05[5]*numb);
        formTickets.attr('data-price', $priceData[0].pak05[5]*numb);
      }

    }
  });

  $('.minus').bind("click", function() {
    var pak = $(this).data('pak');
    var numbCont = $(this).next();
    var numb = +numbCont.text();
    if (+numb != 1) {
      numb--;
     //$(this).closest('.ticket-item').find('[name=numTickets]').val(thisT);
      numbCont.text(numb);
      var percent;
      if (numb >= 5) {
        percent = 10;
      } else if (numb >= 3) {
        percent = 7;
      } else if (numb == 2) {
        percent = 5;
      } else {
        percent = 0;
      }
      var numpak;
      var formTickets = $('.'+pak).closest('.pak').find('form');
      var subm = formTickets.find('[name=push]');
      var numTickets = formTickets.find('[name=numTickets]');
      numTickets.val(numb);
      if (numb == 1) {
        $('.'+pak).find('.txtBtn').text('«КУПИТЬ БИЛЕТ»');
        subm.text('КУПИТЬ БИЛЕТ');
      }
      if (pak == 'pak01') {
        $('.'+pak).find('.p01').text($priceData[0].pak01[0]*numb);
        $('.'+pak).find('.p02').text($priceData[0].pak01[1]*numb);
        $('.'+pak).find('.p03').text($priceData[0].pak01[2]*numb);
        $('.'+pak).find('.p04').text($priceData[0].pak01[3]*numb);
        $('.'+pak).find('.priceNow').text($priceData[0].pak01[4]*numb);
        $('.'+pak).find('.priceOnline').text($priceData[0].pak01[5]*numb);
        formTickets.attr('data-price', $priceData[0].pak01[5]*numb);
      } else if (pak == 'pak02') {
        $('.'+pak).find('.p01').text( (($priceData[0].pak02[0] - ((($priceData[0].pak02[0])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p02').text( (($priceData[0].pak02[1] - ((($priceData[0].pak02[1])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p03').text( (($priceData[0].pak02[2] - ((($priceData[0].pak02[2])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p04').text( (($priceData[0].pak02[3] - ((($priceData[0].pak02[3])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceNow').text( (($priceData[0].pak02[4] - ((($priceData[0].pak02[4])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceOnline').text( (($priceData[0].pak02[5] - ((($priceData[0].pak02[5])/100)*percent))*numb).toFixed() );
        formTickets.attr('data-price', (($priceData[0].pak02[5] - ((($priceData[0].pak02[5])/100)*percent))*numb).toFixed() );
      } else if (pak == 'pak03') {
        $('.'+pak).find('.p01').text( (($priceData[0].pak03[0] - ((($priceData[0].pak03[0])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p02').text( (($priceData[0].pak03[1] - ((($priceData[0].pak03[1])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p03').text( (($priceData[0].pak03[2] - ((($priceData[0].pak03[2])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p04').text( (($priceData[0].pak03[3] - ((($priceData[0].pak03[3])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceNow').text( (($priceData[0].pak03[4] - ((($priceData[0].pak03[4])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceOnline').text( (($priceData[0].pak03[5] - ((($priceData[0].pak03[5])/100)*percent))*numb).toFixed() );
        formTickets.attr('data-price', (($priceData[0].pak03[5] - ((($priceData[0].pak03[5])/100)*percent))*numb).toFixed() );
      } else if (pak == 'pak04') {
        $('.'+pak).find('.p01').text( (($priceData[0].pak04[0] - ((($priceData[0].pak04[0])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p02').text( (($priceData[0].pak04[1] - ((($priceData[0].pak04[1])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p03').text( (($priceData[0].pak04[2] - ((($priceData[0].pak04[2])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p04').text( (($priceData[0].pak04[3] - ((($priceData[0].pak04[3])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceNow').text( (($priceData[0].pak04[4] - ((($priceData[0].pak04[4])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceOnline').text( (($priceData[0].pak04[5] - ((($priceData[0].pak04[5])/100)*percent))*numb).toFixed() );
        formTickets.attr('data-price', (($priceData[0].pak04[5] - ((($priceData[0].pak04[5])/100)*percent))*numb).toFixed() );
      } else if (pak == 'pak05') {
        $('.'+pak).find('.p01').text($priceData[0].pak05[0]*numb);
        $('.'+pak).find('.p02').text($priceData[0].pak05[1]*numb);
        $('.'+pak).find('.p03').text($priceData[0].pak05[2]*numb);
        $('.'+pak).find('.p04').text($priceData[0].pak05[3]*numb);
        $('.'+pak).find('.priceNow').text($priceData[0].pak05[4]*numb);
        $('.'+pak).find('.priceOnline').text($priceData[0].pak05[5]*numb);
        formTickets.attr('data-price', $priceData[0].pak05[5]*numb );
      }
    }
  });

  $('.anchor').bind("click", function() {
    var btn = $(this).data('href');
    var target = $(btn);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1500);
    return false;
  });

  $(document).ready(function() {
    if (localStorage.name && localStorage.email && localStorage.phone)  {
        $('[name="tName[1]"]').val(localStorage.name);
        $('[name="tEmail[1]"]').val(localStorage.email);
        $('[name="tPhone[1]"]').val(localStorage.phone);
    }
    $('.popup-with-zoom-anim').magnificPopup({
          type: 'inline',
          fixedContentPos: true,
          fixedBgPos: true,
          overflowY: 'auto',
          closeBtnInside: true,
          preloader: false,
          midClick: true,
          removalDelay: 300,
          mainClass: 'mfp-zoom-in',
          tClose: 'Закрыть',
          callbacks: {
          beforeOpen: function() {
            this.st.mainClass = this.st.el.attr('data-effect');
            }
          }
        });
   
  }); // document.ready

  $('[name=push]').bind('click', function(e){
        var form = $(this).closest('form'); 
        var ttt = form.find('[class=ttt]').val();
        var numb = form.find('[name=numTickets]').val();
        if (+numb > 1) {
            for (var i = 2; i < +numb + 1; i++) {
            form.append('<input name="types['+i+']" type="hidden" value="'+ ttt +'">')
        }
    }
    //dataLayer.push({'event': 'send_form'});
  });

});
