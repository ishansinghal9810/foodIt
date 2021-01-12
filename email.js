const nodemailer = require("nodemailer");

function sendMail(remail,emailtype,job){
  async function main() {
    if(emailtype==0){
      subject = "Would You Like to Volunteer For Food Distribution",
      text = "Hey We Want to ask you if you want to volunteer for food Distribution near you to help a Noble Cause and fight hunger if so CONFIRM YOUR PRESENCE BY CLICKING THE LINK BELOW https://127.0.0.1/confirmJob/"+job.jobid+" HERE ARE THE DETAILS <br> " + job.name+"ADDR : " + job.id 
      htmlBody = text
    }
    else if(emailtype==1){
      subject="Thanks for Helping Us Fight The Global Hunger"
      htmlBody = "Someone will soon appear to collect food"
    }
    else if(emailtype==2){
      subject="WE ARE COMMING"
      htmlBody = "WE ARE COMMING FOR FOOD"
    }
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "", // generated ethereal user
      pass: "", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"foodIt" <thisfor375@gmail.com>', // sender address
    to: remail, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: htmlBody, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

}

module.exports = sendMail