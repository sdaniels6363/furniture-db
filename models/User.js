var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  }
});
UserSchema.plugin(require("mongoose-bcrypt"));

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema, "user");
