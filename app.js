var x_esq = 0;
var x_dir = 0;
var diferenca = 0;


function setup(){
    video = createCapture(VIDEO);
    video.position(620, 450);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function modelLoaded(){
    console.log('O modeloo ta carregado, desce a lenha');
}

function gotPoses(results){
    if(results.length > 0 ){
        console.log(results);
        console.log('oi');
        x_esq = results[0].pose.leftWrist.x;
        x_dir = results[0].pose.rightWrist.x;
        diferenca = floor(x_esq - x_dir);
        console.log(diferenca);
    }
}


function draw(){
    var elementoTexto = document.getElementById('texto_mudar');
    elementoTexto.style.fontSize = diferenca / 10 + 'px'; // Adicionando 'px' para a unidade de medida
}