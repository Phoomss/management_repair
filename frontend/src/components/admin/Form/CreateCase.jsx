import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import caseService from "../../../service/caseService";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชันจัดการการอัปโหลดไฟล์
  const handleFileChange = (e) => {
    setImages(e.target.files); // เปลี่ยนให้เป็นไฟล์หลายไฟล์
  };

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    
    // เพิ่มข้อมูลที่กรอกในฟอร์มเข้าไปใน FormData
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // เพิ่มไฟล์เข้าใน FormData
    Array.from(images).forEach((file) => {
      formDataToSend.append("images", file); // ใช้ชื่อ "images" ให้ตรงกับที่ backend คาดหวัง
    });

    try {
      const response = await caseService.createCase(formDataToSend);

      setLoading(false);
      Swal.fire({
        title: "สำเร็จ!",
        text: response.data.msg,
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        navigate("/admin/case"); // เปลี่ยนเส้นทางหลังจากบันทึกสำเร็จ
      });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: err.response?.data?.msg || "เกิดข้อผิดพลาดบางอย่าง",
        icon: "error",
        confirmButtonText: "ลองใหม่",
      });
    }
  };

  return (
    <Container className="mt-5">
      <h2>สร้างเคสใหม่</h2>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Col md={6}>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>วันที่</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="numberWork" className="mb-3">
              <Form.Label>เลขที่งาน</Form.Label>
              <Form.Control
                type="text"
                name="numberWork"
                value={formData.numberWork}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="houseNumber" className="mb-3">
              <Form.Label>บ้านเลขที่</Form.Label>
              <Form.Control
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="villageNo" className="mb-3">
              <Form.Label>หมู่ที่</Form.Label>
              <Form.Control
                type="text"
                name="villageNo"
                value={formData.villageNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="subdistrict" className="mb-3">
              <Form.Label>ตำบล</Form.Label>
              <Form.Control
                type="text"
                name="subdistrict"
                value={formData.subdistrict}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="district" className="mb-3">
              <Form.Label>อำเภอ</Form.Label>
              <Form.Control
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="province" className="mb-3">
              <Form.Label>จังหวัด</Form.Label>
              <Form.Control
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="latitude" className="mb-3">
              <Form.Label>ละติจูด</Form.Label>
              <Form.Control
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="longitude" className="mb-3">
              <Form.Label>ลองจิจูด</Form.Label>
              <Form.Control
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="pipe" className="mb-3">
              <Form.Label>ท่อ</Form.Label>
              <Form.Control
                type="text"
                name="pipe"
                value={formData.pipe}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="size" className="mb-3">
              <Form.Label>ขนาด</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="dma" className="mb-3">
              <Form.Label>DMA</Form.Label>
              <Form.Control
                type="text"
                name="dma"
                value={formData.dma}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="images" className="mb-3">
              <Form.Label>อัปโหลดรูปภาพ</Form.Label>
              <Form.Control
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateCase;
