const mongodb = require('mongodb')
const getDb = require('../utils/database').getDb

class Product {
    constructor(title, price, imageUrl, description) {
        this.title = title
        this.price = price
        this.imageUrl = imageUrl
        this.description = description
    }

    save() {
        const db = getDb()
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result)
            })
            .catch(err => console.error(err))
    }

    static fetchAll() {
        const db = getDb()
        return db.collection('products')
            .find()
            .toArray() //using only for small amount of documents, otherwise use pagination
            .then(products => {
                return products
            })
            .catch(err => console.error(err))
    }

    static findById(prodId) {
        const db = getDb()
        return db.collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(product => {
                return product
            })
            .catch(err => console.error(err))
    }
}


module.exports = Product