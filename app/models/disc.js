var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DiscSchema   = new Schema({
    company: String,
    fade: Number,
    glide: Number,
    imgUrl: String,
    manufacturerImgUrl: String,
    name: String,
    plastic: String,
    speed: Number,
    turn: Number,
    type: String
})

module.exports = mongoose.model('Disc', DiscSchema);