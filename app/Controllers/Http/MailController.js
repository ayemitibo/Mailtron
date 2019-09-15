'use strict'
const MailModel = use('App/Models/Mail')
const Mail = use('Mail')

class MailController {
    async sendMail ({ request, response, session }) {

        try {
            const form_data = request.all()

            const mail = new MailModel()

            mail.receiver_email = form_data.receiver_email
            mail.sender_email = form_data.sender_email
            mail.subject = form_data.subject
            mail.message_body = form_data.message_body
        
            const email = await mail.save()

            await Mail.send('emails.email_template', email.toJSON(), (message) => {
                message
                  .to(form_data.receiver_email)
                  .from(form_data.sender_email)
                  .subject(form_data.subject)
              })

            session.flash({
                notification: {
                  type: 'success',
                  message: `Succesful sent the mail to ${form_data.email_address} `,
                }
            })

            return response.redirect('back')
  

        } catch(e) {
            console.log('mail error', e)

            session.flash({
                notification: {
                  type: 'danger',
                  message:`Error sending mail to ${form_data.email_address} `,
                }
              })
  
            return response.redirect('back')
        }
    }
}

module.exports = MailController
