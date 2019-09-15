'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MailSchema extends Schema {
  up () {
    this.create('mail', (table) => {
      table.increments()
      table.string('receiver_email')
      table.string('sender_email')
      table.string('subject')
      table.string('message_body')
      table.timestamps()
    })
  }

  down () {
    this.drop('mail')
  }
}

module.exports = MailSchema
