const dino_elemento = document.getElementById("dino");
let placar = document.getElementById("placar");
let estrada = document.getElementById("estrada");

if(localStorage.getItem("melhor")){
    dino.melhor_pontuacao = localStorage.getItem("melhor");
}

cria_estrada = () => {
    estrada.style.width = (window.innerWidth * 3) + "px";
    estrada.style.top = (window.innerHeight - 300) + "px";
    for (i = 0; i < 150; i++) {
        let posX = Math.floor(Math.random() * ((window.innerWidth * 2) - 20)) + 1;
        let posY = Math.floor(Math.random() * 180) + 10;
        let width = posX % 15;
        let height = posY % 15;
        let pedra = document.createElement("div");
        pedra.style = "position:absolute;background: rgba(99, 83, 60, 0.424); width:" + width + "px; height:" + height + "px; left:" + posX + "px; top:" + posY + "px; border-radius: 45%";
        estrada.appendChild(pedra)
    }
}

let esteira;
let pos_estrada = 0;
let volta_estrada = -(window.innerWidth + 300)
let velocidade_estrada = 2;
anima_estrada = () => {
    esteira = setInterval(() => {
        estrada.style.marginLeft = pos_estrada + "px";
        pos_estrada -= velocidade_estrada;
        if (pos_estrada < volta_estrada) {
            pos_estrada = 0;
            dino.velocidade--;
            dino.velocidade_pulo-=0.2;
            velocidade_estrada+=0.2;

        }
    }, 5)
}

const dino = {
    cor: "#456545",
    velocidade: 300,
    velocidade_pulo: 8,
    pontos: 0,
    pos_ini: (window.innerHeight - 350),
    melhor_pontuacao: 0,
    subindo: false,
    correndo: true,
    jogando: false
}
dino_elemento.style.top = dino.pos_ini + "px";


const cactus = {
    cor: "green",
    galho_topo: "width:20px;height:50px;border-radius:45% 45% 0 0;",
    caule_cima: "margin-left: 20px;",
    caule_baixo: "width: 24px;height: 140px;margin-top:-68px;margin-left: -2px;",
    galho_esquerdo: "margin-top: 35px;",
    galho_horizontal_esquerdo: "width:50px;height:20px;margin-top:-18px;border-radius:0 0 0 50%;",
    galho_direito: "margin-top: 40px; margin-left: 22px;",
    galho_horizontal_direito: "width:50px;height:20px;border-radius:0 0 40% 0%;",
}
const apaga_borda = (x, y, w, h) => {
    let regiao_apagada = document.createElement("div");
    regiao_apagada.style = "position:absolute; background: " + dino.cor + "; margin-left: " + x + "px; margin-top: " + y + "px; width:" + w + "px;height:" + h + "px;";
    dino_elemento.appendChild(regiao_apagada)
}

const correr = setInterval(() => {

    placar.innerHTML = "Pontos: " + dino.pontos+"<br>Melhor pontuação: "+dino.melhor_pontuacao;
    if(dino.jogando){
        if (dino.pontos % 2 === 0) {

            document.getElementById("joelho_direito").style.visibility = "hidden";
            document.getElementById("canela_direita").style.visibility = "hidden";
            document.getElementById("joelho_esquerdo").style.visibility = "visible";
            document.getElementById("canela_esquerda").style.visibility = "visible";
        } else {
            document.getElementById("joelho_direito").style.visibility = "visible";
            document.getElementById("canela_direita").style.visibility = "visible";
            document.getElementById("joelho_esquerdo").style.visibility = "hidden";
            document.getElementById("canela_esquerda").style.visibility = "hidden";
        }
        dino.pontos++;
    }
        

}, dino.velocidade)



const cria_cactus = (cor, c) => {
    let cactus = document.createElement("div");
    cactus.setAttribute("id", "cactus1")
    cactus.style = "width:102px;height:162px;z-index:2; position:absolute; left: " + window.innerWidth + "px";
    let superior = document.createElement("div");
    superior.style.display = "flex";
    cactus.appendChild(superior);
    let galho_esquerdo = document.createElement("div");
    galho_esquerdo.style = c.galho_topo + c.galho_esquerdo + "background:" + cor;
    superior.appendChild(galho_esquerdo);
    let caule_cima = document.createElement("div");
    caule_cima.style = c.galho_topo + c.caule_cima + "background-color: " + cor + ";";
    superior.appendChild(caule_cima);
    let galho_direito = document.createElement("div");
    galho_direito.style = c.galho_topo + c.galho_direito + "background:" + cor;
    superior.appendChild(galho_direito);
    cactus.appendChild(superior);
    let inferior = document.createElement("div");
    inferior.style.display = "flex";
    cactus.appendChild(inferior);
    let galho_horizontal_esquerdo = document.createElement("div");
    galho_horizontal_esquerdo.style = c.galho_horizontal_esquerdo + "background:" + cor + ";";
    inferior.appendChild(galho_horizontal_esquerdo);
    let caule_baixo = document.createElement("div");
    caule_baixo.style = c.caule_baixo + "background: " + cor;
    inferior.appendChild(caule_baixo)
    let galho_horizontal_direito = document.createElement("div");
    galho_horizontal_direito.style = c.galho_horizontal_direito + "background:" + cor + ";";
    inferior.appendChild(galho_horizontal_direito);
    cactus.appendChild(inferior);
    document.querySelector("#estrada").appendChild(cactus)
}


document.body.onkeyup = function (e) {
    if ((e.keyCode == 32 || e.keyCode == 38) && dino.correndo) {
        pular()
    }
    if ((e.keyCode == 32 || e.keyCode == 38) && !dino.jogando) {
        jogar()
        dino.jogando = true;
        document.getElementById("info_").style.display = "none";
    }
}
var pulando
const pular = () => {
    dino.correndo = false;
    dino.subindo = true;
    let gravidade = 5;
    pulando = setInterval(() => {
        document.getElementById("joelho_direito").style.visibility = "visible";
        document.getElementById("canela_direita").style.visibility = "visible";
        document.getElementById("joelho_esquerdo").style.visibility = "visible";
        document.getElementById("canela_esquerda").style.visibility = "visible";
        if (dino.subindo) {
            dino_elemento.style.top = (parseInt(dino_elemento.style.top) - gravidade) + "px";
            gravidade -= 0.05;
        } else {
            dino_elemento.style.top = (parseInt(dino_elemento.style.top) + gravidade) + "px";
            gravidade += 0.05
        } if (parseInt(dino_elemento.style.top) < (dino.pos_ini - 300))
            dino.subindo = false;
        if (parseInt(dino_elemento.style.top) > dino.pos_ini) {
            dino_elemento.style.top = dino.pos_ini + "px";
            clearInterval(pulando);
            dino.correndo = true;
        }
    }, dino.velocidade_pulo)
}
// Modal do final do jogo
let modal = document.getElementById("final");

// X que fecha o modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
  window.location.reload();
}

// Modal fecha se clicar fora de sua área
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    window.location.reload();
  }
}

let dino_vivo = setInterval(() => {
    // Pega o top do dinossauro e top e left do cactus
    // independente de onde eles estejam.
    let dinoTop = dino_elemento.getBoundingClientRect().y
    let cactusLeft = cactus1.getBoundingClientRect().x
    let cactusTop = cactus1.getBoundingClientRect().y
    // Detecta a colisão
    if (cactusLeft < 315 && cactusLeft > 100 && dinoTop >= cactusTop - 160) {
        // Fim de jogo
        clearInterval(correr);
        clearInterval(esteira);
        if(dino.pontos > dino.melhor_pontuacao)
            dino.melhor_pontuacao = dino.pontos;
        modal.style.display = "block";
        document.getElementById("pontos").innerHTML = "Pontuaçao final: "+dino.pontos+"<br>Melhor Pontuação: "+ dino.melhor_pontuacao;
        
    }
}, 20);

cria_estrada()
apaga_borda(111, -190, 66, 5)
apaga_borda(107, -155, 30, 5)
apaga_borda(144, -110, 5, 5)
apaga_borda(107, -135, 25, 60)
apaga_borda(90, -120, 32, 60)
apaga_borda(74, -116, 38, 67)
apaga_borda(74, -116, 38, 67)
apaga_borda(64, -106, 38, 57)
apaga_borda(49, -92, 38, 47)
apaga_borda(22, -78, 38, 34)
apaga_borda(12, -88, 20, 30)
apaga_borda(2, -98, 20, 30)
apaga_borda(2, -112, 8, 10)
apaga_borda(37, -50, 25, 10)
apaga_borda(37, -30, 15, 10)
apaga_borda(37, -18, 8, 10)
apaga_borda(81, -50, 15, 10)
apaga_borda(88, -32, 8, 10)
apaga_borda(88, -18, 8, 10)


const jogar = () => {
    anima_estrada()
    cria_cactus(cactus.cor, cactus);
} 