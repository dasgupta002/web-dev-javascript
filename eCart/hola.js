var arr = new Array("1.jpg", "2.jpg", "3.jpg", "4.jpg");
var i = 1;
var ref;
function picLibrary(){
      document.img1.src = arr[i];
      i++
      if(i>3){
         i = 0;
      }
}
function start(){
      ref = setInterval("picLibrary()", 1000);
}
function stop(){
      clearInerval(ref);
}
