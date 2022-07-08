const express = require('express');

const cors = require('cors');
const app = express()


app.use(cors())
//Lo que hace es poder leer el body de la solicitud POST que me manda el usuario para poder leerla.
//Parsea la request.body a json para poder leerla
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.body)
    console.log(req.path)
    console.log(req.method)
    console.log('----------')
    next()
})

let phrases = [
    {
        id: 1,
        phrase: 'Este mundo es asombroso',
    },
    {
        id: 2,
        phrase: 'No todo lo que brilla es oro',
    }
]

app.get('/api/phrases', (req, res, next) => {
    res.json(phrases)
})

app.get('/api/phrases/:id', (req, res) => {
    const id = Number(req.params.id) //me da un string con el parametro q le paso por el cliente

    if (!id) res.status(404).end()

    console.log({ id })

    let phrase = phrases.find(phrase => phrase.id === id)

    if (phrase) {
        res.json(phrase)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/phrases/:id', (req, res) => {
    const id = Number(req.params.id)

    if (!id) res.status(404).end()

    phrases = phrases.filter(phrase => phrase.id !== id)

    //204 = NO CONTENT
    res.status(204).end()
})

app.post('/api/phrases', (req, res) => {
    const { body } = req
    console.log(body)

    if (!body || !body.phrase) {
        return res.status(400).json({
            error: 'body.phrase is missing'
        })
    }

    //asignar ID maximo + 1
    const ids = phrases.map(note => note.id) //[1,2]
    console.log(ids)
    const maxId = Math.max(...ids)

    const newPhrase = {
        id: maxId + 1,
        phrase: body.phrase,
        important: Math.random() >= 0.5,
        date: new Date().toISOString()
    }

    phrases = [...phrases, newPhrase]

    res.status(201).json(newPhrase)

})

app.use((req, res) => {
    console.log(req.path)
    console.log('aaa')
    res.status(404).json({
        error: 'Not found'
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log("hello brou")
})

