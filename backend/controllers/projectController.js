const Project = require('../models/Project');

// GET /api/projects
async function getProjects(req, res) {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    console.error('Error fetching projects:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching projects' });
  }
}

// POST /api/projects
async function createProject(req, res) {
  try {
    const { title, description, technologies, features, github, liveDemo } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required fields',
      });
    }

    const project = await Project.create({
      title,
      description,
      technologies: technologies || [],
      features: features || [],
      github: github || '',
      liveDemo: liveDemo || '',
    });

    res.status(201).json({ success: true, data: project });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Error creating project:', err.message);
    res.status(500).json({ success: false, message: 'Server error while creating project' });
  }
}

module.exports = { getProjects, createProject };
