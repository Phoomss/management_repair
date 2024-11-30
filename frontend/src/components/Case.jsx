import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import caseService from './../service/caseService';

const Case = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
      const fetchCases = async () => {
          try {
              const response = await caseService.listCase()
              setCases(response.data.data);
          } catch (error) {
              console.error("Error fetching cases:", error);
          }
      };

      fetchCases();
  }, []);
  const navigate = useNavigate()

  const handleNextCreate = () => {
    navigate('/admin/case/create')
  }
  return (
    <>
    <button className='btn btn-primary'onClick={handleNextCreate}>เพิ่มจุดท่อรั่ว</button>
      {/* <div className="tb-content m-3">
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
      </div> */}
     <div>
            <h1>Case List</h1>
            <ul>
                {cases.map((caseItem) => (
                    <li key={caseItem._id}>
                        <h2>{caseItem.numberWork}</h2>
                        <div>
                            {caseItem.images.map((image, index) => (
                                <img key={index} src={`http://localhost:8080${image}`} alt={`Case ${caseItem.numberWork}`} style={{ width: '100px' }} />
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </>
  )
}

export default Case