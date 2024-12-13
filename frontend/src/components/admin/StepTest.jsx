import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import stepTesstService from '../../service/stepTestService'

const StepTest = () => {
  const [stepTests,setStepTests] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchData = async()=>{
      const res = await stepTesstService.listStepTest()
      setStepTests(res.data.data)
      console.log(res.data.data)
    }
    fetchData()
  },[])

  const handleCreate = () => {
    navigate("/admin/step-test/create")
  }
  return (
    <div className="form-create-step-test">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary" onClick={handleCreate}>
          เพิ่ม step test
        </button>
      </div>
    </div>
  )
}

export default StepTest