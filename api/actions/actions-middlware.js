// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionsId(req, res, next) {
    try{
      const user = await Actions.get(req.params.id)
      if(!user){
        res.status(404).json({
          message: 'not found'
        })
      } 
      else {
          req.user = user
          next()
      }
    }
    catch{
      res.status(500).json({
        message: 'error'
      })
    }
}

function validateActions(req, res, next) {
    const {title, description} = req.body
    if (!title || !description) {
      res.status(400).json({
        message: "missing required fields" 
      })
    } else {
       next()
    }
  }

  


  module.exports = {
    validateActionsId,
    validateActions
  }
