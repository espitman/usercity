import * as joiObjectId from 'joi-objectid'
import * as Joi from '@hapi/joi'
// @ts-ignore
Joi.objectId = joiObjectId(Joi)
export default Joi
