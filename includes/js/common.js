setTimeout(function(){
  checkTagsWrap($(".tags-wrap"), parseInt($(".tags-wrap .tags").css("margin-left")));
}, 100);

$(".btns .btn-right").click(function(){
  var wrap = $(this).closest(".tags-wrap");
  if ($("body.profile").length > 0) {
    wrap = $(".container", wrap);
  }
  var tags = $(".tags", wrap);

  var shift = parseInt(tags.css("margin-left"));
  shift -= 200;
  if (shift < -1*(tags.width()-wrap.width())) {shift = -1*(tags.width()-wrap.width());}

  tags.css("margin-left", shift+"px");
  checkTagsWrap(wrap, shift);
});
$(".btns .btn-left").click(function(){
  var wrap = $(this).closest(".tags-wrap");
  if ($("body.profile").length > 0) {
    wrap = $(".container", wrap);
  }
  var tags = $(".tags", wrap);

  var shift = parseInt(tags.css("margin-left"));
  shift += 200;
  if (shift > 0) {shift = 0;}

  tags.css("margin-left", shift+"px");
  checkTagsWrap(wrap, shift);
});

function checkTagsWrap (el, shift) {
  var size = $(".tags", el).width();
  if ($("body.profile").length > 0) {
    el = $(".container", $(".tags-wrap"));
  }

  if (shift > -1*(size-$(el).width())) {
    $(".btn-right", el.closest(".tags-wrap")).addClass("visible");
  } else {
    $(".btn-right", el.closest(".tags-wrap")).removeClass("visible");
  }
  if (shift < 0) {
    $(".btn-left", el.closest(".tags-wrap")).addClass("visible");
  } else {
    $(".btn-left", el.closest(".tags-wrap")).removeClass("visible");
  }
}

$(window).ready(function(){
  checkVW();
  $(".header input").blur();
  if ($('.auto-suggestion').length > 0) {
    $('.auto-suggestion').perfectScrollbar({
      wheelSpeed: 1
    });
  }
  if ($(".stories").length > 0) {
    $(".stories").slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
      focusOnSelect: true
    });
  }
  if ($(".courses-list").length > 0) {
    $(".courses-list").slick({
      dots: false,
      infinite: false,
      slidesToShow: 1,
      variableWidth: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 560,
          settings: {
            centerMode: true
          }
        }
      ]
    });

    $(".courses-list .slick-next").hover(function(){
      $(".slick-track", $(this).closest(".courses-list")).css("margin-left", "-15px");
    },function(){
      $(".slick-track", $(this).closest(".courses-list")).css("margin-left", "0px");
    });

    $(".courses-list .slick-prev").hover(function(){
      $(".slick-track", $(this).closest(".courses-list")).css("margin-left", "15px");
    },function(){
      $(".slick-track", $(this).closest(".courses-list")).css("margin-left", "0px");
    });
  }
  if ($(".tripple-slider").length > 0) {
    $(".tripple-slider").slick({
      dots: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      variableWidth: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1275,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 799,
          settings: {
            slidesToShow: 1,
            centerMode: true
          }
        }
      ]
    });
    $(".tripple-slider .slick-next").hover(function(){
      $(".slick-track", $(this).closest(".tripple-slider")).css("margin-left", "-15px");
    },function(){
      $(".slick-track", $(this).closest(".tripple-slider")).css("margin-left", "0px");
    });

    $(".tripple-slider .slick-prev").hover(function(){
      $(".slick-track", $(this).closest(".tripple-slider")).css("margin-left", "15px");
    },function(){
      $(".slick-track", $(this).closest(".tripple-slider")).css("margin-left", "0px");
    });
  }
  $(window).scroll();
});
$(window).resize(function(){
  $(".main-settings .radio, .input .radio").each(function(){
    var width = $("ul li.active", this).outerWidth();
    var x = $("ul li.active", this).position().left;
    $(".checker", this).css("width", (width)+"px").css("left", x+"px");
  });
  checkVW();
  if($("#bgSound").length > 0) {
    resetBgSoundPos();
  }
});

function checkVW () {
  if (!$(".blog-search .form-reset").hasClass("reset-view")) {$(".blog-search .form-reset ul").css("width", "auto").css("width", $(".blog-search .form-reset ul").width()+"px");}
  if($(window).width() > $(window).height()) {
    $(".main-menu").addClass("vw");
  } else {
    $(".main-menu").removeClass("vw");
  }
}

$(".head .icon-hamburger").click(function(){
  if($(this).hasClass("active")){
    $(this).removeClass("active");
    $(".main-menu").removeClass("active");
  } else {
    $(this).addClass("active");
    $(".main-menu").addClass("active");
  }
});

$(".header input").focus(function(){
  $(this).closest(".form-table-wrap").children(".form-reset").addClass("reset-view");
});
$(".header input").blur(function(){
  $('.auto-suggestion').slideUp(250);
  if ($.trim($(this).val()).length <= 0) {
    $(this).closest(".form-table-wrap").children(".form-reset").removeClass("reset-view");
  }
});
$(".form-reset .input-reset").click(function(){
  $(this).closest(".form-table-wrap").find("input").blur();
});

$(".form-table-wrap .input input").keyup(function(){
  $('.auto-suggestion').slideDown(250, function(){
    $('.auto-suggestion').perfectScrollbar('update');
  });
});

var articleSocialOffetTop, articleMaxOffsetTop = null, articleStayOffsetTop = null, socialIsBottom = false;
$(window).scroll(function(e){
  if ($("*[data-fixedable]").length > 0) {
    var windowOffset = $(document).scrollTop();
    if (articleMaxOffsetTop == null || articleStayOffsetTop == null) {
      articleMaxOffsetTop = $("*[data-fixedable]").parent().offset().top + $("*[data-fixedable]").parent().height() - 70 - $("*[data-fixedable]").height();
    }

    if (windowOffset+70 >= $("*[data-fixedable]").offset().top && !$("*[data-fixedable]").hasClass("fixed") && !socialIsBottom) {
      articleSocialOffetTop = $("*[data-fixedable]").offset().top;
      $("*[data-fixedable]").addClass("fixed");
    } else if (socialIsBottom && windowOffset+70 <= $("*[data-fixedable]").offset().top) {
      socialIsBottom = false;
      $("*[data-fixedable]").addClass("fixed").css("top", "0px");
    } else if (windowOffset+70 < articleSocialOffetTop && $("*[data-fixedable]").hasClass("fixed")) {
      $("*[data-fixedable]").removeClass("fixed");
    } else if (windowOffset > articleMaxOffsetTop) {
      socialIsBottom = true;
      $("*[data-fixedable]").removeClass("fixed").css("top", ($("*[data-fixedable]").parent().height() - $("*[data-fixedable]").height())+"px");
    }
  }
});

$(".help-question").click(function(){
  var el = $(this).closest("li");
  if (el.hasClass("open")){
    el.removeClass("open");
    $(".help-answer", el).slideUp(200);
  } else {
    $(".help-content ul li.open .help-answer").slideUp(200);
    $(".help-content ul li.open").removeClass("open");
    el.addClass("open");
    $(".help-answer", el).slideDown(200);
  }
});

$("form").submit(function(e){
  var failed = false;
  var formSteps = false;
  var elements = $("input[data-type], textarea[data-type]", this);
  if ($(this)[0].hasAttribute("data-steps")) {
    formSteps = true;
    elements = $(".windows li.active input[data-type], .windows li.active textarea[data-type]", this);
  }

  elements.each(function(){
    if (!checkVal($(this))) {
      failed = true;
      e.preventDefault();
    }
  });

  if (formSteps) {
    if (!failed) {
      var steps = parseInt($(this).attr("data-steps"));
      var currentStep = parseInt($(this).attr("data-step"));
      if (currentStep < steps) {
        $(".windows li", this).removeClass("active");
        $(".windows li[data-index=\""+(currentStep+1)+"\"]", this).addClass("active");
        $(this).attr("data-step", (currentStep+1));
        $("ul[data-list] li", this).removeClass("active");
        $("ul[data-list] li[data-index=\""+(currentStep+1)+"\"]",this).addClass("go").addClass("active");
        e.preventDefault();
      }
    }
  }
});

$("form ul[data-list] li").click(function(){
  if ($(this).hasClass("go")) {
    var form = $(this).closest("form");
    var currentStep = $(this).attr("data-index");
    form.attr("data-step", (currentStep));
    $(".windows li", form).removeClass("active");
    $(".windows li[data-index=\""+(currentStep)+"\"]", form).addClass("active");
    $("ul[data-list] li", form).removeClass("active");
    $("ul[data-list] li[data-index=\""+(currentStep)+"\"]", form).addClass("go").addClass("active");
  }
});

$("input, textarea").focus(function(e){
  $(this).closest(".input").removeClass("failed").removeAttr("data-cause");
});

$("input, textarea").blur(function(){
  checkVal($(this), false);
});

function checkVal (element, err = true) {
  var failed = false;

  if (!isNaN(parseInt(element.attr("min"))) && element.val().length < parseInt(element.attr("min"))) {
    failed = true;
    if(err){element.closest(".input").attr("data-cause", "Wrong number of characters").addClass("failed");}
  }

  if (element.attr("data-type") == "email") {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(regex.test(String(element.val()).toLowerCase()))){
      if(err){element.closest(".input").attr("data-cause", "There is no such email").addClass("failed");}
      failed = true;
    }
  }

  if ($.trim(element.val()) == "") {
    if(err){element.closest(".input").attr("data-cause", "It is required field").addClass("failed");}
    failed = true;
  }

  if (failed) {
    element.closest(".input").removeClass("ok");
    return false;
  }

  element.closest(".input").addClass("ok");
  return true;
}

$("#select .selected").click(function(e){
  var select = $(this).closest("#select");
  if (select.hasClass("active")){
    select.removeClass("active");
    $("#mainBack").removeClass("active");
  } else {
    select.addClass("active");
    $("#mainBack").addClass("active");
  }
});

$("#select ul li").click(function(){
  $("#select ul li").removeAttr("selected");
  $(this).attr("selected", "");
  var text = $(this).text();
  var select = $(this).closest("#select");
  $(".selected", select).text(text);
  select.removeClass("active");
  $("#mainBack").removeClass("active");

  if (select[0].hasAttribute("data-update")) {
    var arr = JSON.parse(select.attr("data-update"));
    var vals = JSON.parse($(this).attr("data-update"));
    for (var i=0; i<arr.length; i++) {
      if ($("#"+arr[i]).is("input")) {
        $("#"+arr[i]).val(vals[i]);
        continue;
      }
      $("#"+arr[i]).text(vals[i]);
    }
  }
});

$("#mainBack").click(function(){
	$("#mainBack").removeClass("active");
  $("#player").removeClass("view");

  $("#select").removeClass("active");
	if ($(".icon-hamburger").hasClass("active")) {$(".icon-hamburger").click();}
});

$(".gifts .gift").click(function(e){
  var select = $(this).closest(".gifts");
  $(".gift", select).removeAttr("selected");
  $(this).attr("selected", "");
  if (select[0].hasAttribute("data-update")) {
    var arr = JSON.parse(select.attr("data-update"));
    var vals = JSON.parse($(this).attr("data-update"));

    for (var i=0; i<arr.length; i++) {
      if ($("#"+arr[i]).is("input")) {
        $("#"+arr[i]).val(vals[i]);
        continue;
      } else if ($("#"+arr[i])[0].hasAttribute("data-class")) {
        $("#"+arr[i]).attr("class", $("#"+arr[i]).attr("data-class"));
        $("#"+arr[i]).addClass(vals[i]);
        continue;
      } else if ($("#"+arr[i])[0].hasAttribute("data-attr")) {
        $("#"+arr[i]).attr($("#"+arr[i]).attr("data-attr"), vals[i]);
        continue;
      } else if ($("#"+arr[i]).is("img")) {
        $("#"+arr[i]).attr("src", vals[i]);
        continue;
      }
      $("#"+arr[i]).text(vals[i]);
    }
  }
});


// LANDINGS
var typewriterData = ["reduce stress", "improve sleep", "increase concentration"];
var sliderTime = 250;

function typewriter(i) {
  if (i >= typewriterData.length) {
    i = 0;
  }

  $("#typewriter").text("");
  $("#typewriter").removeClass("select");

  var word = "";
  var c = 0;
  var writeWord = setInterval(function () {
    if (c >= typewriterData[i].length) {
      clearInterval(writeWord);
      setTimeout(function() {
        $("#typewriter").addClass("select");
        setTimeout(function() {
          typewriter(++i);
        },300);
      }, 2000);
      return;
    }
    word += typewriterData[i][c++];
    $("#typewriter").text(word);
  }, 75);
}

typewriter(0);

var movement;

function setNextSlide(time = 200, i = 0) {
  clearInterval(movement);
  var activeId = parseInt($('#sliderView .slides .slide.active').attr("data-id"));
  $('#sliderView .slides .slide.active').removeClass("active");
  var slidesCount = $('#sliderView .slides .slide').length;
  var nextActive = activeId + 1;

  if (nextActive > slidesCount) { nextActive = 1; }
  $('#sliderView .slides .slide[data-id="'+nextActive+'"]').addClass("active");

  var last = nextActive+1;
  if (last > slidesCount) {last = 1;}

  var timeline = 0;
  var scale, opcaity, scale2, opacity2, activeLeft, activeLeft2, opacity3, scale3, activeLeft3;

  var x0 = 0, y0 = 0, x1 = (55*time)/506, y1 = -55, x2 = ((441*time)/506)+(x1/2), y2 = 386, x3 = time, y3 = 376;
  var x20 = 0, y20 = 251, x21 = (42*time)/506, y21 = 271, x22 = time, y22 = 0;
  var sx0 = 0, sy0 = 1, sx1 = (55*time)/506, sy1 = 0.9, sx2 = (x2-x1)/2+(sx1/2), sy2 = 0.68, sx3 = time, sy3 = 0.703;
  var ox0 = 0, oy0 = 1, ox1 = (55*time)/506, oy1 = 0.9, ox2 = (x2-x1)/2+(sx1/2.5), oy2 = 0.45, ox3 = time, oy3 = 0.1;

  movement = setInterval(function() {
    if (Math.abs(timeline) >= Math.abs(time)) {
      clearInterval(movement);
      if (i <= 0) {
        return;
      } else {
        setNextSlide(time, --i);
      }
    }
    if (timeline >= x1-1 && timeline <= x1+1) {
      $('#sliderView .slides .slide[data-id="'+activeId+'"]').css("z-index", "1");
      $('#sliderView .slides .slide[data-id="'+nextActive+'"]').css("z-index", "3");
      $('#sliderView .slides .slide[data-id="'+last+'"]').css("z-index", "2");
    }

    timeline += 1;

    activeLeft = y0*(((timeline-x1)*(timeline-x2)*(timeline-x3))/((x0-x1)*(x0-x2)*(x0-x3)))+y1*(((timeline-x0)*(timeline-x2)*(timeline-x3))/((x1-x0)*(x1-x2)*(x1-x3)))+y2*(((timeline-x1)*(timeline-x0)*(timeline-x3))/((x2-x0)*(x2-x1)*(x2-x3)))+y3*(((timeline-x0)*(timeline-x1)*(timeline-x2))/((x3-x0)*(x3-x1)*(x3-x2)));
    activeLeft2 = y20*(((timeline-x21)*(timeline-x22))/((x20-x21)*(x20-x22)))+y21*(((timeline-x20)*(timeline-x22))/((x21-x20)*(x21-x22)))+y22*(((timeline-x21)*(timeline-x20))/((x22-x20)*(x22-x21)));
    activeLeft3 = (-125/time)*timeline+376;

    scale = sy0*(((timeline-sx1)*(timeline-sx2)*(timeline-sx3))/((sx0-sx1)*(sx0-sx2)*(sx0-sx3)))+sy1*(((timeline-sx0)*(timeline-sx2)*(timeline-sx3))/((sx1-sx0)*(sx1-sx2)*(sx1-sx3)))+sy2*(((timeline-sx1)*(timeline-sx0)*(timeline-sx3))/((sx2-sx0)*(sx2-sx1)*(sx2-sx3)))+sy3*(((timeline-sx0)*(timeline-sx1)*(timeline-sx2))/((sx3-sx0)*(sx3-sx1)*(sx3-sx2)));
    scale2 = (0.127/time)*timeline+0.873;
    scale3 = (0.17/time)*timeline+0.703;

    opacity = oy0*(((timeline-ox1)*(timeline-ox2)*(timeline-ox3))/((ox0-ox1)*(ox0-ox2)*(ox0-ox3)))+oy1*(((timeline-ox0)*(timeline-ox2)*(timeline-ox3))/((ox1-ox0)*(ox1-ox2)*(ox1-ox3)))+oy2*(((timeline-ox1)*(timeline-ox0)*(timeline-ox3))/((ox2-ox0)*(ox2-ox1)*(ox2-ox3)))+oy3*(((timeline-ox0)*(timeline-ox1)*(timeline-ox2))/((ox3-ox0)*(ox3-ox1)*(ox3-ox2)));
    opacity2 = (0.7/time)*timeline+0.3;
    opacity3 = (0.2/time)*timeline+0.1;

    $('#sliderView .slides .slide[data-id="'+activeId+'"]').css("left", activeLeft+"px");
    $('#sliderView .slides .slide[data-id="'+nextActive+'"]').css("left", activeLeft2+"px");
    $('#sliderView .slides .slide[data-id="'+last+'"]').css("left", activeLeft3+"px");

    $('#sliderView .slides .slide[data-id="'+activeId+'"]').css("transform", "scale("+scale+")");
    $('#sliderView .slides .slide[data-id="'+nextActive+'"]').css("transform", "scale("+scale2+")");
    $('#sliderView .slides .slide[data-id="'+last+'"]').css("transform", "scale("+scale3+")");

    $('#sliderView .slides .slide[data-id="'+activeId+'"] img').css("opacity", opacity);
    $('#sliderView .slides .slide[data-id="'+nextActive+'"] img').css("opacity", opacity2);
    $('#sliderView .slides .slide[data-id="'+last+'"] img').css("opacity", opacity3);
  }, 1);
}

function setSlide(id) {
  var activeId = parseInt($('#sliderView .slides .slide.active').attr("data-id"));

  if (activeId == id) {return;}
  else if (activeId + 1 == id) {setNextSlide(sliderTime);return;}

  var slidesCount = $('#sliderView .slides .slide').length;
  var i;

  if (id < activeId) {
    i = (slidesCount-activeId) + id;
  } else {
    i = id - activeId;
  }

  var speed = sliderTime / ((i > 1) ? (i * 0.75) : 1);

  setNextSlide(speed, i - 1);
}

$("#sliderControl ul li .wrap").click(function(e) {
  var id = parseInt($(this).closest("li").attr("data-id"));
  $("#sliderControl ul li").removeClass("active");
  $("#sliderControl ul li:nth-child("+id+")").addClass("active");
  setSlide(id);
});

$(window).scroll(function(e) {
  if ($(".header").length > 0) {
    if ($(".header").offset().top > $(".s1").height()) {
      $(".landing .header .premium a").addClass("light");
    } else {
      $(".landing .header .premium a").removeClass("light");
    }
  }
});
$(window).scroll();

$(".landing .gifts .gift").click(function(e) {
  $(".landing .gifts .gift").removeAttr("selected");
  $(this).attr("selected", "");
  var type = $(this).attr("data-type");
  $(".s5 input[name=\"gift\"]").val(type);
  var cssType = $(this).attr("class").split("type-")[1][0];
  var img = $("img", this).attr("src");
  $(".s5 form .view .icon").attr("class", "icon").addClass("type-"+cssType);
  $(".s5 form .view .icon img").attr("src", img);
  $(".s5 form .view h3 div").text("\""+($(".gifts .gift[selected]").attr("data-desc"))+"\"")
});

$(".main_menu a[href^='#']").on("click", function(e) {
  e.preventDefault();
  if ($(".main_menu").hasClass("is")) {
    $(".icon_hamburger").click();
  }
  $("html, body").animate({
    scrollTop: $($(this).attr("href")).offset().top
  }, 1000, "easeInOutCubic");
});

if ($(window.location.hash).length > 1) {
  $("html, body").animate({
    scrollTop: $(window.location.hash).offset().top
  }, 1000, "easeInOutCubic");
}

$("#sliderView .slide").click(function(e) {
  var slideId = $(this).attr("data-id");
  $("#sliderControl ul li[data-id=\""+slideId+"\"] .wrap").click();
  e.preventDefault();
});

$(".landing .icon_hamburger").click(function() {
  if ($(this).hasClass("is")) {
    $(this).removeClass("is");
    $(".main_menu").removeClass("is");
  } else {
    $(this).addClass("is");
    $(".main_menu").addClass("is");
  }
});

if ($("#mobSlider").length > 0) {
  $("#mobSlider").slick({
    infinite: false,
    dots: false,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });
}

if ($(".stepsSlider").length > 0) {
  $(".stepsSlider").slick({
    infinite: false,
    dots: false,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });
}

var images = document.images;
var fullLoad = images.length;
var loadedImages = 0;

for(var i = 0; i < fullLoad; i++) {
  var image = new Image();
  image.onload = updateLoadStatus;
  image.onerror = updateLoadStatus;
  image.src = images[i].src;
}

function updateLoadStatus() {
  loadedImages++;
  $("#preloader .view").css("height", ((100/fullLoad)*loadedImages)+"%");
  if (loadedImages >= fullLoad) {
    setTimeout(function() {
      $("#preloader").addClass("done");
    }, 500);
  }
}

$(".tip-main button").click(function(){
  var parent = $(this).closest(".tip");
  if (parent.hasClass("active")) {
    parent.removeClass("active");
    $(".tip-more", parent).slideUp(250);
  } else {
    parent.addClass("active");
    $(".tip-more", parent).slideDown(250);
  }
});

if ($(".main-settings .radio, .input .radio").length > 0) {
  $(".main-settings .radio, .input .radio").each(function(){
    var width = $("ul li.active", this).outerWidth();
    var x = $("ul li.active", this).position().left;
    $(".checker", this).css("width", (width)+"px").css("left", x+"px");
  });
}

$(".main-settings .radio ul li a, .input .radio ul li a").click(function(e){
  e.preventDefault();
  var parent = $(this).closest(".radio");
  $("ul li", parent).removeClass("active");
  $(this).closest("li").addClass("active");
  var width = $("ul li.active", parent).outerWidth();
  var x = $("ul li.active", parent).position().left;
  $(".checker", parent).css("width", (width)+"px").css("left", x+"px")
});

var startTouchPos = [];
var unknowSwipe = true, menuTouch = false, menuShiftStart = false, touchMove = false;
var menuShift = 0, prevMenuShift = 0, mainShift = 0, menuShiftSpeed = 0;
$(window).on({'touchstart' : function(e){
  touchMove = false;
  clearInterval(menuAnimate);
  startTouchPos[0] = e.originalEvent.touches[0].clientX;
  startTouchPos[1] = e.originalEvent.touches[0].clientY;
  if (menuShift <= 0) {
    unknowSwipe = true;
    menuTouch = false;
    menuShift = 0;

    var elements = e.originalEvent.path;
    for (var i=0; i<elements.length; i++) {
      if (typeof(elements[i].className) == "undefined") {continue;}
      if ((elements[i].className).includes("slick-slide")) {
        menuTouch = false;
        unknowSwipe = false;
        break;
      }
    }
  } else {
    mainShift = menuShift;
    menuShiftStart = true;
  }
}});
$(window).on({'touchmove' : function(e){
  audioControlMove(e, true);

  var x = e.originalEvent.touches[0].clientX;
  var y = e.originalEvent.touches[0].clientY;
  touchMove = true;

  if (menuTouch) {
    $("#mainBg").addClass("active");
    $("body").css("overflow", "hidden");
    
    if (menuShiftStart) {
      menuShift = mainShift + x-startTouchPos[0];
    } else {
      menuShift = mainShift + x-startTouchPos[0]-35;
    }

    menuShift = (menuShift<=0)?0:menuShift;
    menuShift = (menuShift>=280)?280:menuShift;
    var menuShiftPer = menuShift*100/280-100;
    $(".sidebar").css("transform", "translate("+menuShiftPer+"%)");
    $("#mainBg").css("opacity", (menuShiftPer+100)/100);
    $("main").css("transform", "translateX("+(menuShiftPer+100)+"px)");
    $("#player").css("transform", "translateX("+(menuShiftPer+100)+"px) translateY("+(parseInt($('#player').css('transform').split(',')[5]))+"px)");
    $("#player").addClass("move");
    $("body.profile .header").css("transform", "translateX("+(menuShiftPer+100)+"px)");
    $("body.profile .header .burger div:nth-child(1)").css("transform", "rotate("+(((menuShiftPer+100)/100)*45)+"deg)");
    $("body.profile .header .burger div:nth-child(1)").css("margin-top", (-10.5+(-0.5*((menuShiftPer+100)/100)))+"px");
    $("body.profile .header .burger div:nth-child(2)").css("opacity", (1-(menuShiftPer+100)/100));
    $("body.profile .header .burger div:nth-child(3)").css("transform", "rotate("+(-((menuShiftPer+100)/100)*45)+"deg)");
    $("body.profile .header .burger div:nth-child(3)").css("margin-top", (5.8+(1.2*((menuShiftPer+100)/100)))+"px");
    menuShiftSpeed = (menuShift - prevMenuShift);
    prevMenuShift = menuShift;
  } else if (soundChange == 0) {
    if (Math.abs(y-startTouchPos[1]) < 15 && (x-startTouchPos[0]) > 35 && unknowSwipe) {
      menuTouch = true;
      unknowSwipe = false;
    } else if (Math.abs(y-startTouchPos[1]) >= 15 && unknowSwipe) {
      menuTouch = false;
      unknowSwipe = false;
    } else if (Math.abs(x-startTouchPos[0]) <= -35 && unknowSwipe) {
      menuTouch = false;
      unknowSwipe = false;
    } 
  }
}});
$(window).on({'touchend' : function(e){
  audioControlEnd();

  touchMove = false;
  if (Math.abs(menuShiftSpeed) < 0.1 && typeof(e.target.attributes.id) != "undefined") {
    if (e.target.attributes.id.value == "mainBg") {
      closeMobMenu();
      return;
    }
  }
  if (menuShift <= 0) {
    $("body").css("overflow", "unset");
    $(".sidebar").css("transform", "translate(-100%)");
    $("#mainBg").css("opacity", "0");
    $("#mainBg").removeClass("active");
    $("main").css("transform", "translateX(0px)");
    $("body.profile .header").css("transform", "translateX(0px)");
    if ($("#player").length > 0) {
      $("#player").css("transform", "translateX(0px) translateY("+(parseInt($('#player').css('transform').split(',')[5]))+"px)");
      $("#player").removeClass("move");
    }
    $("#player").attr("style", "");
    $("body.profile .header .burger div:nth-child(1)").css("transform", "rotate(0deg)");
    $("body.profile .header .burger div:nth-child(1)").css("margin-top", "-10.5px");
    $("body.profile .header .burger div:nth-child(2)").css("opacity", "1");
    $("body.profile .header .burger div:nth-child(3)").css("transform", "rotate(0deg)");
    $("body.profile .header .burger div:nth-child(3)").css("margin-top", "5.8px");
    menuTouch = false;
    mainShift = 0;
    prevMenuShift = 0;
    menuShiftStart = false;
  } else {
    if (Math.abs(menuShiftSpeed) > 15) {
      var fixSpeed = 0;
      if (menuShiftSpeed > 0) {
        if (menuShift <= 130 && menuShiftSpeed <= 28) {
          fixSpeed = 15*(1.2+(((13/15)/130)*menuShift));
          if (fixSpeed > menuShiftSpeed) {menuShiftSpeed=fixSpeed;}
        }
      } else {
        if ((280-menuShift) <= 130 && menuShiftSpeed >= -28) {
          fixSpeed = -15*(1.2+(((13/15)/130)*(280-menuShift)));
          if (fixSpeed < menuShiftSpeed) {menuShiftSpeed=fixSpeed;}
        }
      }
      menuAnim(menuShiftSpeed);
    } else {
      if (menuShift < 140) {
        menuAnim(-14.5*(((menuShift*80/140)/100)+0.2));
      } else {
        menuAnim(14.5*(((100-((menuShift-140)*100/140))*0.8)/100+0.2));
      }
    }
  }
}});

var menuAnimate;

function menuAnim (speed) {
  menuAnimate = setInterval(function(){
    menuShift += speed;
    speed *= 0.9;
    menuShift = (menuShift<=0)?0:menuShift;
    menuShift = (menuShift>=280)?280:menuShift;
    var menuShiftPer = menuShift*100/280-100;

    if (menuShiftPer <= -100) {
      clearInterval(menuAnimate);
      $("body").css("overflow", "unset");
      $(".sidebar").css("transform", "translate(-100%)");
      $("#mainBg").css("opacity", "0");
      $("#mainBg").removeClass("active");
      $("main").css("transform", "translateX(0px)");
      $("#player").css("transform", "translateX(0px) translateY("+(parseInt($('#player').css('transform').split(',')[5]))+"px)");
      $("#player").removeClass("move");
      $("#player").attr("style", "");
      $("body.profile .header").css("transform", "translateX(0px)");
      $("body.profile .header .burger div:nth-child(1)").css("transform", "rotate(0deg)");
      $("body.profile .header .burger div:nth-child(1)").css("margin-top", "-10.5px");
      $("body.profile .header .burger div:nth-child(2)").css("opacity", "1");
      $("body.profile .header .burger div:nth-child(3)").css("transform", "rotate(0deg)");
      $("body.profile .header .burger div:nth-child(3)").css("margin-top", "5.8px");
      menuTouch = false;
      mainShift = 0;
      prevMenuShift = 0;
      menuShiftStart = false;
    } else if (menuShiftPer >= 0 || Math.abs(speed) < 0.1) {
      clearInterval(menuAnimate);
      $(".sidebar").css("transform", "translate(0%)");
      $("#mainBg").css("opacity", "1");
      $("main").css("transform", "translateX(100px)");
      $("body.profile .header").css("transform", "translateX(100px)");
      $("#player").css("transform", "translateX(100px) translateY("+(parseInt($('#player').css('transform').split(',')[5]))+"px)");
      $("#player").addClass("move");
      $("body.profile .header .burger div:nth-child(1)").css("transform", "rotate(45deg)");
      $("body.profile .header .burger div:nth-child(1)").css("margin-top", "-11px");
      $("body.profile .header .burger div:nth-child(2)").css("opacity", "0");
      $("body.profile .header .burger div:nth-child(3)").css("transform", "rotate(-45deg)");
      $("body.profile .header .burger div:nth-child(3)").css("margin-top", "7px");
    }

    $(".sidebar").css("transform", "translate("+menuShiftPer+"%)");
    $("#mainBg").css("opacity", (menuShiftPer+100)/100);
    $("main").css("transform", "translateX("+(menuShiftPer+100)+"px)");
    $("body.profile .header").css("transform", "translateX("+(menuShiftPer+100)+"px)");
    $("#player").css("transform", "translateX("+(menuShiftPer+100)+"px) translateY("+(parseInt($('#player').css('transform').split(',')[5]))+"px)");
    $("#player").addClass("move");
    $("body.profile .header .burger div:nth-child(1)").css("transform", "rotate("+(((menuShiftPer+100)/100)*45)+"deg)");
    $("body.profile .header .burger div:nth-child(1)").css("margin-top", (-10.5+(-0.5*((menuShiftPer+100)/100)))+"px");
    $("body.profile .header .burger div:nth-child(2)").css("opacity", (1-(menuShiftPer+100)/100));
    $("body.profile .header .burger div:nth-child(3)").css("transform", "rotate("+(-((menuShiftPer+100)/100)*45)+"deg)");
    $("body.profile .header .burger div:nth-child(3)").css("margin-top", (5.8+(1.2*((menuShiftPer+100)/100)))+"px");

  }, 1000/60);
}

$("#mainBg").mouseup(function(){
  closeMobMenu();
  closeFullPlayer();
});

$(".info-block .close").click(function(){
  $(this).closest(".info-block").slideUp();
});

function closeMobMenu () {
  if (!touchMove) {
    clearInterval(menuAnimate);
    menuAnim(-29);
  }
}
function closeFullPlayer () {
  $("#player").removeClass("view");
  $("#bgSound").removeClass("active");
}

$("#fullPlayer").click(function(){
  $("#bgSound").removeClass("active");
  if($("#player").hasClass("view")) {
    $("#player").removeClass("view");
  } else {
    $("#player").addClass("view");
    $("#mainBack").addClass("active");
  }
});

$("body.profile .header .burger").click(function(){
  clearInterval(menuAnimate);
  menuTouch = true;
  unknowSwipe = false;
  $("#mainBg").addClass("active");
  $("body").css("overflow", "hidden");
  menuAnim(29);
});

$(".popup-bg").click(function(){
  $(this).closest(".popup").removeClass("active");
});

function closePopup (el) {el.closest(".popup").removeClass("active");return false;}

$(".radio[data-time] li[data-time-val]").click(function(){
  var val = $(this).attr("data-time-val");
  $.each($(".time[data-time]"), function(){
    $("span", this).html(val);
  });
});

$(".player-buttons button[data-type]").click(function(){
  if (!$(this).hasClass("active")) {
    $(".player-buttons button[data-type]").removeClass("active");
    $(this).addClass("active");
    $("#bgSound").removeClass("active");
    var img = $("img", this).attr("src");
    $("img", $("#fullPlayer")).attr("src", img);
  } else {
    var type = $(this).attr("data-type");
    var x = $(this)[0].getBoundingClientRect().left;
    var y = $(this)[0].getBoundingClientRect().top-$("#bgSound").height()+32;
    if ($(window).width() < 1071) {
      y = $(this).position().top+11;
    }
    $("#bgSound").attr("data-type", type);
    $("#bgSound").css("left", x).css("top", y);
    if ($("#bgSound").hasClass("active")) {
      $("#bgSound").removeClass("active");
    } else {
      $("#bgSound").addClass("active");
    }
  }
});

$(document).click(function(e){
  var bgSoundClose = true;
  var elements = e.originalEvent.path;

  for (var i=0; i<elements.length; i++) {
    if (typeof(elements[i].className) == "undefined") {continue;}
    if ((elements[i].className).includes("player-layout")) {
      bgSoundClose = false;
      break;
    }
  }

  if (bgSoundClose) {$("#bgSound").removeClass("active");}
});

function resetBgSoundPos () {
  var type = $("#bgSound").attr("data-type");
  var x = $(".player-buttons button[data-type="+type+"]")[0].getBoundingClientRect().left;
  var y = $(".player-buttons button[data-type="+type+"]")[0].getBoundingClientRect().top-$("#bgSound").height()+32;
  $("#bgSound").css("left", x).css("top", y);
}

$("#playerBtn, .player-buttons-mob #playerBtn").click(function(){
  if($("#playerBtn").hasClass("active")){
    $("#playerBtn").removeClass("active");
    $(".player-buttons-mob #playerBtn").removeClass("active");
    audioOnOff("mainAudio", false, "#playerTime", "#playerStatus div");
  } else {
    $("#playerBtn").addClass("active");
    $(".player-buttons-mob #playerBtn").addClass("active");
    audioOnOff("mainAudio", true, "#playerTime", "#playerStatus div");
  }
});

$("#maxSound").click(function(){setVolume("mainAudio", 1);$("#playerSoundStatus div").css("width", "100%");});
$("#noSound").click(function(){setVolume("mainAudio", 0);$("#playerSoundStatus div").css("width", "0%");});

var soundChange = 0, soundX, soundY, soundStartPos;

$("#playerSoundStatus, #playerSoundStatus div").click(function(e){
  var width = $("#playerSoundStatus").width();
  var newPos = e.offsetX;
  var percent = Math.round(newPos/width*100);
  $("#playerSoundStatus div").css("width", percent+"%");
  setVolume("mainAudio", percent/100);
});
$("#playerSoundStatus div button").click(function(){return false;});
$("#bgSoundStatus div button").click(function(){return false;});
$("#playerSoundStatus div button").mousedown(function(e){
  audioControlStart(e, 1);
});
$("#playerSoundStatus div button").on({'touchstart' : function(e){
  audioControlStart(e, 1, true);
}});
$("#bgSoundStatus div button").mousedown(function(e){
  audioControlStart(e, 2);
});
$("#bgSoundStatus div button").on({'touchstart' : function(e){
  audioControlStart(e, 2, true);
}});
$(window).mouseup(function(){
  audioControlEnd();
});
$(window).mousemove(function(e){
  audioControlMove(e);
});

function audioControlMove (e, touch = false) {
  if (soundChange != 0) {
    var type = $("#"+soundChange).attr("data-move");
    var sound = $("#"+soundChange).attr("data-sound");

    if (type == 1) {
      var width = $("#"+soundChange).width();
      var x = e.originalEvent.clientX;
      if (touch) {x = e.originalEvent.touches[0].clientX;}
      var newPos = (soundStartPos+(x-soundX))/width;
      if (newPos <= 0) {newPos = 0;}
      if (newPos >= 1) {newPos = 1;}
      $("div", $("#"+soundChange)).css("width", (newPos*100)+"%");
      setVolume(sound, newPos);
    } else if (type == 2) {
      var height = $("#"+soundChange).height();
      var y = e.originalEvent.clientY;
      if (touch) {y = e.originalEvent.touches[0].clientY;}
      var newPos = (soundStartPos+(soundY-y))/height;
      if (newPos <= 0) {newPos = 0;}
      if (newPos >= 1) {newPos = 1;}
      $("div", $("#"+soundChange)).css("height", (newPos*100)+"%");
      setVolume(sound, newPos);
    }
  }
}

function audioControlEnd () {
  soundChange = 0;
  $("body").css("overflow", "unset");
}

function audioControlStart (e, type, touch = false) {
  if (type == 1) {
    soundChange = "playerSoundStatus";
    soundX = e.originalEvent.clientX;
    if (touch) {soundX = e.originalEvent.touches[0].clientX;}
    soundStartPos = $("div", $("#"+soundChange)).width();
  } else if (type == 2) {
    soundChange = "bgSoundStatus";
    soundY = e.originalEvent.clientY;
    if (touch) {soundY = e.originalEvent.touches[0].clientY;}
    soundStartPos = $("div", $("#"+soundChange)).height();
  }
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
      $("body").css("overflow", "hidden");
  }
}

function audioOnOff (id, on, timeView, timeLine) {
  if (on) {
    document.getElementById(id).play();
    document.getElementById("backAudio").play();
    updateAudioTime(id, timeView, timeLine);
    setVolume(id, 0.5);
  } else {
    document.getElementById(id).pause();
    document.getElementById("backAudio").pause();
  }
}

function updateAudioTime (id, timeView, timeLine) {
  var audio = document.getElementById(id);
  var audioPlay = setInterval(function(){
    if (audio.paused == true) {$("#playerBtn").removeClass("active");clearInterval(audioPlay);return;}
    var time = Math.floor(audio.currentTime);
    var minutes = parseInt(time/60);
    var seconds = time - minutes*60;
    var percent = time/audio.duration*100;
    if (seconds < 10) {seconds = "0"+seconds;}
    $(timeView).text(minutes + ":" + seconds);
    $(timeLine).css("width", percent+"%");
  },100);
}

function setVolume (id, volume) {document.getElementById(id).volume = volume;}

$("#playerClose").click(function(){
  if ($("#mainBack").hasClass("active")) {
    $("#mainBack").removeClass("active");
    $("#player").removeClass("view");
  }
  $("#player").addClass("closed");
  document.getElementById("mainAudio").pause();
  document.getElementById("backAudio").pause();
})