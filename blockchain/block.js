const SHA256 = require('crypto-js/sha256')

const { DIFICULDADE, MINE_RATE } = require('../config')

class Block {

    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {

        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty || DIFICULDADE // Para o bloco genesis, caso nao haja ele usa a padrão com valor já setado

    }

    toString() {
        return `Block =
                TimeStamp -> ${this.timestamp}
                lastHash -> ${this.lastHash.substring(0, 10)}  
                hash -> ${this.hash.substring(0, 10)}
                nonce -> ${this.nonce}
                Difficulty -> ${this.difficulty}
                data -> ${this.data}     ` // Substring delimita o tamanho das strings de 0 a 10
    }

    //Toda blockchain começa com um bloco genesis (bloco inicial)
    //O static serve para chamar a função sem ter que fazer uma nova instancia (Usando a função diretamente)
    static genesis() {

        return new this('Genesis time', '-------', 'JHHDHDHDHD', [], 0, DIFICULDADE)

    }

    //Novamente static para usar a função diretamente.
    //Configuração de um bloco
    static mineBlock(lastBlock, data) {

        let hash, timestamp
        const lastHash = lastBlock.hash
        let { difficulty } = lastBlock
        let nonce = 0

        //Aqui ele faz a criação do bloco seguindo a diretriz do Proof of Work
        do {

            nonce = nonce + 1
            timestamp = Date.now()
            difficulty = Block.adjustDifficulty(lastBlock, timestamp)
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty)

        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))



        return new this(timestamp, lastHash, hash, data, nonce, difficulty)
    }

    //Algoritmo SHA 256 (Security hash Agreement 256 (bits) ou 32Bytes que representam o hash) -> Serve para gerar um hash
    //Produz um valor especifico de 256 para os data inputs
    //Função chamada One Way Function (De acordo com essa função).... PESQUISAR
    //Pacote adicionado: npm i crypto-js

    //Criação do hash
    static hash(timestamp, lastHash, data, nonce, difficulty) {

        return SHA256(`${timestamp} ${lastHash} ${data} ${nonce} ${difficulty}`).toString() //toString para fazer os testes
        //Ambiente de testes: Módulo Jest: npm i jest --save-dev
        //Procura por arquivos .jest.js 
    }

    static blockHash(block) {

        const { timestamp, lastHash, data, nonce, difficulty } = block

        return Block.hash(timestamp, lastHash, data, nonce, difficulty)
    }

    static adjustDifficulty(lastBlock, currentTime) {

        let { difficulty } = lastBlock
        //recalcula dificuldade:
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1
        return difficulty
    }
}

module.exports = Block;