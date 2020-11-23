const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)
/*
class Product {
    constructor(title, price, imageUrl, description, id, userId) {
        this.title = title
        this.price = price
        this.imageUrl = imageUrl
        this.description = description
        this._id = id ? new mongodb.ObjectId(id) : null
        this.userId = userId
    }

    save() {
        const db = getDb()
        let dbOp
        if (this._id) {
            //Update the product
            dbOp = db.collection('products')
                .updateOne({ _id: this._id }, { $set: this })
        } else {
            dbOp = db.collection('products').insertOne(this)
        }
        return dbOp
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

    static deleteById(prodId) {
        const db = getDb()
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(() => {
                console.log('deleted')
            })
            .catch(err => console.error(err))
    }

}


module.exports = Product */