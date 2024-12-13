import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import stepTesstService from '../../../service/stepTestService';

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
  const [steps, setSteps] = useState([{ stepTest: "", roundNo: "" }]);
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
    const updatedSteps = steps.map((step, i) =>
      i === index ? { ...step, [name]: value } : step
    );
    setSteps(updatedSteps);
  };

  const addStep = () => {
    setSteps([...steps, { stepTest: "", roundNo: "" }]);
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxFileSize = 5 * 1024 * 1024;
    const files = Array.from(e.target.files);

    const validFiles = files.filter(
      (file) => validTypes.includes(file.type) && file.size <= maxFileSize
    );

    if (validFiles.length !== files.length) {
      Swal.fire({
        title: "Invalid File!",
        text: "Ensure all files are JPEG/PNG and below 5MB.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setImages(validFiles);
    setPreviewImages(validFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    steps.forEach((step, index) => {
      formDataToSend.append(`steps[${index}][stepTest]`, step.stepTest);
      formDataToSend.append(`steps[${index}][roundNo]`, step.roundNo);
    });

    images.forEach((file) => formDataToSend.append("images", file));

    try {
      const res = await stepTesstService.createStepTest(formDataToSend);
      Swal.fire({
        title: "Success!",
        text: res.data.msg,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin/step-test"));
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.msg || "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='form-create-step-test container'>
      <form onSubmit={handleSubmit} encType='multipart/form-data' className="needs-validation" noValidate>
        <div className="row g-4">
          {/* Other form fields */}
          <div className="col-md-12">
            <label className="form-label">Step Test Details</label>
            {steps.map((step, index) => (
              <div key={index} className="row g-2 mb-2">
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    name="stepTest"
                    value={step.stepTest}
                    onChange={(e) => handleStepChange(index, e)}
                    placeholder="Step Test"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    name="roundNo"
                    value={step.roundNo}
                    onChange={(e) => handleStepChange(index, e)}
                    placeholder="Round No"
                    required
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center">
                  <button type="button" className="btn btn-danger" onClick={() => removeStep(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-primary mt-2" onClick={addStep}>
              Add Step
            </button>
          </div>

          <div className="col-12">
            <label htmlFor="images" className="form-label">Upload Images</label>
            <input
              type="file"
              className="form-control"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="mt-3 d-flex flex-wrap gap-2">
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              ))}
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateStepTest;
