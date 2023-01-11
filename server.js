import express from 'express'
import { ProductManager } from './index.js'
const app = express()
const productManeger = new ProductManager('products.json')

app.get('/products', async (req, res) => {
  const { limit } = req.query
  const products = await productManeger.getProducts (limit || 'max')
  res.json({ products })
})

app.get('/products/:idProduct', async (req, res) => {
  const { idProduct } = req.params
  const product = await productManeger.getProductById(idProduct)
  res.json({ product })
})

const PORT = 8080

app.listen(PORT, () => {
  console.log(`Escuchando al ${PORT}`)
})