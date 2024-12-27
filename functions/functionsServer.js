const nodemailer = require('nodemailer');


// here we send email to user with info about his appointment
async function sendGmailAboutAppointment(dataUser) {

    // here connect to nodemailer send mail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Your mail',
            pass: 'Your password'
        }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Doctor Artem" <mail>', // sender address
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



// here we send email to user with info about his registration
async function sendGmailWhenUserRegister(dataUser) {

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
        from: '"Admin Dental Clinic" <mail>', // sender address
        to: dataUser.Email, // list of receivers
        subject: `Successfully Registered to the Dental Clinic`, // Subject line
        // text: "", // plain text body
        html: `
    <div>
      <p>Welcome to our Clinic 🙂
      <br/><br/>
      You have successfully registered on our clinic's website 😊<br/>
      <br/>
      💡 Now you have the option to book an appointment with a dentist online.
      <br/>
      <b>Thank you very much. See you at our meeting at the clinic 😁</b>
      <br/><br/>
      <img src="https://i.postimg.cc/gjHhq6WS/logo-clinic.jpg" alt="Doctor" width="auto" height="150">
    </div>
   `, // html body
    });

    console.log("Message sent: %s", info.messageId);
}




// here we send email to user with info about his debt
async function sendGmailUserNeedPayToClinic(dataUser) {

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
        from: '"Doctor Dental Clinic" <mail>', // sender address
        to: dataUser.email, // list of receivers
        subject: `Dental Clinic Debt Notification`, // Subject line
        // text: "", // plain text body
        html: `
    <div>
      <p>Hello ${dataUser.name} You have to pay for the service ! 
      <br/><br/>
      You have a debt <b>${dataUser.priceSevice}</b>$ with us, please pay for the service you received !!<br/>
      <br/>
      Enter your personal area on the website, you should pay for the service.
      <br/><br/>
      <b>Thank you very much. See you at our meeting at the clinic 😁</b>
      <br/><br/>
      <img src="https://i.postimg.cc/gjHhq6WS/logo-clinic.jpg" alt="Doctor" width="auto" height="150">
    </div>
   `, // html body
    });

    console.log("Message sent: %s", info.messageId);
}




// here close user turn, because he dont come to the clinic
async function sendGmailCloseUserTurnDontCome(dataUser) {

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
        from: '"Admin Dental Clinic" <mail>', // sender address
        to: dataUser.Email, // list of receivers
        subject: `Dental Clinic CLose Your Turn`, // Subject line
        // text: "", // plain text body
        html: `
    <div>
      <p>Hello ${dataUser.FirstName} Today was your turn ! 
      <br/><br/>
       You did not come to the clinic today, we are sorry but we have to close your turn.<br/>
      <b>Thank you very much.</b>
      <br/><br/>
      <img src="https://i.postimg.cc/gjHhq6WS/logo-clinic.jpg" alt="Doctor" width="auto" height="150">
    </div>
   `, // html body
    });

    console.log("Message sent: %s", info.messageId);
}



// here close user turn, because he dont come to the clinic
async function sendGmailDeleteAccountMessage(dataUser) {

    // here connect to nodemailer send mail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youe mail',
            pass: 'your password'
        }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Admin Dental Clinic" <mail>', // sender address
        to: dataUser.email, // list of receivers
        subject: `Dental Clinic Message`, // Subject line
        // text: "", // plain text body
        html: `
    <div>
      <p>Hello ${dataUser.name} You have successfully deleted your dental clinic user ! 
      <br/><br/>
       If you want, you can restore your user, send a message to the site's admin.<br/>
       <a href="https://dental-clinic-israel-vip.web.app/Location">Click Here to move Contact Page</a><br/><br/>
      <b>Thank you very much.</b>
      <br/>
      <img src="https://i.postimg.cc/gjHhq6WS/logo-clinic.jpg" alt="Doctor" width="auto" height="150">
    </div>
   `, // html body
    });

    console.log("Message sent: %s", info.messageId);
}




module.exports = { sendGmailAboutAppointment, sendGmailWhenUserRegister, sendGmailUserNeedPayToClinic, sendGmailCloseUserTurnDontCome, sendGmailDeleteAccountMessage };