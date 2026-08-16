// Seeds the database with the actual project from the resume, only if
// the projects collection is empty. This keeps GET /api/projects working
// out of the box without requiring a manual POST first.
const Project = require('./models/Project');

const seedProjects = [
  {
    title: 'Smart Attendance App',
    description:
      'A Flutter-based attendance management application built with a simple, user-friendly interface for cross-platform mobile use. The app streamlines the process of recording and managing student attendance in a clean, easy-to-navigate experience.',
    technologies: ['Flutter'],
    features: [
      'Student attendance marking',
      'Attendance records',
      'Data management',
    ],
    github: '',
    liveDemo: '',
  },
];

async function seedDatabase() {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(seedProjects);
      console.log('Seeded database with initial project data.');
    }
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
}

module.exports = seedDatabase;
