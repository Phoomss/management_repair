import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import caseService from "../../service/caseService";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap

const Case = () => {
  const [cases, setCases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchDate, setSearchDate] = useState("");
  const [searchDma, setSearchDma] = useState("");
  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const [selectedCase, setSelectedCase] = useState(null); // Store the selected case for details
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await caseService.listCase();
        setCases(response.data.data);
        setTotalPages(Math.ceil(response.data.data.length / itemsPerPage));
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

  const handleEdit = (id) => {
    navigate(`/admin/case/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
      try {
        await caseService.deleteCase(id);
        setCases(cases.filter((caseItem) => caseItem._id !== id));
        alert("ลบข้อมูลเรียบร้อยแล้ว");
      } catch (error) {
        console.error("Error deleting case:", error);
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
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
  });

  // Get cases to display for the current page
  const indexOfLastCase = currentPage * itemsPerPage;
  const indexOfFirstCase = indexOfLastCase - itemsPerPage;
  const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);

  const handleOpenModal = (caseItem) => {
    setSelectedCase(caseItem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCase(null);
  };

  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary" onClick={handleNextCreate}>
          เพิ่มจุดท่อรั่ว
        </button>
      </div>

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
              <th scope="col">รายชื่อผู้ตรวจ</th>
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
                  <td>{caseItem.inspector?.title || ""}{caseItem.inspector?.firstName || ""} {caseItem.inspector?.lastName || ""}</td>
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
                      onClick={() => handleOpenModal(caseItem)}
                    >
                      รายละเอียด
                    </button>
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => handleEdit(caseItem._id)}
                    >
                      แก้ไข
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDelete(caseItem._id)}
                    >
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

      {/* Modal for Case Details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดจุดท่อรั่ว</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCase && (
            <div>
              <h5>ผู้ตรวจ: {selectedCase.inspector?.firstName} {selectedCase.inspector?.lastName}</h5>
              <p>วันที่: {new Date(selectedCase.date).toLocaleDateString("th-TH")}</p>
              <p>DMA: {selectedCase.dma}</p>
              <p>สถานที่: {`${selectedCase.houseNumber}, หมู่ ${selectedCase.villageNo}, 
              ต.${selectedCase.subdistrict}, อ.${selectedCase.district}, จ.${selectedCase.province}`}</p>
              <div>
                <h6>ภาพประกอบ:</h6>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {selectedCase.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:8080${image}`}
                      alt={`Case ${selectedCase.numberWork}`}
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
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Case;
