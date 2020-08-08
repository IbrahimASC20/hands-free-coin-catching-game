let video;
let noseX;
let noseY;
let eyeR_Y;
let eyeR_X;
let eyeL_Y;
let eyeL_X;
let eXpos = 300;
let eYpos = 300;
let score = 0;
function preload() {
    left_eye = loadImage("eye_left.png");
    right_eye = loadImage("eye_right.png");
    nosy = loadImage("nose.jpg")
}
function setup() {//only executes once
    createCanvas(windowWidth,windowHeight)
    video = createCapture(VIDEO);
    video.hide();

    const posenet = ml5.poseNet(video, modelLoaded)
    // event listener
    posenet.on("pose",gotPoses);
} 

function modelLoaded(){
    console.log("model loaded");
}
function gotPoses(poses){
    //console.log(poses);
    if (poses.length > 0) {
        noseX = poses[0].pose.keypoints[0].position.x;
        noseY = poses[0].pose.keypoints[0].position.y;
        eyeL_X = poses[0].pose.keypoints[1].position.x;
        eyeL_Y = poses[0].pose.keypoints[1].position.y;
        eyeR_X = poses[0].pose.keypoints[2].position.x;
        eyeR_Y = poses[0].pose.keypoints[2].position.y;
    }
}
function draw(){ //infinite loop

    background(255,0,255);
    image(video,0,0);
    //filter(THRESHOLD);

    //score
    fill(165,42,42)
    textSize(30)
    text("Score: $"+score,15,30)

    //my enemy
    fill(255,200,0);
    ellipse(eXpos,eYpos,50,50);
    fill(0,255,0);
    textSize(40);
    text("$",eXpos-10,eYpos+12);

    //organs
    image(nosy, noseX - 20, noseY - 25, 45,45);
    image(right_eye,eyeR_X - 20,eyeR_Y-25, 40,40);
    image(left_eye,eyeL_X - 20,eyeL_Y-25, 40,40);

    if (noseX > 0 && noseY > 0) {
        //collusion
        let myLeft = noseX - 23;
        let myRight = noseX + 23;
        let myTop = noseY - 23;
        let myBottom = noseY + 23;

        let eLeft = eXpos - 25;
        let eRight = eXpos + 25;
        let eBottom = eYpos + 25;
        let eTop = eYpos - 25;

        // make conditional statements to test collision
        if (myLeft > eRight || eLeft > myRight || myTop > eBottom || eTop > myBottom) {

        }
        else {
            score += 1
            eXpos = random(5,500);
            eYpos = random(5,500);
        }

    }
    
}

    

    
