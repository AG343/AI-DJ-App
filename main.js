var song1 = ''
var song2 = ''
var leftscore = ''
var rightscore = ''
var leftWristX = ''
var leftWristY = ''
var rightWristX = ''
var rightWristY = ''
var status1 = ''
var status2 = ''

function preload() {
    song1 = loadSound('song1.mp3')
    song1 = loadSound('song2.mp3')
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill('#FF0000')
    stroke('#FF0000')
    if (leftscore > 0.2) {
        circle(leftWristX, leftWristY, 30)
        song2.stop()
        console.log('song1 is playing')
        if (song1.isPlaying() === false) {
            status1=true
            song1.play()
            document.getElementById('song').innerHTML='song1'
            
        }
        else if(rightscore>0.2){
         circle(rightWristX, rightWristY, 30)
         song1.stop()
         if(song2.isPlaying()===false){
           status2=true
           song2.play()
           document.getElementById('song').innerHTML='song2'
         }
        }
    }
}

function modelLoaded() {
    console.log("PoseNet is Initialized!")
}

function gotPoses(results) {
    if (results.length > 0) {
        leftscore = results[0].pose.keypoints[9].score
        rightscore = results[0].pose.keypoints[10].score
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log(results)
    }
}