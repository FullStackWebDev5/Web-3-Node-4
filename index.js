const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'))

const Student = mongoose.model('Student', {
	firstName: String,
	lastName: String,
	rollNo: Number,
	techStack: String
})

app.get('/', (req, res) => {
	res.json({messsage: 'All good!'})
})

app.get('/students', (req, res) => {
	Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      res.json({ error: "Someting went wrong" });
    });
})

app.post('/students', (req, res) => {
	const { firstName, lastName, rollNo, techStack } = req.body;
	const student = new Student({
		firstName: firstName,
		lastName: lastName,
		rollNo: rollNo,
		techStack: techStack
	})
	student
    .save()
    .then((student) => {
      res.json({ message: 'Student added successfully!' });
    })
    .catch((error) => {
      res.json({ error: "Someting went wrong" });
    });
})

app.put('/students/:id', (req, res) => {
	let { id } = req.params;
	const { rollNo } = req.body;
	Student.findByIdAndUpdate(id, {
		rollNo: rollNo
	}).then((student) => {
		res.json({ message: 'Student updated successfully!' });
	})
	.catch((error) => {
		res.json({ error: "Someting went wrong" });
	});
})

app.delete('/students/:id', (req, res) => {
	let { id } = req.params;
	Student.findByIdAndDelete(id).then((student) => {
		res.json({ message: 'Student deleted successfully!' });
	})
	.catch((error) => {
		res.json({ error: "Someting went wrong" });
	});
})

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    )
    .catch((err) => console.log(err));
});

























/*
	## Mongoose CRUD Operations: Create, Read, Update, Delete
	--------------------------------
	Eg: Students 
	# MongoDB
	- Collection: students
	- Document: Single student information

	# Mongoose
	- Schema: Student
		- firstName: String
		- lastName: String
		- rollNo: Number
		- techStack: String
	
	# Express
	- Routes
		- POST /students: Create a new student (Create)
		- GET /students: Return list of all students (Read)
		- POST /students/:id : Update existing student with that ID (Update)
		- GET /students/:id : Delete student with that ID (Delete)
*/