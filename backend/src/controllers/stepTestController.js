const fs = require("fs");
const stepTestModel = require("../models/stepTestModel");

const createStepTest = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "กรุณาอัปโหลดรูปภาพ" });
    }

    const imageUrl = req.files.map((file) => `/uploads/${file.filename}`);

    const {
      date,
      dma,
      houseNumber,
      villageNo,
      subdistrict,
      district,
      province,
      stepTest,
      roundNo,
      value,
    } = req.body;

    req.files.forEach((file) => {
      if (file.size > 5000000) {
        return res
          .status(400)
          .json({ msg: "รูปควรมีขนาดน้อยกว่าหรือเท่ากับ 5 MB" });
      }
    });

    const stepTestArray = stepTest ? stepTest.map(String) : [];
    const roundNoArray = roundNo ? roundNo.map(Number) : [];
    const valueArray = value ? value.map(Number) : [];

    const newStepTest = new stepTestModel({
      date,
      dma,
      houseNumber,
      villageNo,
      subdistrict,
      district,
      province,
      stepTest: stepTestArray,
      roundNo: roundNoArray,
      value: valueArray,
      images: imageUrl,
    });

    await newStepTest.save();

    res.status(201).json({
      msg: "Step Test Created Successfully",
      data: newStepTest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const listStepTest = async (req, res) => {
  try {
    const query = await stepTestModel.find();

    return res.status(200).json({
      data: query,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getStepTestById = async (req, res) => {
  try {
    const { id } = req.params;
    const stepTestData = await stepTestModel.findById(id);

    if (!stepTestData) {
      return res.status(404).json({ message: "step test not found" });
    }

    res.status(200).json({ data: stepTestData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateStepTest = async (req, res) => {
  try {
    const { id } = req.params;

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map((file) => `/upload/${file.filename}`);

      req.files.forEach((file) => {
        if (file.size > 5000000) {
          // Max file size of 5 MB
          return res
            .status(400)
            .json({ msg: "รูปควรมีขนาดน้อยกว่าหรือเท่ากับ 5 MB" });
        }
      });
    }

    const {
      date,
      dma,
      houseNumber,
      villageNo,
      subdistrict,
      district,
      province,
      stepTest,
      roundNo,
      value,
    } = req.body;

    const updatedStepTest = await stepTestModel.findByIdAndUpdate(id, {
      date,
      dma,
      houseNumber,
      villageNo,
      subdistrict,
      district,
      province,
      stepTest,
      roundNo,
      value,
      images: imageUrls.length > 0 ? imageUrls : undefined,
    });

    if (!updatedStepTest) {
      return res.status(404).json({ message: "step test not found" });
    }

    res.status(200).json({
      msg: "Step test Updated Successfully",
      data: updatedStepTest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteStepTest = async (req, res) => {
  try {
    const { id } = req.params;

    const stepTestToDelete = await stepTestModel.findById(id);

    if (!stepTestToDelete) {
      return res.status(404).json({ message: "step test not found" });
    }

    if (stepTestToDelete.images && stepTestToDelete.images.length > 0) {
      stepTestToDelete.images.forEach((imagePath) => {
        const filePath = path.join(
          __dirname,
          "..",
          "uploads",
          imagePath.replace("/uploads/", "")
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    const deletedStepTest = await stepTestModel.findByIdAndDelete(id);

    if (!deletedStepTest) {
      return res.status(404).json({ message: "step test not found" });
    }

    res.status(200).json({
      msg: "step test Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createStepTest,
  listStepTest,
  getStepTestById,
  updateStepTest,
  deleteStepTest,
};
