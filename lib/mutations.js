'use stric'
const connectDB = require('./db')


module.exports = {
     createCurse: async (root, { input }) => {
          const defaults = {
               teacher: '',
               topic: ''
          }
          const newCourse = Object.assign(defaults, inputs)
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
     }
}