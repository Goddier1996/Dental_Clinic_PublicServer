const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const { ObjectId } = require("mongodb")
const cors = require(`cors`)



let reviews = express.Router();


let app = express();
app.use(cors());
app.use(express.json());



let db;




connectToDb((err) => {
    if (!err) {
        app.listen(3005, () => {
            console.log('app on port 5000(reviews info)')
        })
        db = getDb();
    }
})






reviews.get('/', (req, res) => {

    let allReviews = []

    db.collection('reviews')
        .find({ IsActive: "1" })
        // .sort({ author: 1 })
        .forEach(review => allReviews.push(review))
        .then(() => {
            res.status(200).json(allReviews)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




// show count reviews how active
reviews.get('/countReviews', (req, res) => {

    let allUsersActive = []

    db.collection('reviews')
        .find({ IsActive: "1" })
        .sort({ author: 1 })
        .forEach(user => allUsersActive.push(user))
        .then(() => {
            res.status(200).json(allUsersActive.length)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})





reviews.get('/:PublishBy', (req, res) => {


    let reviewUser = []

    db.collection('reviews')
        .find({ Publish_by: (req.params.PublishBy), IsActive: "1" })
        .sort({ author: 1 })
        .forEach(revi => reviewUser.push(revi))
        .then(() => {
            res.status(200).json(reviewUser)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })

})





// delete a review in user
reviews.delete('/delete/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        db.collection('reviews')
            .deleteOne({ _id: ObjectId(req.params.id) })

            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }

    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }
})





// add new reviews
reviews.post('/', (req, res) => {

    const review = req.body

    db.collection('reviews')

        .insertOne(review)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})





// add likes to array
reviews.patch('/:id', (req, res) => {

    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('reviews')
            .updateOne({ _id: ObjectId(req.params.id) }, { $push: { Count_likes: updates } })

            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }

    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }
})




module.exports = reviews;