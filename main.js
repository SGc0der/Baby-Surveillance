status_html = document.getElementById("status");
status_ = "";
objects = [];
function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    cocossd = ml5.objectDetector("cocossd", modelLoaded);
    status_html.innerHTML = "Status: Object Detection In Progress";
}
alarm = "";
function preload() {
    alarm = loadSound("mixkit-critical-alarm-1004.wav");
}
//r = random(255);
//g= random(255);
//b = random(255);   
function draw() {
    image(video,0, 0, 500, 420);
    cocossd.detect(video, gotResults);
    if(status_ == true) {
        for(i = 0; i < results.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            percent = floor(results[i].confidence * 100);
            console.log(percent);
            fill("#000000");
            stroke("#000000");
            text(results[i].label + " " + percent + " %", results[i].x + 15, results[i].y + 15);
            noFill();
            rect(results[i].x, reuslts[i].y, results[i].width, results[i].height);
        }
    }
}
function modelLoaded() {
    console.log(ml5.version);
    console.log("CoCoSSD Intialised Successfully");
    status_ = true;
}
results = [];
function gotResults(error, results) {
    if(error) {
        console.log(error);
    }else{
        console.log(results);
    }
    if(results[0].label == "person"){
        document.getElementById("baby_status").innerHTML = "Baby Found";
        alarm.stop();
    }
    else{
        document.getElementById("baby_status").innerHTML = "Baby Not Found!";
        alarm.play();
    }
}