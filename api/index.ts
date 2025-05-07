import express from 'express'
import cors from 'cors'

// Rotas
import usuariosRoutes from './routes/usuarios'
import produtosRoutes from './routes/produtos'
import categoriasRoutes from './routes/categorias'
import pedidosRoutes from './routes/pedidos'
import empresasRoutes from './routes/empresa' // <- adiciona isso

const app = express()
const port = 3004

app.use(express.json())
app.use(cors())

app.use("/usuarios", usuariosRoutes)
app.use("/produtos", produtosRoutes)
app.use("/categorias", categoriasRoutes)
app.use("/pedidos", pedidosRoutes)
app.use("/empresa", empresasRoutes) // <- e isso

app.get('/', (req, res) => {
  res.send('API: Cardápio Digital')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
