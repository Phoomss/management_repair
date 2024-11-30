const caseModel = require("../models/caseModel");
const fs = require('fs')

const createCase = async (req, res) => {
    try {
        if (!req.fields) {
            return res.status(400).json({ message: "Fields are missing in the request" });
        }

        const {
            date, numberWork, houseNumber, villageNo, subdistrict, district, province,
            latitude, longitude, pipe, size, dma
        } = req.fields;

        const { images } = req.files;

        // ตรวจสอบขนาดไฟล์
        if (images) {
            const files = Array.isArray(images) ? images : [images]; // รองรับทั้งไฟล์เดี่ยวและหลายไฟล์
            for (const file of files) {
                if (file.size > 1000000) {
                    return res.status(400).json({ msg: "รูปควรมีขนาดน้อยกว่าหรือเท่ากับ 1 mb" });
                }
            }
        }

        // สร้างเอกสารใหม่
        const newCase = new caseModel({ ...req.fields });

        // เพิ่มรูปภาพลงในเอกสาร
        if (images) {
            const files = Array.isArray(images) ? images : [images];
            newCase.images = files.map(file => ({
                data: fs.readFileSync(file.path),
                contentType: file.type
            }));
        }

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

module.exports = ({
    createCase
})