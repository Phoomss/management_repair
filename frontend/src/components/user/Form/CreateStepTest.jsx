import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import stepTesstService from '../../../service/stepTestService';

const CreateStepTest = () => {
  const [stepTestData, setStepTestData] = useState({
    date: "",
    dma: "",
    numberWork: "",
    houseNumber: "",
    villageNo: "",
    subdistrict: "",
    district: "",
    province: "",
    stepTest: "",
    roundNo: "",
    value: "",
  })
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setStepTestData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const validTypes = ['image/jpeg', 'image/png']
    const maxFileSize = 5 * 1024 * 1024
    const files = Array.from(e.target.files)

    const validFiles = files.filter(
      (file)=>validTypes.includes(file.type) && file.size <= maxFileSize
    )

    if(validFiles.length !== files.length){
      Swal.fire({
        title: "Invalid File!",
        text: "Ensure all files are JPEG/PNG and below 5MB.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setImages(validFiles)
    setPreviewImages(validFiles.map((file)=>URL.createObjectURL(file)))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)

    const stepTestDataToSend = new FormData()
    Object.keys(FormData).forEach((key)=>{
      stepTestDataToSend.append(key,stepTestData[key])
    })
    images.forEach((file)=> stepTestDataToSend.append("images",file))

    try {
      const res = await stepTesstService.createStepTest(stepTestDataToSend)
      Swal.fire({
        title: "Success!",
        text: res.data.msg,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin/step-test"));
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.msg || "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = () => {
    navigate("/admin/step-test/create")
  }
  return (
    <div>CreateStepTest</div>
  )
}

export default CreateStepTest