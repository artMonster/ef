$(function() {

  $('[type=tel]').intlTelInput({
    allowExtensions: false,
    autoFormat: true,
    autoHideDialCode: false,
    autoPlaceholder: false,
    defaultCountry: "auto",
      geoIpLookup: function(callback) {
        $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        callback(countryCode);
        });
      },
    nationalMode: false,
    numberType: 'MOBILE',
    preferredCountries: ['ua', 'ru', 'by','us'],
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

    var $rewSlider = $('.rew-slider');
    var $photoSlider = $('.events-slider');

    $rewSlider.slick({
      slidesToShow: 1,
      arrows: true,
      infinite: false,
      adaptiveHeight: false,
      dots: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
          }
        }
      ]
    });

    $photoSlider.slick({
      slidesToShow: 1,
      arrows: true,
      infinite: false,
      adaptiveHeight: false,
      dots: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
          }
        }
      ]
    });

    var $speakerData = [
          {
            name: 'ГИЛ ПЕТЕРСИЛ 0',
            about: 'ЭКСПЕРТ ПО НЕТВОРКИНГУ №1, СТАРТ-АП ГУРУ',
            energy: ['violet'],
            picPath: 'img/sp1.png',
            contList: [
              'Экс-председатель правления ОАО «Ощадбанк»',
              'Доктор экономических наук',
              'Председатель Правления Украинской Межбанковской Валютной Биржи (УМВБ) c октября 2013 года',
              '20-летний опыт работы в сфере развития банковского дела',
              'Международный эксперт в вопросах инвестирования',
              'Научный деятель, преподаватель во многих европейских университетах.',
            ],
          }, {
            name: 'АЛЛА КЛИМЕНКО',
            about: 'ПСИХОЛОГ, СЕРТИФИЦИРОВАННЫЙ КОУЧ, МОТИВАЦИОННЫЙ СПИКЕР',
            energy: ['blue', 'red'],
            picPath: 'img/sp1.png',
            contList: [
              'Занимается тренерской деятельностью более 8 лет.',
              'Сооснователь и ведущий тренер образовательного проекта Upgrade.',
            ],
          }, {
            name: 'АНДРЕЙ ОНИСТРАТ',
            about: 'БИЗНЕСМЕН, БАНКИР, СПОРТСМЕН, МОТИВАТОР',
            energy: ['orange'],
            picPath: 'img/sp2.png',
            contList: [
'Бизнесмен, банкир, вице-президент Федерации триатлона Украины, спортсмен. Отец 5-х детей',
'Первый 1.000.000 $ заработал в 24 года на валютном рынке',
'В кризисном 2009 году стал собственником банка «Национальный кредит»',
'Обладатель награды «100 новых капиталистов Украины» (2011)',
'Кандидат экономических наук, доцент кафедры банковского дела и международных отношений КНЭУ',
'В 2012 был номинирован на звание «Финансист года» в независимом Национальном рейтинге Украины «Человек года»',
'Чемпион Украины по мотогонкам в классе «SBK» и шоссейно-кольцевым мотогонкам в классах SSB (Super Sport Bike) и OPEN (2003)',
'Обладатель Кубка Одессы, призер этапов Открытого Кубка Восточной Европы, бронзовый призер чемпионата Украины в классе "SS-1000" (2004)',
'Неоднократно Участник 5-ти крупнейших мировых марафонов серии World Marathon Majors',
'Трижды полностью проходил IRONMAN. Лучший результат IronMan Frankfurt (триатлон: плавание 3,8 км, велосипед 180 км, бег 42, 195 км) за 9 ч. 58 мин.',
            ],
          }, {
            name: 'ВЯЧЕСЛАВ СМИРНОВ',
            about: 'ЭКСПЕРТ В ОБЛАСТИ СИСТЕМ РАЗВИТИЯ И ОЗДОРОВЛЕНИЯ ЧЕЛОВЕКА',
            energy: ['blue', 'red'],
            picPath: 'img/sp3.png',
            contList: [
'Врач-терапевт. Военный врач. Врач народной и нетрадиционной медицины',
'Сертифицированный Международной федерацией йоги (IYF) инструктор',
'Профессиональный преподаватель йоги и систем оздоровления',
'Директор и владелец Центра йоги и систем оздоровления в Киеве',
'Создатель авторской Школы йоги и систем оздоровления',
'Чемпион мира по йога-спорту',
'Автор многих публикаций и телепрограмм, посвященных здоровью, жизненной эффективности и методам их достижения',
            ],
          }, {
            name: 'ИРИНА ИЩЕНКО',
            about: 'ПСИХОЛОГ, СПЕЦИАЛИСТ ПО УЛУЧШЕНИЮ КАЧЕСТВА ЖИЗНИ',
            energy: ['blue', 'violet'],
            picPath: 'img/sp4.png',
            contList: [
'Автор метода «Деконструкция Матрицы Судьбы»',
'Кандидат психологических наук, член Правления ВГО «Украинская ассоциация системных расстановок»',
'Системный семейный психолог-психотерапевт, сертифицированный специалист IAG WISL (Германия) в области системных и организационных расстановок, гипнотерапии Милтона Эриксона, позитивной психотерапии.',
'Основатель, руководитель и ведущий специалист Высшей Школы Психологии и центра развития человека «Mirra»',
'Организатор приезда в Украину таких мировых светил как: Берт Хеллингер, Станислав Гроф, Мишель Оден',
'Супервайзер международной конференции «Родосвит» и международного конгресса «Родосвит», на который были приглашены ведущие специалисты 7-стран (Украина, Россия, США, Германия, Австрия, Италия, Франция).',
            ],
          }
        ];

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
            
            
            var toForm = this.st.el.attr('data-mfp-src');
            var commentInput = $(toForm).find('[name=comment]');
            var comment = this.st.el.attr('data-form');
            var mTit = $(toForm).find('.mfTitle');

            if (toForm == '#speakers-form') {
                var spId = +this.st.el.attr('data-sp-id');
                commentInput.val(comment + '_' + spId);
                var en = $(toForm).find('.energys');
                var spName = $(toForm).find('.spName');
                var spAbout = $(toForm).find('.spAbout');
                var spPhoto = $(toForm).find('.spPhoto');
                var spList = $(toForm).find('.list');
                en.removeClass('orange blue red violet').addClass($speakerData[spId].energy.join(' '));
                spName.text($speakerData[spId].name);
                spAbout.text($speakerData[spId].about);
                spPhoto.attr('src', $speakerData[spId].picPath);
                spList.html('');
                $speakerData[spId].contList.forEach(function(item, i, arr) {
                  var listData = '<div class="col-sm-12 col-md-12 col-lg-6"><p><i class="fa fa-angle-right" aria-hidden="true"></i> ' + item + '</p></div>';
                  spList.append(listData);
                });
                //spList.append(listData);
              } else {
                commentInput.val(comment);
                if (this.st.el.attr('data-tit')){
                  mTit.html(this.st.el.attr('data-tit'));
                }
              }
            }
          }
        });
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
  var btnSubmit = me.find('[type=submit]');
  var succestext = $('#succestext');

  if (validationsForm(me)){
    me.addClass('send');
    btnSubmit.attr('disabled', true);

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

    if (fieldsDefault['comment'] == 'agents' || fieldsDefault['comment'] == 'partners' ||  fieldsDefault['comment'] == 'sponsor') {
      $.ajax({
        type: "POST",
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSerpOC9vNsdlLNuvR8_zm5wv8K5cUeAABizLos-x6GFxFqBSQ/formResponse',
        dataType: 'xml',
        data: gDataFields,
        statusCode: {
          0: function() {
            me.children('.successtext').css('display', 'block');
            me.children('.sender').css('display', 'none');
            setTimeout(function() {
              me.removeClass('send').trigger("reset");
              me.children('.successtext').css('display', 'none');
            }, 4000);
          }
        }
      });
    } else {

    $.ajax({
      type: "POST",
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSeosxEHoJlpVasAHRhzrEW20_B60mKo58N1CkYnwcANaTyDcA/formResponse',
      dataType: 'xml',
      data: gDataFields,
      statusCode: {
        0: function() {
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
                window.location.href = 'https://forumenergy.pro/ticketsdone/';
                //dataLayer.push({'event': 'sendform'});
                //if (formid.attr('id') == 'exitform') {
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
                //} else {
                 
                //}
              }
            }
          });
        }
      }
    });
    }
    

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
