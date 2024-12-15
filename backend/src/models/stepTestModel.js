const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema({
  roundNo: {
    type: Number,
    required: true,
  },
  stepTest: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

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
  rounds: [roundSchema], // เก็บข้อมูลรอบเป็น Array ของ Object
  images: [String], // รูปภาพ
});

module.exports = mongoose.model("StepTest", stepTestSchema);
