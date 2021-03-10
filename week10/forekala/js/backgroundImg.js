function checkSafari(){
  "use strict";
  var height = $(window).height();
  var heightAdd = height + 40;            // add __ px to background height
  var heightAddMore = heightAdd + 30;     // add more for case iphone
  var userAgent = window.navigator.userAgent;

  if (userAgent.match(/iPad/i)) {
     $("#background").css({"background-size":"auto " + heightAdd +"px"});
  }
  else if(userAgent.match(/iPhone/i)) {
     $("#background").css({"background-size":"auto " + heightAddMore +"px"});
  }
}

function detectOrientation(){
  "use strict";
  var userAgent = window.navigator.userAgent;
  if(userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)){
      $(window).on("orientationchange", function(event){
          checkSafari();
      });
  }
}