const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const { ObjectId } = require("mongodb")
const cors = require(`cors`);
const { sendGmailUserNeedPayToClinic } = require("../functions/functionsServer");



let infoMedicalFile = express.Router();


let app = express();
app.use(cors());
app.use(express.json());



let db;




connectToDb((err) => {
    if (!err) {
        app.listen(3004, () => {
            console.log('app on port 5000(medical files info)')
        })
        db = getDb();
    }
})




infoMedicalFile.get('/', (req, res) => {

    let allMedical = []

    db.collection('medicalfile')
        .find()
        .sort({ author: 1 })
        .forEach(medical => allMedical.push(medical))
        .then(() => {
            res.status(200).json(allMedical)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




// show how need pay service,this option show in doctor profile page
infoMedicalFile.get('/showHowNeedPay', (req, res) => {


    let MedicalFiles = []

    db.collection('medicalfile')
        .find({ IsActive: "1" })
        .sort({ author: 1 })
        .forEach(fileMedical => MedicalFiles.push(fileMedical))
        .then(() => {
            res.status(200).json(MedicalFiles)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




// show files to need pay in user profile
infoMedicalFile.get('/:Publishby', (req, res) => {


    let MedicalFiles = []

    db.collection('medicalfile')
        .find({ Publish_by: (req.params.Publishby), IsActive: "1" })
        .sort({ author: 1 })
        .forEach(fileMedica => MedicalFiles.push(fileMedica))
        .then(() => {
            res.status(200).json(MedicalFiles)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })

})




// show history pay service user
infoMedicalFile.get('/showHistoryFiles/:Publishby', (req, res) => {


    let MedicalFiles = []

    db.collection('medicalfile')
        .find({ Publish_by: (req.params.Publishby), IsActive: "2" })
        .sort({ author: 1 })
        .forEach(fileMedica => MedicalFiles.push(fileMedica))
        .then(() => {
            res.status(200).json(MedicalFiles)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })

})




// is not active 2
infoMedicalFile.patch('/delete/:id', (req, res) => {

    // const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('medicalfile')
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




// add new medical file
infoMedicalFile.post('/', (req, res) => {

    const user = req.body

    db.collection('medicalfile')

        .insertOne(user)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



infoMedicalFile.post('/showHowNeedPaySendMail/:id', (req, res) => {

    const user = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('medicalfile')
            .findOne({ _id: ObjectId(req.params.id) })
            .then(() => {
                // here we send email to user with info about his debt
                sendGmailUserNeedPayToClinic(user)
                    .then(result => {
                        res.status(200).json(result)
                    })
                    .catch(err => {
                        res.status(500).json({ error: "not fetch the file" })
                    })
            })
            .catch(() => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }
    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }
})




module.exports = infoMedicalFile;