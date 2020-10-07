const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  userID: {type: Types.ObjectId, ref: 'User'},
  items: [{
  		item_name: {type: String, sparse:true},
  		item_type: {type: String},
  		item_data: [{
  			date: {type: Date},
  			value: {}
  			}]
  		}]
  	
})

module.exports = model('Data', schema)
