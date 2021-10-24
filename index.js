let video = document.querySelector("video");
let recordbtn = document.querySelector(".record-cont");
let imagebtn = document.querySelector(".image-cont");
let recorder;
let recordToggle = false;
let dataArr = [];
let constraints = window.constraints = {

  audio: true,
  video: true
};
navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
	video.srcObject = stream;
  recorder = new MediaRecorder(stream);
  recorder.addEventListener("start",(e)=>{
    dataArr = [];
  })
  recorder.addEventListener("dataavailable",(e)=>{
    dataArr.push(e.data);
  })
  recorder.addEventListener("stop",()=>{
    let blob = new Blob(dataArr,{type:"video/mp4"})
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href=url;
    a.download="video.mp4";
    a.click();
  })

})
recordbtn.addEventListener("click", (e) => {
  if(!recorder) return;
  recordToggle = !recordToggle;
  if(recordToggle) 
  {
    recorder.start();
    // console.log("recording started")
    // alert("hello");
  }
  else 
  { 
    recorder.stop();
    // console.log("recording started")
  }

})
imagebtn.addEventListener("click", (e) => {
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let tool = canvas.getContext("2d");
    tool.drawImage(video, 0, 0, canvas.width, canvas.height);
    let url2 = canvas.toDataURL();
    let a = document.createElement("a");
    a.href=url2;
    a.download="pic.jpeg";
    a.click();

})