musica = '';
x_esq =  0;
x_dir = 0;
y_dir = 0;
y_esq = 0;
score_esq = 0;
score_dir = 0;

function preload(){
    musica = loadSound('music.mp3');
}

function tocar(){
    musica.play();
    musica.setVolume(0.5);
    musica.rate(1);
}

function setup(){
    canvas = createCanvas(900, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelo_carregado());
    poseNet.on('pose', gotPoses);
}



function modelo_carregado(){
    console.log('Carreguei');
}


function gotPoses(results){
    console.log(results);
    if(results.length > 0){
    x_esq = results[0].pose.leftWrist.x;
    y_esq = results[0].pose.leftWrist.y;
    x_dir = results[0].pose.rightWrist.x;
    y_dir = results[0].pose.rightWrist.y;
    score_esq = results[0].pose.keypoints[9].score;
    score_dir = results[0].pose.keypoints[10].score;
    console.log('X Esquerdo: ' + floor(x_esq) + ' Y esquerdo: ' + floor(y_esq) + ' X direito: ' + floor(x_dir) + ' Y direito: ' + floor(y_dir));
    
}
}

function draw(){
    image(video, 0, 0, 900, 600);
    if(score_esq > 0.2){
        fill('blue');
        braco_esq = Number(y_esq);
        bo_esquerdo = floor(braco_esq)
        braco_esquerdo = bo_esquerdo/500;
        console.log(braco_esquerdo);
        // musica.setVolume(braco_esquerdo);
        document.getElementById('volume').innerHTML = 'O volume é ' + braco_esquerdo;
        circle(x_esq, y_esq, 30);
        musica.setVolume(braco_esquerdo);
    }
}