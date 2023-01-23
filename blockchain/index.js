//CHAIN -> Array de blocos, onde o primeiro é o Bloco Genesis 
//Genesis habilita o array a adicionar um bloco no final do array
//Esse bloco é baseado no seu ultimo bloco

const Block = require('./block')

class Blockchain {
    constructor() {

        this.chain = [Block.genesis()] // Bloco genesis como primeiro bloco da chain

    }

    //Esse método permite que novos blocos sejam adicionados no array chain (no final do array)
    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1]
        const block = Block.mineBlock(lastBlock, data)
        this.chain.push(block)

        return block
    }
    //Método para validação de chains adicionadas na chain
    isValidChain(chain) {

        //Certifica de que o primeiro bloco é o Genesis (primeiro bloco da cadeia)
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
            return false

        for (let i = 1; i < chain.length; i++) {

            const block = chain[i]
            const lastBlock = chain[i - 1]
            //Valida se cada bloco atual tem o campo lastHash igual ao hash do bloco anterior (Primeria condição)
            //Na segunda condição, Ele compara o hash do bloco com o hash CRIADO desse mesmo bloco (Para evitar a criação de blocos corrompidos)
            if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
                return false
            }
        }

        return true
    }

    //Método para substituir chain(corrente) válida caso uma nova seja inclusa. Para isso ela precisa ser maior e válida
    replaceChain(newChain) {

        if (newChain.length <= this.chain.length) {
            console.log('Chain não tem tamanho suficiente (Precisa ser maior que a atual)')
            return
        }
        else if (!this.isValidChain(newChain)) {
            console.log('Chain não é válida')
            return
        }
        console.log('Substituindo blockchain com a nova chain')
        this.chain = newChain
        return newChain
    }

}
module.exports = Blockchain