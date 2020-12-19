'use stric'

const courses = [
  {
    _id: 'any',
    title: 'My title',
    teacher: 'My teacher',
    description: 'description',
    topic: 'programacion'
  },
  {
    _id: 'any2',
    title: 'My title',
    teacher: 'My teacher 2',
    description: 'description',
    topic: 'programacion'
  },
  {
    _id: 'any3',
    title: 'My title',
    teacher: 'My teacher 3',
    description: 'description',
    topic: 'programacion'
  },

]

module.exports = {
  Query: {
    getCourses: () => {
      return courses
    },
    getCourse: (root, args) => {
      const course = courses.filter(course => course._id === args.id)
      return course.pop()
    }
  }
}