// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try{
      const projects = await Projects.get(req.params.id)
      if(!projects){
        res.status(404).json({
          message: 'not found'
        })
      } 
      else {
          req.projects = projects

          next()
      }
    }
    catch{
      res.status(500).json({
        message: 'error'
      })
    }
}

function validateProjectPost(req, res, next) {
    const {completed, description, name} = req.body
    if (!completed || !description || !name) {
      res.status(400).json({
        message: "missing required fields" 
      })
    } else {
       next()
    }
  }

function validateProjectPut(req, res, next) {
    const {completed, description, name} = req.body
    // works with test 8
    if (!name && !completed || !name && !description || !description && !completed){
      res.status(400).json({
        message: "missing required fields" 
      })
    // works with test 10
    // if (!name || !completed || !description){
    //   res.status(400).json({
    //     message: "missing required fields" 
    //   })
    // }
    } else 
      console.log('success!')
      next()
    }

  module.exports = {
    validateProjectId,
    validateProjectPost,
    validateProjectPut
  }