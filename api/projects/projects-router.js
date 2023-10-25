// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const router = express.Router();
const Actions = require('../actions/actions-model')

const {
    validateProjectId,
    validateProjectPost,
    validateProjectPut
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
    Projects.get()
            .then(project => res.json(project[req.params.id - 1]))
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

router.get('/:id/actions', async (req, res, next) => {
    try{
        const action = await Projects.get(req.params.id)
        if(!action){
            res.status(404).json([])
        } else res.json(action.actions)
    }
    catch (err) {
        next(err)
    }
})

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: 'fail',
      err: err.message
    })
  })

module.exports = router