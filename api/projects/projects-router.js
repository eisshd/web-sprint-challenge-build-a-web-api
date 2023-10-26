// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const router = express.Router();
const Actions = require('../actions/actions-model')

const {
    validateProjectId,
    validateProjectPost,
    validateProjectPut,
    validateProjectAction
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
    res.json(req.projects)
})

router.post('/', validateProjectPost, (req, res, next) => {
    Projects.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject);
    }
    )
    .catch(next)
})

router.put('/:id', validateProjectId, validateProjectPut, (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then((updatedPost) => {res.status(201).json(updatedPost)})
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

router.get('/:id/actions', validateProjectAction, (req, res, next) => {
    res.json(req.projectsactions)
})

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: 'fail',
      err: err.message
    })
  })

module.exports = router