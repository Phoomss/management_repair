const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: false,
        default: Date.now,
    },
    numberWork: {
        type: String,
        required: true,
    },
    houseNumber: {
        type: Number,
        required: true,
    },
    villageNo: {
        type: Number,
        required: true,
    },
    subdistrict: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    pipe: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Pipe',
        // required: true,
    },
    size: {
        type: Number,
        required: true,
        min: 0,
    },
    dma: {
        type: String,
        required: true,
    },
    images: [String]
});

module.exports = mongoose.model('Case', caseSchema);
