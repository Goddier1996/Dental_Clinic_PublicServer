const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const { ObjectId } = require("mongodb")
const cors = require(`cors`)



let infoDays = express.Router();


let app = express();
app.use(cors());
app.use(express.json());



let db;




connectToDb((err) => {
    if (!err) {
        app.listen(3002, () => {
            console.log('app on port 5000(days info)')
        })
        db = getDb();
    }
})




infoDays.get('/', (req, res) => {

    let allDays = []

    db.collection('days')
        .find()
        .sort({ Serial_code: 1 })
        .forEach(day => allDays.push(day))
        .then(() => {
            res.status(200).json(allDays)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




infoDays.get('/:code', (req, res) => {

    db.collection('days')
        .findOne({ Serial_code: (req.params.code) })

        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })

})




// is not active 2
infoDays.patch('/NotActive/:id', (req, res) => {

    // const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('days')
            .updateOne({ _id: ObjectId(req.params.id) }, { $set: { IsActive: "2" } })

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



// is active 1
infoDays.patch('/active/:id', (req, res) => {

    // const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('days')
            .updateOne({ _id: ObjectId(req.params.id) }, { $set: { IsActive: "1" } })

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




module.exports = infoDays;