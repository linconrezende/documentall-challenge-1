const { File, PhoneMessage } = require('../../models/Models')
const csv = require('fast-csv')
const fs = require('fs')
const phoneMessageController = require('./phoneMessageController')
// Lista os usuários

const SEQL = require('sequelize')

const _list = (params, pagination) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const lstDbObj = await File.findAll({
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
          let lstNewObj = await File.bulkCreate(params)
          resolve(lstNewObj)
        } else {
          let newObj = await File.create({ ...params })
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
        const obj = await File.findOne({ where: { id: params.id } })
        if (obj && obj.id) {
          // UPDATE PROPERTIES
          for (let _key in params) {
            if (params[_key] !== undefined && obj[_key] !== undefined) {
              obj[_key] = params[_key]
            }
          }
          await obj.save()
          resolve(obj)
        } else {
          reject(new Error(`Could not find the File ${params.id}`))
        }
      } catch (error) {
        reject(error)
      }
    })()
  })
}
const _delete = (params) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const obj = await File.findOne({ where: { id: params.id } })
        if (obj && obj.id) {
          await obj.destroy()
          resolve(obj)
        } else {
          reject(new Error(`Could not find the File ${params.id}`))
        }
      } catch (error) {
        reject(error)
      }
    })()
  })
}
const _uploadAndValidate = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let uploadedFiles = []
      if (params.multiple) {
        const files = Array.isArray(params.multiple) ? params.multiple : [params.multiple]
        for (let ixfl = 0; ixfl < files.length; ixfl++) {
          const myFile = files[ixfl]
          const fileName = `${+ new Date()}_${myFile.name}`
          //  mv() method places the file inside public directory
          let fullPath = `${__dirname}/../../public/${fileName}`
          await myFile.mv(fullPath)
          // persist on the database
          let newFile = await File.create({ name: fileName })
          // read the file
          let csvContent = await _createFileScreamAndReadCSV(fullPath)
          let phoneMessages = []
          for (let _ixpm in csvContent) {
            const row = csvContent[_ixpm]
            let phoneMessage = new PhoneMessage()
            phoneMessage.phone = row[0]
            phoneMessage.message = row[1]
            phoneMessage.valid = false
            // validate the phoneMessage
            let _validatedPhoneMessage = await phoneMessageController._validate(phoneMessage.data())
            phoneMessages.push(_validatedPhoneMessage)
          }
          uploadedFiles.push({...newFile.data(), phoneMessages})
        }
        resolve(uploadedFiles)
      } else {
        reject(new Error('No files found to be uploaded'))
      }
    } catch (error) {
      reject(error)
    }
  })
}
const _createFileScreamAndReadCSV = (path) => {
  return new Promise((resolve, reject) => {
    try {
      let phoneMessages = []
      fs.createReadStream(path)
      .pipe(csv.parse({ headers: false, delimiter: ';', quote: null }))
        .on('error', (error) => {
          reject(error)
        })
        .on('data', (row) => {
          phoneMessages.push(row)
        })
        .on('end', async () => {
          resolve(phoneMessages)
        })
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = {
  _list: _list,
  _create: _create,
  _update: _update,
  _delete: _delete,
  _uploadAndValidate: _uploadAndValidate
}