const DIFICULDADE = 4 // Quanto maior a dificuldade, maior a segurança e mais dificuldade computacional para registrar um bloco
const MINE_RATE = 3000 // Const de taxa de mineração (em segundos)
const INITIAL_VALUE = 0

module.exports = { DIFICULDADE, MINE_RATE, INITIAL_VALUE }


//Dificuldade Dinamica x Estatica
/*
Estática -> Valor constante, setado antes 
E o tempo pra gerar o hash é o mesmo, porém quanto mais peers na rede, é preciso aumentar a dificuldade dinamicamente

Lógica da dificuldade dinamica: 

Quantos mais peers entram, é necessário aumentar a dificuldade de geração de um bloco

O mecanismo funcionará da seguinte forma: Primeiro eu faço um check do timestamp de um bloco e comparo com o do bloco anterior
Se o do bloco atual for menor que o do anterior, entao percebe-se que o atual foi registrado mais rapidamente que o anterior
Por isso é necessário aumentar a dificuldade do bloco atual, e assim se o timestamp do atual for maior que o do anterior, significa que 
ele foi registrado com maior dificuldade.

*/ 