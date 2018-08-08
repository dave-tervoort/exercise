/** 
 * loadImage load a image with a promise structure
 * @param url
 * @return {Promise<any>}
 */
function loadImage(url) {
  return new Promise(function(resolve, reject) {
    var img = document.createElement("img");
    
    img.onload = function() {
      resolve(this);
    };

    img.onerror = function(e) {
      // reject(e);
      resolve(e)
    };

    img.src = url;
  });
}

/**
 * Animate a element to a position
 * @param {HTMLElement} element
 * @param {number} duration
 * @param {number} x
 * @param {number} y
 * @return {Promise<any>}
 */
function animate(element, duration, x, y, rotate) {
  return new Promise(function(resolve) {
    TweenLite.to(element, duration, { x: x, y: y, opacity:1, rotation:rotate, ease:Power0.easeNone, onComplete: function(){
      resolve(element);
    }});
  });
}

var images = [
  "./assets/001-yawn.png",
  "./assets/002-wink.png",
  "./assets/003-smile-1.png",
  "./assets/004-smile.png",
  "./assets/005-surprise.png",
  "./assets/006-shocked.png",
  "./assets/007-sceptic.png",
  "./assets/008-sad-2.png",
  "./assets/009-sad-1.png",
  "./assets/010-happy-3.png",
  "./assets/011-pain.png",
  "./assets/012-muted.png",
  "./assets/013-meh.png",
  "./assets/014-laugh.png",
  "./assets/015-ill.png",
  "./assets/016-happy-2.png",
  "./assets/017-happy-1.png",
  "./assets/018-cute.png",
  "./assets/019-crying.png",
  "./assets/020-crazy1.png",
  "./assets/021-cool.png",
  "./assets/022-bored.png",
  "./assets/023-blush.png",
  "./assets/024-sad.png",
  "./assets/025-happy.png"
];

/// WRITE CODE UNDER HERE

var loadedImages = [];
var index = 0;

TweenMax.set(document.querySelector("#finishedMessage"),{autoAlpha:0});

TweenMax.to(document.querySelector("#bandTop"), 1,{x:200, ease:Power0.easeNone, repeat:-1});
TweenMax.to(document.querySelector("#bandRight"), 1,{y:100, ease:Power0.easeNone, repeat:-1});
TweenMax.to(document.querySelector("#bandBottom"), 1,{x:-200, ease:Power0.easeNone, repeat:-1});
TweenMax.to(document.querySelector("#bandLeft"), 1,{y:-100, ease:Power0.easeNone, repeat:-1});


images.forEach(function(img){
    loadedImages.push(loadImage(img));
})

Promise.all(loadedImages).then(function(images){

  for (var i = 0; i < images.length; i++) {
    if(images[i].type == "error"){
      images[i] = document.createElement("img");
      images[i].src = "./img/error_img.png";
    }
      images[i].classList = "smily";
      document.querySelector("#imageWrapper").appendChild(images[i]);
  }
  animateSmily(images);
});


function animateSmily(images){

  img = images[index];

  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var smilyWidth = img.offsetWidth;
  var smilyHeight = img.offsetHeight;
  var moveX = screenWidth-smilyWidth;
  var moveY = screenHeight-smilyHeight;

  var duration = 0.1;
  var rotation = 720;

  animate(img, duration, moveX, 0, rotation)
    .then(function(){
      return animate(img, duration, moveX, moveY, -rotation)  
    })
    .then(function(){
      return animate(img, duration, 0, moveY, -rotation*2)  
    })
    .then(function(){
      return animate(img, duration, 0, 0, -rotation*3)  
    })
    .then(function(){

      index++;
      if(index < images.length){
        animateSmily(images)
      }
      else{
        TweenLite.to(document.querySelector("#finishedMessage"), 0.2, {autoAlpha:1});
      }
    })
}