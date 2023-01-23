//Esse arquivo serve para desenvolver métodos que criarão hashes únicos para o projeto
//Todos os métodos de criptografia ficarão aqui armazenados
const EC = require('elliptic').ec
const ec = new EC('secp256k1') //Secp256k1 é um algoritmo de criptografia de curva eliptica


//Classe de utilidades da corrente
class ChainUtil {

    //Gera chaves publica/privada
    static GeraKeyPair() {
        return ec.genKeyPair()
    }

}

module.exports = ChainUtil