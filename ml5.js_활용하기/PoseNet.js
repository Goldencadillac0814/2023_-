let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  
  // 웹 카메라 비디오 스트림 생성
  video = createCapture(VIDEO);
  video.size(width, height);
  
  // PoseNet 모델 로드
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  
  // 비디오 스트림을 캔버스에 그리기 위해 설정
  video.hide();
}

function modelLoaded() {
  console.log('PoseNet 모델이 준비되었습니다.');
}

function gotPoses(results) {
  poses = results;
}

function draw() {
  image(video, 0, 0, width, height);
  
  // 감지된 포즈를 시각화
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    
    // 포즈의 관절 표시
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}
