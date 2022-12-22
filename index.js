class ProductManager {

    constructor() {
      this.products = []
    }
  
    getProducts(){
      return console.log(this.products)
    }
  
  
    addProduct(title, description, price, thumbnail, code, stock) {
      
      if(!title || !description || !price || !thumbnail || !code || !stock) {
        return console.log('Se deben completar los campos obligatorios');
      } else {
        const isCode = this.evaluarCode(code)
          if(isCode){
            console.log('El código ya existe, intenta nuevamente')
          } else {
            const product = {
            id: this.generarId(), 
            code,
            title,
            description,
            price,
            thumbnail,
            stock,
          }
          this.products.push(product)
        }
      }
  
    }
  
    getProductById(idProduct){
      const productFound = this.evaluarProductoId(idProduct)
      if(productFound){
        console.log(productManager)
      } else {
        console.log('Producto no encontrado')
      }
    }
  
    generarId() {
        let id =
          this.products.length === 0
            ? 1
            : this.products[this.products.length - 1].id + 1
        return id
      }
    
      evaluarProductoId(id){
        return this.products.find(product => product.id === id)
      }
    
      evaluarCode(code){
        return this.products.find(product => product.code === code)
      }
  }
  
  const product = new ProductManager()

//Pruebas 
const productManager = new ProductManager()

productManager.addProduct('la', 'al', 100,'prueba.com','abc123',100),
productManager.addProduct('3543', 'el', 100,'prueba.com','xyz123',100),

console.log(productManager)

product.getProductById(2)

