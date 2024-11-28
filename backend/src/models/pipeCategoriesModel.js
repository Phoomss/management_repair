const mongoose = require("mongoose");

const pipeCategoriesSchema = new mongoose.Schema({
    pipe: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('PipeCategories', pipeCategoriesSchema)