const defaultDelete = (_obj) => {
  // delete _obj.createdAt
  // delete _obj.updatedAt
  return _obj
}

const File = DB.define('files', require('./_definitions/Model_File'), {underscored: true})
File.prototype.data = function () {
  var _val = Object.assign({}, this.get())
  return defaultDelete(_val)
}
const PhoneMessages = DB.define('phone_messages', require('./_definitions/Model_Phone_Message'), {underscored: true})
PhoneMessages.prototype.data = function () {
  var _val = Object.assign({}, this.get())
  return defaultDelete(_val)
}

File.hasMany(PhoneMessages)
// PhoneMessages.belongsTo(File)

module.exports = {
  File: File,
  PhoneMessages: PhoneMessages
}