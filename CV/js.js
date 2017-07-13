tmpOld = [];
var tmp;
function hasUserMedia() {
   //check if the browser supports the WebRTC
   return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia);
}

if (hasUserMedia()) {
   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia;

   //enabling video and audio channels
   navigator.getUserMedia({ video: true, audio: false }, function (stream) {
      var video = document.querySelector('video');

      //inserting our stream to the video tag
      video.src = window.URL.createObjectURL(stream);
   }, function (err) {});
} else {
   alert("WebRTC is not supported");
}


document.getElementById("detection").addEventListener('click', canvas, false);
function canvas(){
  setInterval(firstTime, 100);
}

function firstTime(){
  var video = document.querySelector('video');
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

document.getElementById('background').addEventListener('click', background, false);
function background(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var cs = document.getElementById('cbackground');
  var context = cs.getContext('2d');

  cs.width = canvas.width;
  cs.height = canvas.height;

  var pixel = ctx.getImageData(0, 0, canvas.width, canvas.height);
  context.putImageData(pixel, 0, 0);
}

/*document.getElementById('bHasil').addEventListener('click', hasil, false);
function hasil(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var pixel = ctx.getImageData(0, 0, canvas.width, canvas.height);

  var data = image2data(canvas.width, canvas.height, pixel.data);
  var grey = Greyscale(data);
  var bw = BlackAndWhite(grey);
  var image = data2image(canvas.width, canvas.height, bw);
  var noise = ReduceNoise('hit', 3, 3, bw);
  if(bw == noise){
    console.log("sama");
  }


  var image2 = data2image(canvas.width, canvas.height, noise);
  //noise
  var cs = document.getElementById('bw');
  var context = cs.getContext('2d');
  cs.width = canvas.width;
  cs.height = canvas.height;

  var pixel2 = context.getImageData(0, 0, cs.width, cs.height);
  var data2 = pixel2.data;

  for(var i = 0; i < data2.length; i++){
    data2[i] = image[i];
  }

  context.putImageData(pixel2, 0, 0);

  //bw
  var canvas3 = document.getElementById('noise');
  var ctx3 = canvas3.getContext('2d');

  canvas3.width = canvas.width;
  canvas3.height = canvas.height;

  var pixel3 = ctx3.getImageData(0, 0, canvas3.width, canvas3.height);
  var data3 = pixel3.data;

  for(var j = 0; j < data3.length; j++){
    data3[j] = image2[j];
  }
  ctx3.putImageData(pixel3, 0, 0);
  console.log(pixel3.data);
}
*/
document.getElementById('bgreyscale').addEventListener('click', test, false);
function test(){
  setInterval(a, 100);
}

function a(){
  var canvas1 = document.getElementById('canvas');
  var ctx1 = canvas1.getContext('2d');
  var pixel1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
  var data1 = pixel1.data;

  var canvas2 = document.getElementById('cbackground');
  var ctx2 = canvas2.getContext('2d');
  var pixel2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);

  var canvas3 = document.getElementById('hasil');
  canvas3.width = canvas2.width;
  canvas3.height = canvas2.height;
  var ctx3 = canvas3.getContext('2d');

  var tmp1 = image2data(canvas1.width, canvas1.height, pixel1.data);
  var tmp2 = image2data(canvas2.width, canvas2.height, pixel2.data);
  tmp1 = Greyscale(tmp1);
  tmp2 = Greyscale(tmp2);
  var motion = motionDetection(tmp1, tmp2);
  var grey = Greyscale(motion);
  var bw = BlackAndWhite(grey);
  var noise = ReduceNoise('hit', 2, 3, bw);
  var image = data2image(canvas2.width, canvas2.height, noise);
  for(var i = 0; i < data1.length; i++){
    data1[i] = image[i];
  }
  ctx3.putImageData(pixel1, 0, 0);
}
/*document.getElementById('gambar').addEventListener("change", gambar, false);
function gambar(event){
  var canvas = document.getElementById("canvas");
  var ctx = document.getElementById("canvas").getContext('2d');

  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("gambar").files[0]);

  oFReader.onload = function (oFREvent) {
    var img = new Image;
    img.onload = function(){
      ctx.drawImage(img, 0,0);
    }
    document.getElementById("jadi").src = oFREvent.target.result;
    img.src = oFREvent.target.result;
    canvas.width = document.getElementById("jadi").width;
    canvas.height = document.getElementById("jadi").height;
    document.getElementById("jadi").style.display = "none";
  };
}



document.getElementById("simpan").addEventListener('click', proses, false);
function proses(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  var avg = "";

  //greyscale
  var pixel = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = pixel.data;
  for(var i = 0; i < data.length; i+=4){
    avg = (data[i] + data[i+1] + data[i+2])/3;
    data[i] = avg;
    data[i+1] = avg;
    data[i+2] = avg;
  }
  ctx.putImageData(pixel, 0, 0);


  //black and white
  pixel = ctx.getImageData(0, 0, canvas.width, canvas.height);
  data = pixel.data;
  for(var i = 0; i < data.length; i+=4){
    if(data[i] > 128){
      data[i] = 255;
      data[i+1] = 255;
      data[i+2] = 255;
    }
    else{
      data[i] = 0;
      data[i+1] = 0;
      data[i+2] = 0;
    }
  }
  ctx.putImageData(pixel, 0, 0);

  standardDeviasi();
}

function standardDeviasi(){
  var tmp1;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  var pixel = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = pixel.data;
  console.log(data);

  for(var i = 0; i < data.length; i += 4){
    tmp1 = data[i] + tmp1;
  }

  tmp1 = (tmp1 / data.length)^(1/2);
  console.log(tmp1);
}

function fit(){
  var a = [];

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  var pixel = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = pixel.data;

  var height = 0;
  var j = 0;
  for(var i = 0; i < data.length; i+=4){
    if(data[i] = 255){
      if(i % (canvas.width + 1) == 0){
        height++;
        a[j] = "{}"
      }
    }
  }

}
*/
