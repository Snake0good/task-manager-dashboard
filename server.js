const { request, response } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const port = process.env.PORT || 3000

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'task'

MongoClient.connect(dbConnectionStr,  { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
    

app.get('/', (req, res) => {
    db.collection('tasks').find().toArray()
    .then(data => {
        res.render('index.ejs', { info: data })})
    .catch(error => console.error(error))
})

app.post('/addTask', (req, res) => {
    if (req.body.taskTitle.length < 3) {
        res.redirect('/')
    } else {
        db.collection('tasks').insertOne( 
            { 
                taskTitle: req.body.taskTitle,
                taskDesc: req.body.taskDescription,
                taskType: req.body.taskType,
                employees: req.body.employees,
                dueDate: req.body.dueDate, 
                progress: 0,
                documents: [],
                likes: 0
                }
        )
        .then(result => {
            console.log('Task Added')
            res.redirect('/')
        })
        .catch(error => console.error(error))
    }
})

app.put('/addOneLike', (req, res) => {
    db.collection('tasks').updateOne({
        taskTitle: req.body.taskTitleS,
        taskDesc: req.body.taskDescriptionS,
        taskType: req.body.taskTypeS,
        employees: req.body.employeesS,
        dueDate: req.body.dueDateS,
        
        likes: req.body.likesS,
        },{
        $set: {
            likes: req.body.likesS + 1
        }
    })
    .then(result => {
        console.log('Added One Like')
        // response.json('Like Added')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteTask', (req, res) => {
    db.collection('tasks').deleteOne({ 
        taskTitle: req.body.taskTitleS })
    .then(result => {
        console.log('Task Deleted')
        res.json('task deleted')
    })
    .catch(error => console.error(error))
})

app.listen(port, () => {
    console.log(`Server is lisetning on port ${port}`)
})