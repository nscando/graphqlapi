'use stric'
const connectDB = require('./db')
const { ObjectID } = require('mongodb')


module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    const newCourse = Object.assign(defaults, input)
    let db
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      console.error(error);
    }
    return newCourse
  },

  createStudent: async (root, { input }) => {
    let db
    let student

    try {
      db = await connectDB()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      console.error(error);
    }
    return input
  },

  editCourse: async (root, { _id, input }) => {
    let db
    let course

    try {
      db = await connectDB()
      await db.collection('courses').
        updateOne({ _id: ObjectID(_id) },
          { $set: input }
        )
      course = await db.collection('courses').findOne({ _id: ObjectID(_id) }
      )
    } catch (error) {
      console.error(error);
    }
    return course
  },

  editStudent: async (root, { _id, input }) => {
    let db
    let student

    try {
      //connect db
      db = await connectDB()
      //find students collection
      await db.collection('students').
        //find by id
        updateOne({ _id: ObjectID(_id) },
          //update data input
          { $set: input }
        )
      //get the student by id after update 
      student = await db.collection('students').findOne({ _id: ObjectID(_id) }
      )
    } catch (error) {
      console.error(error);
    }
    //return de student updated
    return student
  },

  deleteCourse: async (root, { _id }) => {
    let db
    let deleteInfo

    try {
      db = await connectDB()
      await db.collection('courses')
      deleteInfo = await db.collection('courses').deleteOne({ _id: ObjectID(_id) })
    } catch (error) {
      console.error(error);
    }
    return deleteInfo.deletedCount
      ? `Course ID ${_id} was deleted succesfully`
      : `Course ID${_id} doesn´t exist`
  },

  deleteStudent: async (root, { _id }) => {
    let db
    try {
      db = await connectDB()
      await db.collection('students')
      await db.collection('students').deleteOne({ _id: ObjectID(_id) })
    } catch (error) {
      console.error(error);
    }
    return true
  },

  addPeople: async (root, { courseID, personID }) => {
    let db
    let person
    let course

    try {
      db = await connectDB()

      course = await db.collection('courses')
        .findOne({ _id: ObjectID(courseID) })

      person = await db.collection('students')
        .findOne({ _id: ObjectID(personID) })

      if (!course || !person) throw new Error('Course or Person doesn´t exist')

      await db.collection('courses')
        .updateOne({ _id: ObjectID(courseID) },
          { $addToSet: { people: ObjectID(personID) } }
        )

    } catch (error) {
      console.error(error);
    }
    return course
  },
}

