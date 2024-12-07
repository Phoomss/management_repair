const mongoose = require("mongoose");

const stepTestSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: false,
        default: Date.now,
    },
    dma: {
        type: String,
        required: true,
    },
    houseNumber: {
        type: String,
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
    stepTest:{
        type: [String],
        required: true,
    },
    RoundNo:{
        type: [Number],
        required: true,
    },
    value:{
        type: [Number],
        required: true,
    },
    images: [String]
});

module.exports = mongoose.model('StepTest', stepTestSchema);
