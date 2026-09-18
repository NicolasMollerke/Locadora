import express from 'express'
import cors from 'cors'
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

import routesFilmes from './routes/filmes'
import routesClientes from './routes/clientes'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/filmes", routesFilmes)
app.use("/clientes", routesClientes)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('API: Locadora de Filmes')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})