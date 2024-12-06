import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";
import caseService from './../../service/caseService';
import pipeService from './../../service/pipeService';

const CreateCase = () => {
  const [formData, setFormData] = useState({
    date: "",
    numberWork: "",
    houseNumber: "",
    villageNo: "",
    subdistrict: "",
    district: "",
    province: "",
    latitude: "",
    longitude: "",
    pipe: "",
    size: "",
    dma: "",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [pipes, setPipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPipes = async () => {
      try {
        const res = await pipeService.listPipe();
        setPipes(res.data.data);
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.response?.data?.msg || "Failed to fetch pipe data.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    };
    fetchPipes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const validTypes = ["image/jpeg", "image/png"];
    const maxFileSize = 5 * 1024 * 1024; // 5MB
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
    if (!formData.latitude || !formData.longitude) {
      Swal.fire({
        title: "Error!",
        text: "Please select a location on the map.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    images.forEach((file) => formDataToSend.append("images", file));

    try {
      const response = await caseService.createCase(formDataToSend);
      Swal.fire({
        title: "Success!",
        text: response.data.msg,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin/case"));
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.msg || "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-create-case container">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="needs-validation" noValidate>
        <div className="row g-4">
          {/* Row 1: Date and Work Number */}
          <div className="col-md-6">
            <label htmlFor="date" className="form-label">
              วันที่ <i className="bi bi-calendar"></i>
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
            <label htmlFor="numberWork" className="form-label">
              เลขที่งาน <i className="bi bi-file-earmark"></i>
            </label>
            <input
              type="text"
              className="form-control"
              id="numberWork"
              name="numberWork"
              value={formData.numberWork}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 2: Address Fields */}
          <div className="col-md-6">
            <label htmlFor="houseNumber" className="form-label">บ้านเลขที่</label>
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
            <label htmlFor="villageNo" className="form-label">หมู่ที่</label>
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
            <label htmlFor="subdistrict" className="form-label">ตำบล</label>
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
            <label htmlFor="district" className="form-label">อำเภอ</label>
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
            <label htmlFor="province" className="form-label">จังหวัด</label>
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

          {/* Row 3: Pipe and Size */}
          <div className="col-md-6">
            <label htmlFor="pipe" className="form-label">ท่อ</label>
            <select
              className="form-control"
              id="pipe"
              name="pipe"
              value={formData.pipe}
              onChange={handleChange}
              required
            >
              <option value="" disabled>-- เลือกประเภทท่อ --</option>
              {pipes?.map(pipe => (
                <option key={pipe._id} value={pipe._id}>
                  {pipe.pipe}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="size" className="form-label">ขนาด</label>
            <input
              type="text"
              className="form-control"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-12 mt-3 mb-3">
          <LoadScript googleMapsApiKey="AIzaSyAsmDXCfNp6EVrsaRMj2okavlxRrty_oLE">
            <GoogleMap
              id="map"
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={{ lat: 13.7367, lng: 100.5232 }}
              zoom={12}
              onClick={(e) => {
                setFormData({
                  ...formData,
                  latitude: e.latLng.lat().toFixed(6),
                  longitude: e.latLng.lng().toFixed(6),
                });
              }}
            >
              {formData.latitude && formData.longitude && (
                <Marker
                  position={{
                    lat: parseFloat(formData.latitude),
                    lng: parseFloat(formData.longitude),
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>

          {/* Row 4: Latitude and Longitude */}
          <div className="col-md-6">
            <label htmlFor="latitude" className="form-label">
              ละติจูด <i className="bi bi-geo"></i>
            </label>
            <input
              type="text"
              className="form-control"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="longitude" className="form-label">
              ลองจิจูด <i className="bi bi-geo-alt"></i>
            </label>
            <input
              type="text"
              className="form-control"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
            />
          </div>

          {/* File Upload */}
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

          {/* Submit Button */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" />
              ) : (
                "บันทึก"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>

  );
};

export default CreateCase;
