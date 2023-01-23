//Criação de API para iteração de usuários dentro da Blockchain
//Foi feita instalação do módulo Express para construção da API - npm i express --save

const express = require('express')
const Blockchain = require('../blockchain')
const HTTP_PORT = process.env.HTTP_PORT || 3001; // Se não especificar a porta no terminal, rodar na 3001 (padrão)
//$ HTTP_PORT = 3002 npm run dev --> Comando para especificar porta que a aplicação vai rodar no terminal
const P2pServer = require('./p2p-server')

const app = express()
const bc = new Blockchain()
const p2pServer = new P2pServer(bc)

app.use(express.json())

//Get com o objeto app -> Retorna o que ja foi armazenado na Blockchain
app.get('/blocks', (req, res) => {
    res.json(bc.chain)
})

//Método post para usuários poderem adicionar (minerar) blocos na blockchain
app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data) // Aqui usa o método de adicionar bloco com o tipo de dado que eu passei na requisição
    console.log(`Novo bloco adicionado: ${block.toString()}`)

    p2pServer.syncChain()

    res.redirect('/blocks')
})

app.listen(HTTP_PORT, () => console.log(`Ouvindo na porta ${HTTP_PORT}`))
p2pServer.listen()