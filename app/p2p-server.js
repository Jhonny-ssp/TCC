//O servidor Peer to Peer permite que várias instancias se conectem umas as outras e cada nó funciona tanto como cliente 
//quanto como servidor
const Websocket = require('ws')

//Porta padrão para o servidor p2p
const P2P_PORT = process.env.P2P_PORT || 5001 // posso especificar a porta ou usar a padrão 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

// $ HTTP_PORT = 3002 P2P_PORT = 5003 PEERS = ws://localhost:5001, ws://localhost:5002 npm run dev

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain
        this.socket = []
    }

    //Método para iniciar servidor
    listen() {
        const servidor = new Websocket.Server({ port: P2P_PORT })
        servidor.on('connection', socket => this.connectSocket(socket))

        this.connectToPeers()
        console.log(`Ouvindo conexões peer-to-peer na porta ${P2P_PORT}`)
    }

    connectToPeers() {
        peers.forEach(peer => {
            const socket = new Websocket(peer)
            socket.on('open', () => this.connectSocket(socket))
        })
    }

    connectSocket(socket) {
        this.socket.push(socket)
        console.log('Socket conectado')

        this.messageHandler(socket)
        this.sendChain(socket)
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain)) // Manda a corrente da blockchain para todos os sockets em forma de STRING
    }

    // Esse método fará com que os multiplos sockets conectados na aplicação se comunicarem entre si na rede blockchain
    // Dessa maneira, ela envia eventos com mensagens para os sockets (com os sockets preparados para ouvir essa mensagem)
    // O dado é passado em JSON para depois, quando chamado, ser convertido em STRING (JSON.stringify)
    messageHandler(socket) {
        socket.on('Message', message => {
            const data = JSON.parse(message)

            this.blockchain.replaceChain(data)
        })
    }

    //Método para sincronizar chains entre os peers 
    syncChain() {
        this.socket.forEach(socket => this.sendChain(socket))
    }
}

module.exports = P2pServer