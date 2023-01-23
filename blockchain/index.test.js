const Block = require('./block')
const Blockchain = require('./index')

//Argumentos describe -> String que descreve a classe que esta testando e depois uma func callback error
//Expect -> Valida o que é esperado que eu quero que seja feito
describe('Blockchain', () => {

    let bc
    let bc2

    beforeEach(() => {
        bc = new Blockchain
        //Váriavel para adicionar um bloco ao outro: bc2 ao bc
        bc2 = new Blockchain
    })

    //Primeiro parametro it - String que descreve o que o método faz
    it('Começando com o bloco Genesis', () => {
        expect(bc.chain[0]).toEqual(Block.genesis())
    })

    it('Adição de novo bloco', () => {

        const data = 'Arquivo.pdf'
        bc.addBlock(data)

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
    })

    //Validação do método "isValidChain"
    it('Validação de chain válida', () => {
        bc2.addBlock('$500') // Segundo bloco da chain com o conteudo 

        expect(bc.isValidChain(bc2.chain)).toBe(true)
    })

    it('Invalida uma chain com Bloco Genesis corrompido', () => {
        bc2.chain[0].data = '$0'

        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    it('Invalida qualquer bloco que esteja corrompido', () => {
        bc2.addBlock('$200')
        bc2.chain[1].data = '$0'

        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    it('Substituição de chain com uma chain válida', () => {
        bc2.addBlock('$600')
        bc.replaceChain(bc2.chain)

        expect(bc.chain).toEqual(bc2.chain)
    })

    it('Não Substituir a chain de tamanho igual ou menor que a chain atual', () => {
        bc.addBlock('$200') // BC tem o bloco genesis e + 1 bloco que é o bloco 1 com valor $200
        bc.replaceChain(bc2.chain) // A troca não vai ocorrer porque bc tem um bloco a mais e bc2 tem apenas o bloco Genesis 

        expect(bc.chain).not.toEqual(bc2.chain)
    })

})