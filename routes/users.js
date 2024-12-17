const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const { ObjectId } = require("mongodb")
const cors = require(`cors`)
const nodemailer = require('nodemailer');



let users = express.Router();


let app = express();
app.use(cors());
app.use(express.json());



let db;
connectToDb((err) => {
    if (!err) {
        app.listen(3006, () => {
            console.log('app on port 5000(users info)')
        })
        db = getDb();
    }
})




// show all active users
users.get('/', (req, res) => {

    let allUsersActive = []

    db.collection('users')
        .find({ IsActive: "1", UserType_code: "1" })
        .sort({ author: 1 })
        .forEach(user => allUsersActive.push(user))
        .then(() => {
            res.status(200).json(allUsersActive)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




// show count users how active
users.get('/countUsers', (req, res) => {

    let allUsersActive = []

    db.collection('users')
        .find({ IsActive: "1", UserType_code: "1" })
        .sort({ author: 1 })
        .forEach(user => allUsersActive.push(user))
        .then(() => {
            res.status(200).json(allUsersActive.length)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



// show count doctors how active
users.get('/countDoctors', (req, res) => {

    let allUsersActive = []

    db.collection('users')
        .find({ IsActive: "1", UserType_code: "2" })
        .sort({ author: 1 })
        .forEach(user => allUsersActive.push(user))
        .then(() => {
            res.status(200).json(allUsersActive.length)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})





// show all users how have a turn
users.get('/showTurnUsers', (req, res) => {

    let allUsers = []

    db.collection('users')
        .find({ IsActive: "1", Day_date: { $ne: null } })
        .sort({ author: 1 })
        .forEach(user => allUsers.push(user))
        .then(() => {
            res.status(200).json(allUsers)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




// show all users how have a turn
users.get('/showTurnUsers', (req, res) => {

    let allUsers = []

    db.collection('users')
        .find({ IsActive: "1", Day_date: { $ne: null } })
        .sort({ author: 1 })
        .forEach(user => allUsers.push(user))
        .then(() => {
            res.status(200).json(allUsers)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




// show all doctors
users.get('/doctors', (req, res) => {

    let allUsersActive = []

    db.collection('users')
        .find({ IsActive: "1", UserType_code: "2" })
        .sort({ author: 1 })
        .forEach(user => allUsersActive.push(user))
        .then(() => {
            res.status(200).json(allUsersActive)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})


// here connect to nodemailer send mail
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your mail',
        pass: 'your password mail'
    }
});




// function send Email user if have turn
async function sendGmail(dataUser) {

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Doctor Artem" <your mail>', // sender address
        to: dataUser.Email, // list of receivers
        subject: `An Appointment at a Dental Clinic`, // Subject line
        // text: "", // plain text body
        html: `
        <div>
          <p>Hello you have Appointment at Clinic 🙂
          <br/><br/>
          Info about your Appointment:<br/>
          <b>Date:</b> ${dataUser.DateUserTurn} <br/>
          <b>Day:</b> ${dataUser.Day_date} <br/>
          <b>Time:</b> ${dataUser.Hour_day}<br/><br/><br/><br/>
             Thank you very much. See you at our meeting at the clinic 😁
          </p>
          <img src="https://i.postimg.cc/gjHhq6WS/logo-clinic.jpg" alt="Girl in a jacket" width="auto" height="150">
        </div>
       `, // html body
    });

    console.log("Message sent: %s", info.messageId);
}



// add turn to user
users.patch('/addTurnUser/:id', (req, res) => {

    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('users')
            .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
            .then(() => {
                // send mail to user info about turn he save !
                sendGmail(updates)
                    .then(result => {
                        res.status(200).json(result)
                    })
                    .catch(err => {
                        res.status(500).json({ error: "not fetch the file" })
                    })
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }
    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }
})




// find user with email , if user forget a password we create this
users.post('/findUser', (req, res) => {

    let Email = req.body.Email

    db.collection('users')
        .findOne({ IsActive: "1", Email: Email })

        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




// connect login user or doctor,admin
users.post('/login', (req, res) => {


    let User_Login = req.body.User_Login
    let User_password = req.body.User_password


    db.collection('users')
        .findOne({ User_Login: User_Login, User_password: User_password, IsActive: "1" })

        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })


})




users.patch('/active/:id', (req, res) => {

    // const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('users')
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




// show add block users
users.get('/BlockUsers', (req, res) => {

    let allUsers = []

    db.collection('users')
        .find({ IsActive: "2", UserType_code: "1" })
        .sort({ author: 1 })
        .forEach(user => allUsers.push(user))
        .then(() => {
            res.status(200).json(allUsers)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




// is not active 2
users.patch('/NotActive/:id', (req, res) => {

    // const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('users')
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




// show all doctors
users.get('/showDoctors', (req, res) => {

    let allUsers = []

    db.collection('users')
        .find({ IsActive: "1", UserType_code: "2" })
        .sort({ author: 1 })
        .forEach(user => allUsers.push(user))
        .then(() => {
            res.status(200).json(allUsers)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




users.patch('/:id', (req, res) => {

    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('users')
            .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })

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




users.put('/:id', (req, res) => {

    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('users')
            .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })

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




// add new users

users.post('/findLogin', (req, res) => {

    let User_Login = req.body.User_Login

    db.collection('users')
        .findOne({ IsActive: "1", User_Login: User_Login })

        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})


users.post('/findEmail', (req, res) => {

    let Email = req.body.Email

    db.collection('users')
        .findOne({ IsActive: "1", Email: Email })

        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



users.post('/', (req, res) => {

    const user = req.body

    db.collection('users')

        .insertOne(user)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




users.get('/:id', (req, res) => {


    if (ObjectId.isValid(req.params.id)) {

        db.collection('users')
            .findOne({ _id: ObjectId(req.params.id) })

            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }

    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }


})




module.exports = users;