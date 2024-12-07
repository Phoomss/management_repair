import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import caseService from "./../service/caseService";
import Swal from "sweetalert2"; // Import SweetAlert2

const StepTest = () => {
  const [cases, setCases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [searchDate, setSearchDate] = useState(""); // State to track search by date
  const [searchDma, setSearchDma] = useState(""); // State to track search by DMA
  const itemsPerPage = 10; // Define the number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await caseService.listCase(); // Fetch the cases
        setCases(response.data.data);
        setTotalPages(Math.ceil(response.data.data.length / itemsPerPage)); // Calculate total pages
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchCases();
  }, []);


  const handleNextDetail = (id) => {
    navigate(`/admin/case/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/case/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        await caseService.deleteCase(id);
        setCases(cases.filter((caseItem) => caseItem._id !== id));

        Swal.fire({
          title: "ลบข้อมูลเรียบร้อยแล้ว",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting case:", error);

      Swal.fire({
        title: "เกิดข้อผิดพลาดในการลบข้อมูล",
        icon: "error",
      });
    }
  };

  // Pagination handler
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Filter cases based on search criteria (date and dma)
  const filteredCases = cases.filter((caseItem) => {
    const matchesDate = searchDate
      ? new Date(caseItem.date).toLocaleDateString("en-CA") === searchDate
      : true;

    const matchesDma = searchDma
      ? caseItem.dma && caseItem.dma.toLowerCase().includes(searchDma.toLowerCase())
      : true;

    return matchesDate && matchesDma;
  })

  // Get cases to display for the current page
  const indexOfLastCase = currentPage * itemsPerPage;
  const indexOfFirstCase = indexOfLastCase - itemsPerPage;
  const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);

  return (
    <div className="step-test">
      {/* Search filters */}
      <div className="d-flex mb-3">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="form-control me-2"
          placeholder="ค้นหาด้วยวันที่"
        />
        <input
          type="text"
          value={searchDma}
          onChange={(e) => setSearchDma(e.target.value)}
          className="form-control"
          placeholder="ค้นหาด้วย DMA"
        />
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
            {currentCases.length > 0 ? (
              currentCases.map((caseItem, index) => (
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
                            marginLeft: "5px",
                          }}
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-info btn-sm mx-1"
                      onClick={() => handleNextDetail(caseItem._id)}
                    >
                      รายละเอียด
                    </button>
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => handleEdit(caseItem._id)}
                    >
                      ออกเอกสาร
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

      {/* Pagination Controls */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePreviousPage}>
              ก่อนหน้า
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button className="page-link" onClick={handleNextPage}>
              ถัดไป
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StepTest;
