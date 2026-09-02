import express from 'express'
import cors from 'cors'

import routesFilmes from './routes/filmes'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/filmes", routesFilmes)

app.get('/', (req, res) => {
  res.send('API: Revenda de Veículos')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})