// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionsId(req, res, next) {
    try{
      const action = await Actions.get(req.params.id)
      if(!action){
        res.status(404).json({
          message: 'not found'
        })
      } 
      else {
          req.action = action
          next()
      }
    }
    catch{
      res.status(500).json({
        message: 'error'
      })
    }
}

function validateActionsPost(req, res, next) {
  const {completed, description, notes, project_id} = req.body
  if (!description || !notes || !project_id) {
    res.status(400).json({
      message: "missing required fields" 
    })
  } else {
     next()
  }
}

function validateProjectPut(req, res, next) {
  const {completed, description, notes, project_id} = req.body
  if (!completed || !description || !notes || !project_id){
    res.status(400).json({
      message: "missing required fields" 
    })
  } else
    console.log('success!')
    next()
  }

  


  module.exports = {
    validateActionsId,
    validateActionsPost,
    validateProjectPut
  }
