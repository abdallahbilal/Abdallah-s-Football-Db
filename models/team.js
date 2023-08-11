const mongoose = require('mongoose');

const schemaDefinitionObj= {

teamname : {

type : String,

required : true

},

teamcoach : {
    type : String,
    required : true
},

teamleague : {
    type : String,
    required : true
}

}

const mongooseSchema = new mongoose.Schema(schemaDefinitionObj);

module.exports = mongoose.model("Team", mongooseSchema);