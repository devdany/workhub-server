import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service:'gmail',
  host: 'smtp.gmlail.com',
  secure : false,
  port: 587,
  requireTLS : true,
  auth: {
      user : 'workhub7387@gmail.com',
      pass : 'rhkr!636'
  }
})



export const emailGenerator = () => {

}

export const certificatiomEmailSender = (email: string, code: string) => {
  return new Promise((resolve, reject) => {
    const mailOption = {
      from : 'support@workhub.com',
      to : email,
      subject : '[Workhub] Certificate email',
      html : `
        <h1>hello</h1>
        <p>certification code : ${code}<p>
      `
    }

    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        reject(err)
      } else {
        resolve(info)
      }
    })
  })
}