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
      reject(e);
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
function animate(element, duration, x, y) {
  return new Promise(function(resolve) {
    TweenLite.to(element, duration, { x: x, y: y, onComplete: function(){
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
  "./assets/020-crazy.png",
  "./assets/021-cool.png",
  "./assets/022-bored.png",
  "./assets/023-blush.png",
  "./assets/024-sad.png",
  "./assets/025-happy.png"
];

/// WRITE CODE UNDER HERE

// var test = 0;

// for (var i = 0; i < images.length; i++) {
  
//   loadImage(images[i])
//     .then(function(evt){
      
//       evt.classList = "smily";
//       document.querySelector("#imageWrapper").appendChild(evt);
//     })
//     .catch(function(err){

//       document.querySelector("#errorWrapper").innerHTML += err.path[0].src + "<BR>";

//     })
//     .then(function(e){
//       test++;
//       if(test == images.length){
//         console.log("done");
//         allAssetsLoaded();
//       }
//     })
// }


// function allAssetsLoaded(){
//   for (var i = 0; i < images.length; i++) {
  
//   animate(document.querySelectorAll(".smily")[i], 1, 100, 0)
//   .then(function(e){
//     return animate(document.querySelectorAll(".smily")[i], 1, 100, 100)
//   })
//   .then(function(e){
//     return animate(document.querySelectorAll(".smily")[i], 1, 0, 100)
//   })
//   .then(function(e){
//     return animate(document.querySelectorAll(".smily")[i], 1, 0, 0)
//   })
    
//   }
// }

var promisesArray = [];
var index = 0;

// for (var i = 0; i < 3; i++) {
//   loadImage(images[i])
//   .then(function(elem){
//     elem.classList = "smily";
//     document.querySelector("#imageWrapper").appendChild(elem);
//     loadedImages.push(elem);
//     animate(elem, 1, 100, 0);
//   })
// }
// console.log("loadedImages", promisesArray);



images.forEach(function(src){
  promisesArray.push(loadImage(src))
});

Promise.all(promisesArray)
  .then(function(images){

    images.forEach(function(image){
      animateImage(image).then(function(img){
        console.log(img, 'animated')
      })
    })
  

  });

function animateImage(image){
  image.classList = "smily";
  document.querySelector("#imageWrapper").appendChild(image);

  return animate(image, 1, 100, 0)
    .then(function(arg){
      return animate(arg, 1, 100, 100)
    })
    .then(function(){
      return animate(image, 1, 0, 100)
    })
    .then(function(){
      return animate(image, 1, 0, 0)
    })
}



// images.forEach(function(src){
//   loadImage(src).then(function(evt){
//     evt.classList = "smily";
//     document.querySelector("#imageWrapper").appendChild(evt);
//   })
//   .catch(function(err){
//     document.querySelector("#errorWrapper").innerHTML += err.path[0].src + "<BR>";
//   })
// })

