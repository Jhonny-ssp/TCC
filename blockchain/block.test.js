const Block = require('./block')

//const { DIFICULDADE } = require('../config')


//Testes da classe Block  (describe, it vem do módulo JEST)
//Argumentos -> String que descreve a classe que esta testando e depois uma func callback error
describe('Block', () => {

    let data, lastBlock, block

    beforeEach(() => {
        data = 'index.html'
        lastBlock = Block.genesis()
        block = Block.mineBlock(lastBlock, data)
    })

    it('Comparação do dado do bloco com o bloco', () => {
        expect(block.data).toEqual(data)
    })

    it('Comparação entre o Last Hash e o Last Bock', () => {
        expect(block.lastHash).toEqual(lastBlock.hash)
    })

    it('Gera um hash que parea com a dificuldade'), () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty))
    }

    it('Diminui a dificuldade para blocos registrados lentamente', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1)
    })

    it('Aumenta a dificuldade de blocos registrados rapidamente', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1)
    })

})