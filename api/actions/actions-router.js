// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model')

const {
    validateActionsId,
    validateActions
} = require('./actions-middlware')



router.get('/', (req, res, next) => {
    Actions.get()
            .then(
                actions => {
                    res.send(actions)    
                }
            )
            .catch(next)
})

router.get('/:id', validateActionsId, (req, res, next) => {
    res.json(req.user)   
})

router.post('/', validateActions, (req, res, next) => {
    Actions.insert(req.body)
    .then(newProject => {
      res.send(newProject)
    }
    )
    .catch(next)
})

router.put('/:id', validateActionsId, validateActions, (req, res, next) => {
    Actions.update({title, description})
    .then(updatedProject => {
        return Projects.get(req.params.id)
    })
    .then(projects => res.json(projects))
    .catch(next)
})

router.delete('/:id', validateActionsId, async (req, res, next) => {
    try{
        await Actions.remove(req.params.id)
        res.json(req.user)
      } catch (err) {
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