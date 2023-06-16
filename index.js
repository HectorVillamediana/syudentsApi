require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 8001
const express = require('express')
const app = express()
app.use(express.json())

const students = [{
    "student_id": 1,
    "first_name": "Dee",
    "last_name": "Gossan",
    "age": 18,
    "email": "dgossan0@squarespace.com",
    "major": "html",
    "gpa": 1.83
}, {
    "student_id": 2,
    "first_name": "Barbette",
    "last_name": "Elfleet",
    "age": 24,
    "email": "belfleet1@salon.com",
    "major": "javascript",
    "gpa": 1.92
}, {
    "student_id": 3,
    "first_name": "Luisa",
    "last_name": "Sewards",
    "age": 25,
    "email": "lsewards2@weebly.com",
    "major": "css",
    "gpa": 3.89
}, {
    "student_id": 4,
    "first_name": "Patricio",
    "last_name": "Pimmocke",
    "age": 24,
    "email": "ppimmocke3@g.co",
    "major": "react",
    "gpa": 3.37
}, {
    "student_id": 5,
    "first_name": "Lilias",
    "last_name": "Nutkins",
    "age": 25,
    "email": "lnutkins4@narod.ru",
    "major": "html",
    "gpa": 1.7
}]

app.get('/', (req, res) => {
    res.send(students)
})
app.post('/', (req, res) => {
    const body = req.body;
    if (body.email) {
        res.status(201).json({ response: true, data: body })
        body.student_id = uuidv4()
        students.unshift(body)
    } else {
        res.status(400).send("No students with such id")
    }
})

app.get('/user/:id', (req, res) => {
    const params = req.params
    const currUser = students.filter(studentId => studentId.student_id == params.id)
    if (currUser.length > 0) {
        res.status(200).send(currUser[0])
    } else {
        res.status(400).send("No user with that id found")
    }
})
app.get('/users/', (req, res) => {
    const { lastname } = req.query
    const { major } = req.query
    let studentMatch = ''
    if (major && lastname) {
        studentMatch = students.filter(student => student.major == major && student.last_name == lastname);
        studentMatch.length > 0 ? res.status(200).send(studentMatch) : res.status(400).send("No student with such parameters")
    } else if (major) {
        studentMatch = students.filter(student => student.major == major)
        studentMatch.length > 0 ? res.status(200).send(studentMatch) : res.status(400).send("No student with such parameters")
    } else if (lastname) {
        studentMatch = students.filter(student => student.last_name == lastname)
        studentMatch.length > 0 ? res.status(200).send(studentMatch) : res.status(400).send("No student with such parameters")
    } else {
        res.status(400).res.send("You need to provide lastname or major")
    }
})

app.put('/users/replace/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const currUser = students.findIndex(studentId => studentId.student_id == id);
    if (currUser !== -1) {
        students[currUser].first_name = body.first_name
        students[currUser].last_name = body.last_name
        students[currUser].age = body.age
        students[currUser].email = body.email
        students[currUser].major = body.major
        students[currUser].gpa = body.gpa
        res.status(200).send(students)
    } else {
        res.status(400).send("No student with such id")
    }
})

app.patch('/users/update/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const currUser = students.findIndex(studentId => studentId.student_id == id);
    if (currUser !== -1) {
        if (body.first_name) {
            students[currUser].first_name = body.first_name
        }
        if (body.last_name) {
            students[currUser].last_name = body.last_name
        }
        if (body.age) {
            students[currUser].age = body.age
        }
        if (body.email) {
            students[currUser].email = body.email
        }
        if (body.major) {
            students[currUser].major = body.major
        }
        if (body.gpa) {
            students[currUser].gpa = body.gpa
        }
        res.status(200).send(students)
    } else {
        res.status(400).send("No student with such id")
    }
})

app.delete('/users/delete/:id', (req, res) => {
    const { id } = req.params;
    const currUser = students.findIndex(studentId => studentId.student_id == id);
    if (currUser !== -1) {
        students.splice(currUser, 1)
        res.send(students)
    } else {
        res.send("No student with such id")
    }
})

app.listen(PORT, () => {
    console.log('server listening to port ' + PORT);
})