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
      $('.'+pak).find('.prices').next().text('КУПИТЬ БИЛЕТЫ');
      if (pak == 'pak01') {
        $('.'+pak).find('.p01').text($priceData[0].pak01[0]*numb);
        $('.'+pak).find('.p02').text($priceData[0].pak01[1]*numb);
        $('.'+pak).find('.p03').text($priceData[0].pak01[2]*numb);
        $('.'+pak).find('.p04').text($priceData[0].pak01[3]*numb);
        $('.'+pak).find('.priceNow').text($priceData[0].pak01[4]*numb);
        $('.'+pak).find('.priceOnline').text($priceData[0].pak01[5]*numb);
      } else if (pak == 'pak02') {
        $('.'+pak).find('.p01').text( (($priceData[0].pak02[0] - ((($priceData[0].pak02[0])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p02').text( (($priceData[0].pak02[1] - ((($priceData[0].pak02[1])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p03').text( (($priceData[0].pak02[2] - ((($priceData[0].pak02[2])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p04').text( (($priceData[0].pak02[3] - ((($priceData[0].pak02[3])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceNow').text( (($priceData[0].pak02[4] - ((($priceData[0].pak02[4])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceOnline').text( (($priceData[0].pak02[5] - ((($priceData[0].pak02[5])/100)*percent))*numb).toFixed() );
      } else if (pak == 'pak03') {
        $('.'+pak).find('.p01').text( (($priceData[0].pak03[0] - ((($priceData[0].pak03[0])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p02').text( (($priceData[0].pak03[1] - ((($priceData[0].pak03[1])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p03').text( (($priceData[0].pak03[2] - ((($priceData[0].pak03[2])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p04').text( (($priceData[0].pak03[3] - ((($priceData[0].pak03[3])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceNow').text( (($priceData[0].pak03[4] - ((($priceData[0].pak03[4])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceOnline').text( (($priceData[0].pak03[5] - ((($priceData[0].pak03[5])/100)*percent))*numb).toFixed() );
      } else if (pak == 'pak04') {
        $('.'+pak).find('.p01').text( (($priceData[0].pak04[0] - ((($priceData[0].pak04[0])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p02').text( (($priceData[0].pak04[1] - ((($priceData[0].pak04[1])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p03').text( (($priceData[0].pak04[2] - ((($priceData[0].pak04[2])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.p04').text( (($priceData[0].pak04[3] - ((($priceData[0].pak04[3])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceNow').text( (($priceData[0].pak04[4] - ((($priceData[0].pak04[4])/100)*percent))*numb).toFixed() );
        $('.'+pak).find('.priceOnline').text( (($priceData[0].pak04[5] - ((($priceData[0].pak04[5])/100)*percent))*numb).toFixed() );

      } else if (pak == 'pak05') {
        $('.'+pak).find('.p01').text($priceData[0].pak05[0]*numb);
        $('.'+pak).find('.p02').text($priceData[0].pak05[1]*numb);
        $('.'+pak).find('.p03').text($priceData[0].pak05[2]*numb);
        $('.'+pak).find('.p04').text($priceData[0].pak05[3]*numb);
        $('.'+pak).find('.priceNow').text($priceData[0].pak05[4]*numb);
        $('.'+pak).find('.priceOnline').text($priceData[0].pak05[5]*numb);
      }
    }
  });

  $('.minus').bind("click", function() {
    var pak = $(this).data('pak');
    var numbCont = $(this).next();
    var numb = +numbCont.text();
    if (+numb != 1) {
      numb--;
      numbCont.text(numb);
      var numpak;
      if (numb == 1) {
        $('.'+pak).find('.prices').next().text('КУПИТЬ БИЛЕТ');
      }
      if (pak == 'pak01') {
        $('.'+pak).find('.p01').text($priceData[0].pak01[0]*numb);
        $('.'+pak).find('.p02').text($priceData[0].pak01[1]*numb);
        $('.'+pak).find('.p03').text($priceData[0].pak01[2]*numb);
        $('.'+pak).find('.p04').text($priceData[0].pak01[3]*numb);
        $('.'+pak).find('.priceNow').text($priceData[0].pak01[4]*numb);
        $('.'+pak).find('.priceOnline').text($priceData[0].pak01[5]*numb);
      } else if (pak == 'pak02') {
        $('.'+pak).find('.p01').text($priceData[0].pak02[0]*numb);
        $('.'+pak).find('.p02').text($priceData[0].pak02[1]*numb);
        $('.'+pak).find('.p03').text($priceData[0].pak02[2]*numb);
        $('.'+pak).find('.p04').text($priceData[0].pak02[3]*numb);
        $('.'+pak).find('.priceNow').text($priceData[0].pak02[4]*numb);
        $('.'+pak).find('.priceOnline').text($priceData[0].pak02[5]*numb);
      } else if (pak == 'pak03') {
        $('.'+pak).find('.p01').text($priceData[0].pak03[0]*numb);
        $('.'+pak).find('.p02').text($priceData[0].pak03[1]*numb);
        $('.'+pak).find('.p03').text($priceData[0].pak03[2]*numb);
        $('.'+pak).find('.p04').text($priceData[0].pak03[3]*numb);
        $('.'+pak).find('.priceNow').text($priceData[0].pak03[4]*numb);
        $('.'+pak).find('.priceOnline').text($priceData[0].pak03[5]*numb);
      } else if (pak == 'pak04') {
        $('.'+pak).find('.p01').text($priceData[0].pak04[0]*numb);
        $('.'+pak).find('.p02').text($priceData[0].pak04[1]*numb);
        $('.'+pak).find('.p03').text($priceData[0].pak04[2]*numb);
        $('.'+pak).find('.p04').text($priceData[0].pak04[3]*numb);
        $('.'+pak).find('.priceNow').text($priceData[0].pak04[4]*numb);
        $('.'+pak).find('.priceOnline').text($priceData[0].pak04[5]*numb);
      } else if (pak == 'pak05') {
        $('.'+pak).find('.p01').text($priceData[0].pak05[0]*numb);
        $('.'+pak).find('.p02').text($priceData[0].pak05[1]*numb);
        $('.'+pak).find('.p03').text($priceData[0].pak05[2]*numb);
        $('.'+pak).find('.p04').text($priceData[0].pak05[3]*numb);
        $('.'+pak).find('.priceNow').text($priceData[0].pak05[4]*numb);
        $('.'+pak).find('.priceOnline').text($priceData[0].pak05[5]*numb);
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

   
  }); // document.ready

});

$(function() {

  var input = $('input');
  var form = $('form');
  var patternHidden = /(\D)+[^0-9]{2,}/i;
  var patternText = /(\D)+[^0-9]{2,}/i;
  var patternEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
  var patternTel = /([+()0-9 ]){9,18}/i;
  var errorFieldsMessage = {
    text : ' Имя',
    tel : ' Телефон',
    email : ' Ваш лучший e-mail',
  };

  function validationsField(field) {

    var fieldValue = field[0].value;
    var fieldType = field[0].type;

    if (fieldType == 'email') {
      var pattern = patternEmail;  
    } else if (fieldType == 'text') {
      var pattern = patternText;
    } else if (fieldType == 'tel') {
      var pattern = patternTel;
    } else if (fieldType == 'hidden') {
      return true; //var pattern = patternHidden;
    }
    return pattern.test(fieldValue);
  }

function validationsForm(form) {

  var fields = form.find('input');
  var errorTags = form.find('.error-message');
  var numberIsValid = 0;
  var errorMessage = [];

  fields.each(function() {
    var field = $(this);
    var errorFieldType = field[0].type;
    if (validationsField(field)) {
      field.removeClass('error').addClass('accept');
      numberIsValid++;
    } else {
      if (errorFieldType == 'text') {
        errorMessage.push(errorFieldsMessage.text);
      } else if (errorFieldType == 'tel'){
        errorMessage.push(errorFieldsMessage.tel);
      } else if (errorFieldType == 'email') {
        errorMessage.push(errorFieldsMessage.email);
      }
      field.addClass('error');
    }
  });

  errorMessage.length > 0 ? errorTags.html('<span>Некорректное заполнение полей: <br><b>' + errorMessage + '</b></span>') : null;
  return fields.length == numberIsValid;
}

function keyupEvent() {

  var field = $(this);
  var errorTags = field.closest('form').find('.error-message');
  errorTags.html('');

  field.hasClass('error') ? field.removeClass('error') : false;
  validationsField(field) ? field.addClass('accept') : field.removeClass('accept');

}

function submitForm() {



  var me = $(this);
  var dataFields = me.find('input');
  var exitValue = me.find('[name=package]').val();
  var btnSubmit = me.find('[type=submit]');

  if (validationsForm(me)){
    me.addClass('send');
    btnSubmit.attr('disabled', true);
    var formid = me.closest('.modalWrapper');
    var find_b = me.closest('.container');
    var fondy_b = find_b.find('.fondy_b');

    var fieldsDefault = {
      'name' : me.find('input[name=name]').val(),
      'custom_mob_phone' : me.find('input[name=phone]').val(),
      'email' : me.find('input[name=email]').val(),
      'campaign_token' : me.find('input[name=gr_comp]').val(),
      'start_day' : '0',
      'comment' : me.find('input[name=comment]').val(),
      'utm_source' : me.find('input[name=utm_source]').val(),
      'utm_campaign' : me.find('input[name=utm_campaign]').val(),
      'utm_medium' : me.find('input[name=utm_medium]').val(),
      'utm_term' : me.find('input[name=utm_term]').val(),
      'utm_content' : me.find('input[name=utm_content]').val(),
    }

    var gDataFields = {
      'entry.1378648537': me.find('input[name=name]').val(),
      'entry.906441403': me.find('input[name=phone]').val(),
      'entry.1561585642': me.find('input[name=email]').val(),
      'entry.1304558152' : 'utm_source=' + me.find('input[name=utm_source]').val() + ';utm_campaign=' + me.find('input[name=utm_campaign]').val() + ';utm_medium=' + me.find('input[name=utm_medium]').val() + ';utm_term=' + me.find('input[name=utm_term]').val() + ';utm_content=' + me.find('input[name=utm_content]').val(),
      'entry.2147320007' : me.find('input[name=comment]').val(),
    };

    localStorage.name = fieldsDefault['name'];
    localStorage.phone = fieldsDefault['custom_mob_phone'];
    localStorage.email = fieldsDefault['email'];
    //localStorage.sales = fieldsDefault['sales'];
    //localStorage.jscd = JSON.stringify(jscd);

    $.ajax({
      type: "POST",
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSeosxEHoJlpVasAHRhzrEW20_B60mKo58N1CkYnwcANaTyDcA/formResponse',
      dataType: 'xml',
      data: gDataFields,
      statusCode: {
        0: function() {
          console.log('done');
        }
      }
    });
    $.ajax({
      type: 'POST',
      url: 'crm/send.php',
      dataType: 'json',
      data: fieldsDefault,
      statusCode: {
        200: function(msg) {
          console.log('crm:' + msg);
          $.ajax({
            type: 'POST',
            url: 'https://app.getresponse.com/add_subscriber.html',
            dataType: 'json',
            data: fieldsDefault,
            statusCode: {
              0: function(msg) {
                console.log('gr:' + msg);
                //dataLayer.push({'event': 'sendform'});
                if (formid.attr('id') == 'exitform') {
                  //succestext.addClass('succesok');
                  //loader.css('display','none');
                  //proccesbar.animate({
                  //width: "100%"
                  //}, 4000, function() {
                    //proccesbar.attr('style','');
                    //succestext.removeClass('succesok');
                    //me.removeClass('send').trigger("reset");
                    //if ($('.g-modal-wrapper').hasClass('modal-open')) {
                    //  $('.g-modal-wrapper').removeClass('modal-open').attr('style','');
                    //  $('html').removeClass('g-modal-html');
                    //}              
                    //btnSubmit.attr('disabled', false);
                  //});
                } else {
                  window.location.href = 'https://forumenergy.pro/ticketsdone/';
                }
              }
            }
          });
        }
      }
    });

/*
    $.ajax({
        type: 'POST',
        url: '../amo/amo_add_contact.php',
        dataType: 'json',
        data: fieldsDefault,
        statusCode: {
          200: function(msg) {
            //console.log(msg);
            var msg1 = msg;
            $.ajax({
              type: 'POST',
              url: '../amo/gr_add_contact.php',
              dataType: 'json',
              data: fieldsDefault,
              statusCode: {
                200: function(msg) {
                  //console.log(msg);
                  var msg2 = msg;
                  var gDataFIelds = {
                    'entry.1378648537': me.find('input[name=name]').val(),
                    'entry.906441403': me.find('input[name=phone]').val(),
                    'entry.1561585642': me.find('input[name=email]').val(),
                    'entry.2147320007': me.find('input[name=l_name]').val(),
                    'entry.1304558152': me.find('input[name=utm]').val(),
                    'entry.1739428933': JSON.stringify(msg1) + ' / ' + JSON.stringify(msg2),
                  };
                  $.ajax({
                    type: "POST",
                    url: 'https://docs.google.com/forms/d/e/    /formResponse',
                    dataType: 'xml',
                    data: gDataFIelds,
                    statusCode: {
                      0: function() {
                        //window.location.href = '';
                      }
                    }
                  });
                }
              }
          });
          }
        }
    });
    */
  }
}

input.keyup(keyupEvent).focus(keyupEvent);
form.submit(submitForm);

  
  
  
});
