const caseModel = require("../models/caseModel");
const upload = require('../config/multerConfig');

const createCase = async (req, res) => {
    try {
        // ตรวจสอบว่าไฟล์มีหรือไม่
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: "กรุณาอัปโหลดรูปภาพ" });
        }

        // ดึง URL ของไฟล์ที่อัปโหลด
        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

        // ดึงข้อมูลที่ต้องการจาก req.body
        const {
            date, numberWork, houseNumber, villageNo, subdistrict, district, province,
            latitude, longitude, pipe, size, dma
        } = req.body;

        // ตรวจสอบขนาดไฟล์
        req.files.forEach(file => {
            if (file.size > 5000000) { // ขนาดไฟล์ไม่เกิน 5 MB
                return res.status(400).json({ msg: "รูปควรมีขนาดน้อยกว่าหรือเท่ากับ 5 MB" });
            }
        });

        // สร้างเอกสารใหม่
        const newCase = new caseModel({
            date, numberWork, houseNumber, villageNo, subdistrict, district, province,
            latitude, longitude, pipe, size, dma,
            images: imageUrls // เก็บ URL รูปภาพในฐานข้อมูล
        });

        await newCase.save();

        res.status(201).json({
            msg: "Case Created Successfully",
            data: newCase,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const listCase = async (req, res) => {
    try {
        const query = await caseModel.find()
        res.status(200).json({data:query})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getCaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const caseData = await caseModel.findById(id).populate('pipe')

        if (!caseData) {
            return res.status(404).json({ message: "Case not found" });
        }

        res.status(200).json({ data: caseData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createCase,
    listCase,
    getCaseById
};
