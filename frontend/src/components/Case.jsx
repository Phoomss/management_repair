import React from 'react'
import { useNavigate } from 'react-router-dom';

const Case = () => {
  const navigate = useNavigate()

  const handleNextCreate = () => {
    navigate('/admin/case/create')
  }
  return (
    <>
    <button className='btn btn-primary'onClick={handleNextCreate}>เพิ่มจุดท่อรั่ว</button>
      <div className="tb-content m-3">
        <div className="table-responsive">
          <div className="table table-border table-gray table-striped text-center">
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>จัดการ</th>
              </tr>
            </thead>
          </div>
        </div>
      </div>
    </>
  )
}

export default Case