import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import stepTesstService from "../../../service/stepTestService";

const CreateStepTest = () => {
  const [formData, setFormData] = useState({
    date: "",
    dma: "",
    houseNumber: "",
    villageNo: "",
    subdistrict: "",
    district: "",
    province: "",
  });
  const [steps, setSteps] = useState([
    { stepTest: "", roundNo: "", value: "" },
  ]);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSteps = [...steps];
    updatedSteps[index][name] = value;
    console.log(updatedSteps);  // ดูค่าที่อัปเดต
    setSteps(updatedSteps);
  };  

  const addStep = () => {
    setSteps([...steps, { stepTest: "", roundNo: "", value: "" }]);
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const validTypes = ["image/jpeg", "image/png"];
    const maxFileSize = 5 * 1024 * 1024;
    const files = Array.from(e.target.files);

    const validFiles = files.filter(
      (file) => validTypes.includes(file.type) && file.size <= maxFileSize
    );

    if (validFiles.length !== files.length) {
      Swal.fire({
        title: "ไฟล์ไม่ถูกต้อง!",
        text: "กรุณาแน่ใจว่าไฟล์ทั้งหมดเป็น JPEG/PNG และมีขนาดไม่เกิน 5MB.",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    setImages(validFiles);
    setPreviewImages(validFiles.map((file) => URL.createObjectURL(file)));
  };

  const removePreviewImage = (index) => {
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    const updatedImages = images.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviews);
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate all steps
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      if (!step.stepTest || !step.roundNo || !step.value) {
        console.log(step.stepTest);
        console.log(step.roundNo);
        console.log(step.value);
        Swal.fire({
          title: "ข้อผิดพลาด",
          text: `กรุณากรอกข้อมูลให้ครบถ้วนสำหรับขั้นตอนที่ ${i + 1}`,
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        setLoading(false);
        return;
      }
    }

    const formDataToSend = new FormData();
    // Append basic fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    console.log(formDataToSend);

    // Append steps as a single array
    steps.forEach((step, index) => {
      formDataToSend.append(`steps[${index}][stepTest]`, step.stepTest);
      formDataToSend.append(`steps[${index}][roundNo]`, step.roundNo);
      formDataToSend.append(`steps[${index}][value]`, step.value);
    });
    console.log("Steps to send:", steps);

    // Append images
    images.forEach((file) => formDataToSend.append("images", file));

    try {
      const res = await stepTesstService.createStepTest(formDataToSend);
      Swal.fire({
        title: "สำเร็จ!",
        text: res.data.msg,
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => navigate("/admin/step-test"));
    } catch (error) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: error.response?.data?.msg || "เกิดข้อผิดพลาดที่ไม่คาดคิด.",
        icon: "error",
        confirmButtonText: "ลองใหม่",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <div className="card mb-4">
          <div className="card-header">ข้อมูลเบื้องต้น</div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="date" className="form-label">
                  วันที่
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="dma" className="form-label">
                  DMA
                </label>
                <select
                  className="form-control"
                  id="dma"
                  name="dma"
                  value={formData.dma}
                  onChange={handleChange}
                  required
                >
                  <option value="">เลือก DMA</option>
                  {[...Array(10).keys()].map((i) => (
                    <option key={i} value={`0${i + 1}`}>
                      {`0${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="houseNumber" className="form-label">
                  บ้านเลขที่
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="houseNumber"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="villageNo" className="form-label">
                  หมู่ที่
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="villageNo"
                  name="villageNo"
                  value={formData.villageNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="subdistrict" className="form-label">
                  ตำบล
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subdistrict"
                  name="subdistrict"
                  value={formData.subdistrict}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="district" className="form-label">
                  อำเภอ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="province" className="form-label">
                  จังหวัด
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Step Test Details</span>
          </div>
          <div className="card-body">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={addStep}
            >
              Add Step
            </button>
            {steps.map((step, index) => (
              <div key={index} className="row g-3 mb-3 mt-2">
                <div className="col-md-4">
                  <select
                    className="form-control"
                    name="stepTest"
                    value={step.stepTest}
                    onChange={(e) => handleStepChange(index, e)}
                    id={`stepTest-${index}`}
                    required
                  >
                    <option value="">เลือก Step Test</option>
                    <option value="CV">CV</option>
                    <option value="SCV">SCV</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="roundNo"
                    value={step.roundNo || index + 1} // ใช้ค่าเริ่มต้นถ้า roundNo เป็น null หรือ undefined
                    onChange={(e) => handleStepChange(index, e)}
                    placeholder={`ลำดับที่ ${index + 1}`}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="value"
                    value={step.value}
                    onChange={(e) => handleStepChange(index, e)}
                    placeholder="ค่าที่ได้"
                    required
                  />
                </div>

                <div className="text-end mt-3">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeStep(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Upload Images</div>
          <div className="card-body">
            <input
              type="file"
              className="form-control"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="mt-3 d-flex flex-wrap">
              {previewImages.map((src, index) => (
                <div key={index} className="position-relative me-2 mb-2">
                  <img
                    src={src}
                    alt="Preview"
                    className="rounded"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={() => removePreviewImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "กำลังบันทึก..." : "บันทึก"}
        </button>
      </form>
    </div>
  );
};

export default CreateStepTest;
