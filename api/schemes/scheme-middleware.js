const db = require('../../data/db-config')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async(req, res, next) => {
  try{
    const schemeID = req.params.scheme_id
    const exists = await db('schemes')
      .where('scheme_id', schemeID).first()
    if(!exists){
      next({status:404, message: `scheme with scheme_id ${schemeID} not found`})
    }else{
      next()
    }

  }catch(err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const {scheme_name} = req.body
  if(!scheme_name || typeof scheme_name !== 'string' ){
    next({status:400, message:'invalid scheme_name'})
  }
  else{
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const {instructions, step_number} = req.body
  const error = {status:400, message:'invalid step'}

  if(!instructions){
    next(error)
  }else if (typeof instructions !== 'string'){
    next(error)
  }else if(typeof step_number !== 'number'){
    next(error)
  }else if (step_number < 1){
    next(error)
  }else if(typeof instructions === "string" && instructions.trim() === '') {
    next(error)
  }else{
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
