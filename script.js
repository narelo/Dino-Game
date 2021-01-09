const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false; //variável para verificar pulo
let position = 0; //posição inicial

function handleKeyUp(event){//tratando pulo
    if(event.keyCode === 32){//32(código tecla espaço) 
        if(!isJumping){//se não estiver pulando
            jump();//pula 
        }
    } 
}

function jump(){//função pular
    isJumping = true;
    let upInterval = setInterval(() => {
        if(position >= 150){//150(px pulados)
            clearInterval(upInterval);
            //desce
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 15;
                    dino.style.bottom = position + 'px';
                }
            }, 15);  
        }else{
            //sobe
            position += 15;
            dino.style.bottom = position + 'px';
        }
    }, 15); //loop, a cada 15 milisegundos
}

function createCactus(){//função criar cactus
    const cactus = document.createElement('div');
    let cactusPosition = 1500;//posição cactus
    let randomTime = Math.random() * 6000;//gera valores aleatórios (p/ cactus)
    
    cactus.classList.add('cactus');//classe cactus
    background.appendChild(cactus);//adicionando cactus ao background
    cactus.style.left = cactusPosition + 'px';

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60){//saiu da sala, 60(tamanho cactus)
          clearInterval(leftInterval);//limpa intervalo
          background.removeChild(cactus);//saiu da sala, remove 
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){//verifica posição do cactus
          //game over
          clearInterval(leftInterval);//limpa intervalo
          document.body.innerHTML = '<h1 class="game-over">GAME OVER</h1>';//mensagem de fim de jogo
        }else{
          cactusPosition -= 15;//velocidade movimento (esquerda)
          cactus.style.left = cactusPosition + 'px';
        }
    }, 15);
    setTimeout(createCactus, randomTime);//gera cactus de forma aleatória
}

createCactus();
document.addEventListener('keyup', handleKeyUp);