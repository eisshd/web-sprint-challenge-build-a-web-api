// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model')

const {
    validateActionsId,
    validateActionsPost,
    validateProjectPut
} = require('./actions-middlware')

router.get('/', (req, res, next) => {
    Actions.get()
            .then(
                actions => {
                    res.json(actions)    
                }
            )
            .catch(next)
})

router.get('/:id', validateActionsId, (req, res, next) => {
  Actions.get()
  .then(action => res.json(action[req.params.id - 1]))
})

router.post('/', validateActionsPost, (req, res, next) => {
    Actions.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction);
    }
    )
    .catch(next)
})

router.put('/:id', validateActionsId, validateProjectPut, (req, res, next) => {
    Actions.update(req.params.id, (req.body))
    .then(updatedAction => {
        return Actions.get(req.params.id)
    })
    .then(action => res.json(action))
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