const { PhoneMessage } = require('../../models/Models')
// Lista os usuários

const SEQL = require('sequelize')

const _list = (params, pagination) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const lstDbObj = await PhoneMessage.findAll({
          include: [],
          order: [
            (params && params.order ? params.order : ['id', 'ASC'])
          ],
          limit: (params && params.limit ? params.limit : null),
          where: params.model ? params.model : params.where ? SEQL.literal(params.where) : null
        })
        let _lstObj = []
        for (let _ixObj in lstDbObj) {
          const dbObject = lstDbObj[_ixObj]
          let _dat = dbObject.data()
          _lstObj.push(_dat)
        }
        resolve(_lstObj)
      } catch (error) {
        reject(error)
      }
    })()
  })
}
const _create = (params) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        if (Array.isArray(params)) {
          let lstNewObj = await PhoneMessage.bulkCreate(await _validate(params))
          resolve(lstNewObj)
        } else {
          // validate before saving
          let newObj = await PhoneMessage.create(await _validate({...params}))
          resolve(newObj)
        }
      } catch (error) {
        reject(error)
      }
    })()
  })
}
const _update = (params) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const obj = await PhoneMessage.findOne({ where: { id: params.id } })
        if (obj && obj.id) {
          // UPDATE PROPERTIES
          for(let _key in params) {
            if (params[_key] !== undefined && obj[_key] !== undefined) {
              obj[_key] = params[_key]
            }
          }
          await obj.save()
          resolve(obj)
        } else {
          reject(new Error(`Could not find the PhoneMessage ${params.id}`))
        }
      } catch (error) {
        reject(error)
      }
    })()
  })
}
const _validate = (params) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        if (Array.isArray(params)) {
          let lstNewObj = []
          params.forEach(obj => {lstNewObj.push(internalValidation(obj))})
          resolve(lstNewObj)
        } else {
          resolve(internalValidation(params))
        }
      } catch (error) {
        reject(error)
      }
    })()
  })
  function internalValidation (object) {
    let invalidReasons = []
    if (!object.phone)
      invalidReasons.push('Phone number not found')
    else {
      if (/\D/.test(object.phone)) invalidReasons.push('Non digits characters found')
      if (object.phone.length != 11) invalidReasons.push('Expected to be 11 digits')
      if (object.phone[2] !== '9') invalidReasons.push('Third character is not a 9')
    }
    if (!object.message)
      invalidReasons.push('Message not found')
    else {
      if (object.message.length <= 0 && object.message.length > 160) invalidReasons.push('Expected to be from 1 to 160 characters.')
    }
    // object.valid = invalidReasons.length == 0 ? true : false
    if (invalidReasons.length > 0) {
      object.valid = false
      object.invalidReasons = invalidReasons
    } else {
      object.valid = true
    }
    return object
  }
}
const _delete = (params) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const obj = await PhoneMessage.findOne({ where: { id: params.id } })
        if (obj && obj.id) {
          await obj.destroy()
          resolve(obj)
        } else {
          reject(new Error(`Could not find the PhoneMessage ${params.id}`))
        }
      } catch (error) {
        reject(error)
      }
    })()
  })
}
module.exports = {
    _list: _list,
    _create: _create,
    _update: _update,
    _delete: _delete,
    _validate: _validate
}