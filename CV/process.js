function Greyscale(data){
  var avg;
  for(var i = 0; i < data.length; i++){
    for(var j = 0; j < data[0].length; j++){
      avg = (data[i][j][0] + data[i][j][1] + data[i][j][2]) / 3;
      data[i][j][0] = avg;
      data[i][j][1] = avg;
      data[i][j][2] = avg;
    }
  }

  return data;
}

function BlackAndWhite(data){
  for(var i = 0; i < data.length; i++){
    for(var j = 0; j < data[i].length; j++){
      if(data[i][j][0] > 128){
        data[i][j][0] = 255;
        data[i][j][1] = 255;
        data[i][j][2] = 255;
      } else{
        data[i][j][0] = 0;
        data[i][j][1] = 0;
        data[i][j][2] = 0;
      }
    }
  }

  return data;
}

function image2data(width, height, data){
  //new array
  var tmp = new Array(height);
  for(var x = 0; x < height; x++){
    tmp[x] = new Array(width);
  }

  for(var a = 0; a < height; a++){
    for(var b = 0; b < width; b++){
      tmp[a][b] = new Array(3);
    }
  }
  // end

  //convert image to data
  var z = 0;

  for(var i = 0; i < height; i++){
    for(var j = 0; j < width; j++){
      tmp[i][j][0] = data[z];
      tmp[i][j][1] = data[z+1];
      tmp[i][j][2] = data[z+2];
      z+=4;
    }
  }

  return tmp;
}

function erosion(type, matrix, data){
  //new variable for operator fit and hit
  var operator = new Array(matrix);
  for(var z = 0; z < matrix; z++){
    operator[z] = new Array(matrix);
  }
  //store matrix data
  for(var x = 0; x < matrix; x++){
    for(var y = 0; y < matrix; y++){
      operator[x][y] = 255;
    }
  }
  //end


  if(type == 'hit'){
    if(data.length > 0){
      if(data[0].length > 0){
        if(data[0][0].length > 0){

          var hasil = new Array(data.length);
          for(var k = 0; k < data.length; k++){
            hasil[k] = new Array(data[0].length);
          }
          for(var l = 0; l < data.length; l++){
            for(var m = 0; m < data[l].length; m++){
              hasil[l][m] = new Array(3);
            }
          }

          //store data
          for(var i = 0; i < data.length; i++){
            for(var j = 0; j < data[i].length; j++){
              hasil[i][j][0] = data[i][j][0];
              hasil[i][j][1] = data[i][j][1];
              hasil[i][j][2] = data[i][j][2];
            }
          }

          var tmp1 = (matrix/2)-0.5;
          var just = parseInt(tmp1);
          for(var a = just ; a < data.length - just; a++){
            for(var b = just; b < data[a].length - just; b++){

              for(var c = 0; c < matrix; c++){
                for(var d = 0; d < matrix; d++){
                  if(data[a + c - just][b + d - just][0] != operator[c][d]){
                    hasil[a][b][0] = 0;
                    hasil[a][b][1] = 0;
                    hasil[a][b][2] = 0;
                    c = matrix;
                    d = matrix;
                  }
                }
              }

            }
          }

          return hasil;
        } else{
          return "Data kurang RGB";
        }
      } else{
        return "Data tidak valid";
      }
    } else{
      return "data tidak valid";
    }
  } else if (type == 'fit') {
    //do something here later
  } else{
    return "Tipe tidak valid";
  }
}

function data2image(width, height, data){
  var tmp = new Array(width * height);
  if(data.length > 0){
    if(data[0].length > 0){
        var z = 0;
        for(var i = 0; i < data.length; i++){
          for(var j = 0; j < data[i].length; j++){
            tmp[z] = data[i][j][0];
            tmp[z+1] = data[i][j][1];
            tmp[z+2] = data[i][j][2];
            tmp[z+3] = 255;
            z+=4;
          }
        }

        return tmp;
    }
  }
}

function ReduceNoise(type, many, matrix, data){

  var a = erosion(type, matrix, data);
  for(var i = 1; i < many; i++){
    a = erosion(type, matrix, a);
  }
  return a;
}

function motionDetection(currentData, staticData){
  if(currentData.length > 0 && staticData.length > 0 && currentData.length == staticData.length){
    if(currentData[0].length > 0 && staticData[0].length > 0 && currentData[0].length == staticData[0].length){

      var tmp = new Array(currentData.length);
      for(var x = 0; x < currentData.length; x++){
        tmp[x] = new Array(currentData[0].length);
      }

      for(var y = 0; y < currentData.length; y++){
        for(var z = 0; z < currentData[y].length; z++){
          tmp[y][z] = new Array(3);
        }
      }

      for(var i = 0; i < currentData.length; i++){
        for(var j = 0; j < currentData[i].length; j++){
          if(currentData[i][j][0] != staticData[i][j][0] && currentData[i][j][1] != staticData[i][j][1] && currentData[i][j][2] != staticData[i][j][2]){
            tmp[i][j][0] = 255;
            tmp[i][j][1] = 255;
            tmp[i][j][2] = 255;
          }else{
            tmp[i][j][0] = 0;
            tmp[i][j][1] = 0;
            tmp[i][j][2] = 0;
          }
        }
      }
      return tmp;
    }
  }
}
