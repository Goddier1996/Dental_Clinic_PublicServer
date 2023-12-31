const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const { ObjectId } = require("mongodb")
const cors = require(`cors`)



let infoHours = express.Router();


let app = express();
app.use(cors());
app.use(express.json());



let db;




connectToDb((err) => {
    if (!err) {
        app.listen(3003, () => {
            console.log('app on port 5000(hours info)')
        })
        db = getDb();
    }
})




infoHours.get('/', (req, res) => {

    let allHours = []

    db.collection('hours')
        .find({ IsActive: "1" })
        .sort({ Hour_day: 1 })
        .forEach(hour => allHours.push(hour))
        .then(() => {
            res.status(200).json(allHours)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



infoHours.get('/:code', (req, res) => {


    let codeAllHours = []

    db.collection('hours')
        .find({ Serial_code: req.params.code })
        .sort({ Hour_day: 1 })
        .forEach(codeHour => codeAllHours.push(codeHour))
        .then(() => {
            res.status(200).json(codeAllHours)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })

})




// is not active 2
infoHours.patch('/NotActive/:id', (req, res) => {

    // const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('hours')
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
infoHours.patch('/active/:id', (req, res) => {

    // const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('hours')
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




module.exports = infoHours;