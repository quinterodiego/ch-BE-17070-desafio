const fs = require('fs').promises
const path = require('path')

class Product {
    constructor(name) {
        this.pathFile = path.join(__dirname, name)
    }

    lastID(listProducts) {
        let id = 0

        if(listProducts.length > 0) {
            id = listProducts[listProducts.length - 1].id
        }

        return id
    }

    async fileExists() {
        try {
            await fs.access(this.pathFile)
            return true
        } catch (error) {
            return false
        }
    }

    async save(product) {
        try {
            const existsFile = await this.fileExists()
            if(!existsFile){
                await fs.writeFile(this.pathFile, JSON.stringify([], null, 2), "utf8")
            }

            const products = await fs.readFile(this.pathFile, 'utf-8')
            const data = JSON.parse(products)
            const id = this.lastID(data)
            data.push({ ...product, id: id + 1})
            await fs.writeFile(this.pathFile, JSON.stringify(data, null, 2), "utf8")
            console.log('ID: ', id + 1)

        } catch (error) {
            console.log('Hubo un error', error)
        }
    }

    async getById(id) {
        try {
            const products = await fs.readFile(this.pathFile, 'utf-8')
            const data = JSON.parse(products)
            const product = data.find(p => p.id === id)    
            return product
        } catch (error) {
            console.log('Hubo un error', error)
        }
    }

    async getAll() {
        try {
            const products = await fs.readFile(this.pathFile, 'utf-8')
            const data = JSON.parse(products)
            return JSON.stringify(data)
        } catch (error) {
            console.log('Hubo un error', error)
        }
    }

    async updateById(product) {
        try {
            const id = parseInt(product.id)
            const allProducts = await this.getAll()
            const parseProducts = JSON.parse(allProducts)
            const lessProducts = parseProducts.filter(p => p.id !== id)
            lessProducts.push(product)
            lessProducts.sort(function(a, b) { 
                return a.id - b.id
            });        
            await fs.writeFile(this.pathFile, JSON.stringify(lessProducts, null, 2), "utf8")
        } catch (error) {
            console.log('Hubo un error', error)
        }
    }

    async deleteById(id) {
        try {
            const products = await fs.readFile(this.pathFile, 'utf-8')
            const data = JSON.parse(products)
            const newProducts = data.filter(p => p.id !== id)
            await fs.writeFile(this.pathFile, JSON.stringify(newProducts, null, 2), "utf8")
        } catch (error) {
            console.log('Hubo un error', error)
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.pathFile, '[]', "utf8")
        } catch (error) {
            console.log('Hubo un error', error)
        }
    }
}

module.exports = Product