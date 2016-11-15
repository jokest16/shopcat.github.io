$(function(){
new WOW().init();
  var button = $('button[type="button"]'),
      toggle = $('.top-pannel-togle'),
      count = 0,
      topPos = 0;
    if(window.screen.width <= 992){
      $('.top-pannel-togle-menu').css('opacity','0');
      $('.top-pannel-togle-menu').css('position','absalute');
    }
    toggle.on('click',function () {
    count++
    $(".toggle-mnu").toggleClass("on");
      if(count % 2 === 0){
        $('.top-pannel-togle-menu').animate({
          top: "-150px",
          opacity: 0
        }, 500, "linear");
      }else{$('.top-pannel-togle-menu').animate({
        top: addaptivPos(topPos),
        opacity: 1
      }, 500, "linear");}
  });
  button.on('click',function () {
  var email = $('input[type="email"]').val();
  var add_pattern =/[0-9a-z_-]+@[0-9a-z_]+\.[a-z]{2,5}/i;
    if(email==''||email==" "){
      alert("Вы некоректно ввели свой email");
    }else if(add_pattern.test(email)==false){
      alert("Вы некоректно ввели свой email");
    }
  });
  function addaptivPos(pos) {
    if(window.screen.width <= 992 && window.screen.width > 480){
    return  pos = "110px";
    }else{
      return  pos = "30px";
    }
  }
});
