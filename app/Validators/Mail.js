'use strict'

class Mail {
  
  get validateAll() {
    return true
  }

  get rules () {
    return {
      receiver_email: 'required|string',
      sender_email: 'required|string|email',
      subject: 'required|email',
      message_body: 'required',
    }
  }

  get messages () {
    return {
      'receiver_email.required': 'Please provide the reciever email' ,
      'sender_email.required': 'Please provide the sender email',
      'subject.required': 'Please provide the subject for the mail',
      'message_body.email': 'Please provide the message body',
    }
  }

  async fails(error) {
    this.ctx
      .session.withErrors(error)
      .flashAll()

    this.ctx
      .session.flash({
        applicationNotification: {
          type: 'danger',
          message: 'Error sending mail',
        }
      })

    return this.ctx.response.redirect('back')
  }

}

module.exports = Mail
