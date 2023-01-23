const { INITIAL_VALUE } = require('../config')
const util = require('../chain-util')

class Carteira {
    constructor() {
        this.certificado = INITIAL_VALUE
        this.keyPair = util.GeraKeyPair()
        this.publicKey = this.keyPair.getPublic().encode('hex')
    }

    //Novas instancias dessa classe passam para string
    toString() {
        return `
            Carteira:

            Chave pública -> ${this.publicKey.toString()}
            Certificados -> ${this.certificado.toString()}
        `
    }
}

module.exports = Carteira