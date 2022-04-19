const grpc = require('grpc')
const NoteService = grpc.load('notes.proto').NoteService

const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1' },
    { id: '2', title: 'Note 2', content: 'Content 2' }
]

const server = new grpc.Server();

function list (call, callback) {
    callback(null, notes)
}

function newNote (call, callback) {
    last_id = parseInt(notes[notes.length -1].id)
    notes.push({
        id: String(last_id + 1),
        title: call.request.title,
        content: call.request.content
    })
    callback(null, notes)
}

server.addService(NoteService.service, {list: list, newNote: newNote})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
server.start()