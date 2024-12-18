const nodemailer = require('nodemailer');


async function sendGmail(dataUser) {

    // here connect to nodemailer send mail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your mail',
            pass: 'your password'
        }
    });

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
      <img src="https://i.postimg.cc/gjHhq6WS/logo-clinic.jpg" alt="Doctor" width="auto" height="150">
    </div>
   `, // html body
    });

    console.log("Message sent: %s", info.messageId);
}


module.exports = { sendGmail };