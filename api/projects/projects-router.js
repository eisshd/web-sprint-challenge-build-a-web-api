// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const router = express.Router();

const {
    validateProjectId,
    validateProject
} = require('./projects-middleware')



router.get('/', (req, res, next) => {
    Projects.get()
            .then(
                projects => {
                    res.send(projects)    
                }
            )
            .catch(next)
})

router.get('/:id', validateProjectId, (req, res, next) => {
    res.json(req.user)   
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
    .then(newProject => {
      res.send(newProject)
    }
    )
    .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update({title, description})
    .then(updatedProject => {
        return Projects.get(req.params.id)
    })
    .then(projects => res.json(projects))
    .catch(next)
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try{
        await Projects.remove(req.params.id)
        res.json(req.user)
      } catch (err) {
        next(err)
      }
})

router.get('/:id/actions', (req, res, next) => {
    Projects.getProjectActions(req.params.id)
            .then()
            .catch()
})

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: 'fail',
      err: err.message
    })
  })

module.exports = router