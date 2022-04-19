const grpc = require('grpc')
const NoteService = grpc.load('notes.proto').NoteService

const client = new NoteService('localhost:50051', grpc.credentials.createInsecure())

client.list({}, (error, response) => {
    console.log(response)
})

client.newNote({title: 'Hey!', content: 'Hello :)'}, (err, response) => {
    console.log(response)
})