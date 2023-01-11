import fs from 'fs'

export class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./archivos/products.json";
  }

  async getProducts(limit) {
    if (fs.existsSync(this.path)) {
      const products = await fs.promises.readFile(this.path, "utf-8");
      if (limit === "max") {
        return JSON.parse(products);
      } else {
        return JSON.parse(products).slice(0, limit);
      }
    } else {
      return [];
    }
  }


  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        return console.log("Error, deberá incorporar los campos obligatorios");
      } else {
        const isCode = this.#evaluarCode(code);
        if (isCode) {
          console.log("El código ya existe, intenta nuevamente");
        } else {
          const product = {
            id: await this.#generarId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
          };
          const products = await this.getProducts();
          products.push(product);
          await fs.promises.writeFile(this.path, JSON.stringify(products));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(idProduct){
    const products = await this.getProducts()
    const product = products.find((e)=> e.id === parseInt(idProduct))
    if (product){
      return product
    } else {
      return 'Producto no encontrado'
    }
  }

  async updateProduct(idProduct, change) {
    let read = await fs.promises.readFile(this.path, "utf-8");
    read = JSON.parse(read);
    let product = await this.getProductById(idProduct);
    if (product) {
      product = { ...product, ...change };
      read = read.map((prod) => {
        if (prod.id == product.id) {
          prod = product;
        }
        return prod;
      });
      read = JSON.stringify(read, null, 2);
      await fs.promises.writeFile(this.path, read);
      console.log(JSON.parse(read));
      return read;
    } else {
      return null;
    }
  }

  async deleteProduct(idProduct) {
    let read = await fs.promises.readFile(this.path, "utf-8");
    read = JSON.parse(read);
    let product = await this.getProductById(idProduct);
    if (product) {
      const filtrado = read.filter((prod) => prod.id != idProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(filtrado, null, 2));
      return filtrado;
    }
  }

  async #generarId() {
    const products = await this.getProducts();
    let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
    return id;
  }

  #evaluarProductoId(id) {
    return this.products.find((product) => product.id === id);
  }

  #evaluarCode(code) {
    return this.products.find((product) => product.code === code);
  }
}

// const product = new ProductManager('products.json');

//PRUEBAS

// async function prueba() {
//   // await product.addProduct(
//   //   "Producto 3",
//   //   "Descripcion 3",
//   //   50,
//   //   "ssss.com",
//   //   "oooo",
//   //   50
//   // );
//   // await product.addProduct(
//   //   "Producto 4",
//   //   "Descripcion 4",
//   //   20,
//   //   "ssss.com",
//   //   "oooo",
//   //   50
//   // );

// const product = await product.getProductById(1)
// console.log(product)
// }

// prueba();