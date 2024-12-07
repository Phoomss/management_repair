import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import caseService from "./../service/caseService";

const Case = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await caseService.listCase();
        setCases(response.data.data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchCases();
  }, []);

  const handleNextCreate = () => {
    navigate("/admin/case/create");
  };

  const handleNextDetail = (id) => {
    navigate(`/admin/case/detail/${id}`);
  };
  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center mb-3">

        <button className="btn btn-primary" onClick={handleNextCreate}>
          เพิ่มจุดท่อรั่ว
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">วันที่</th>
              <th scope="col">DMA</th>
              <th scope="col">สถานที่</th>
              <th scope="col">ภาพประกอบ</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {cases.length > 0 ? (
              cases.map((caseItem, index) => (
                <tr key={caseItem._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(caseItem.date).toLocaleDateString("th-TH") || "-"}</td>
                  <td>{caseItem.dma || "-"}</td>
                  <td>
                    {`${caseItem.houseNumber}, หมู่ ${caseItem.villageNo}, 
                    ต.${caseItem.subdistrict}, อ.${caseItem.district}, จ.${caseItem.province}`}
                  </td>
                  <td>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      {caseItem.images.map((image, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:8080${image}`}
                          alt={`Case ${caseItem.numberWork}`}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "5px",
                            marginLeft: '5px'
                          }}
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-info btn-sm mx-1" onClick={() => handleNextDetail(caseItem._id)}>
                      รายละเอียด
                    </button>
                    <button className="btn btn-warning btn-sm mx-1">
                      แก้ไข
                    </button>
                    <button className="btn btn-danger btn-sm mx-1">
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">ไม่มีข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Case;
