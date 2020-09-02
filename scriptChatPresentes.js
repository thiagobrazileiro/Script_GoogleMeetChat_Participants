//Para executar o arquivo basta escreve node scriptChatPresentes.js parametro
//"parametro" é o nome do arquivo que você deseja ler
var input = require('fs').readFileSync(process.argv[2], 'utf8');
var fs = require('fs');
var lines = input.split('\n');

var linha = lines.shift();
var entrou = 0;

class Presente{
    constructor(nome,participacoes){
        this.nome = nome;
        this.participacoes = participacoes;
    }
};

var presentes = [];

while(linha != null){

    var acoes = linha.split(':');

    if(acoes.length > 1 && acoes[1][0] === ' '){

        for(var i = 0; i< presentes.length;i++){
            if(acoes[0] === presentes[i].nome){
                entrou = 1;
                presentes[i].participacoes++;
                break;
            }
        }

        if(entrou === 0){
            presentes.push(new Presente(acoes[0],1));
        }
        entrou = 0;

    }

    linha = lines.shift();
}

var stream = fs.createWriteStream(process.argv[2]+".Presentes.txt");
stream.once('open', function(fd) {
    for(var i = 0; i< presentes.length;i++){
        stream.write(presentes[i].nome+'\n');   
    }
    stream.end();
});
