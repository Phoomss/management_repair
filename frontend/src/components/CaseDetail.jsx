import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import caseService from "./../service/caseService";

const CaseDetail = () => {
  const { id } = useParams();
  const [caseDetail, setCaseDetail] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const fetchCaseDetail = async () => {
      try {
        const response = await caseService.caseById(id);
        console.log(response.data.data);
        setCaseDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching case detail:", error);
      }
    };

    fetchCaseDetail();
  }, [id]);

  const handleLoad = () => {
    setMapLoaded(true); // Set state when map is loaded
  };

  if (!caseDetail) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          {/* ข้อมูลหลัก */}
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <p>
                <strong>วันที่:</strong>{" "}
                {new Date(caseDetail.date).toLocaleDateString("th-TH")}
              </p>
              <p>
                <strong>หมายเลขงาน:</strong> {caseDetail.numberWork}
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <p>
                <strong>สถานที่:</strong> {`${caseDetail.houseNumber}, หมู่ ${caseDetail.villageNo}, 
                ต.${caseDetail.subdistrict}, อ.${caseDetail.district}, จ.${caseDetail.province}`}
              </p>
              <p>
                <strong>DMA:</strong> {caseDetail.dma || "-"}
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <p>
                <strong>ท่อ:</strong> {caseDetail?.pipe?.pipe || "-"}
              </p>
              <p>
                <strong>ขนาด:</strong> {caseDetail.size || "-"}
              </p>
            </div>
          </div>

          {/* ส่วนภาพประกอบ */}
          <div>
            <h5>ภาพประกอบ</h5>
            <div className="row">
              {caseDetail.images && caseDetail.images.length > 0 ? (
                caseDetail.images.map((image, index) => (
                  <div key={index} className="col-md-3 mb-3">
                    <div className="card">
                      <img
                        src={`http://localhost:8080${image}`}
                        alt={`Case ${caseDetail.numberWork}`}
                        className="card-img-top img-fluid rounded"
                        style={{
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p>ไม่มีภาพประกอบ</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนแผนที่ */}
      <LoadScript
        googleMapsApiKey="AIzaSyAsmDXCfNp6EVrsaRMj2okavlxRrty_oLE"
        onLoad={handleLoad} // Call handleLoad when the map is ready
      >
        {mapLoaded && (
          <GoogleMap
            id="map"
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={{ lat: caseDetail.latitude, lng: caseDetail.longitude }}
            zoom={12}
          >
            {/* Add a marker with a custom icon */}
            <Marker
              position={{
                lat: caseDetail.latitude,
                lng: caseDetail.longitude,
              }}
              icon={{
                url: `http://localhost:8080${caseDetail.images[0]}`, // Use the first image as the marker icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

export default CaseDetail;
