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



module.exports = infoDays;