import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker, useLoadScript } from "@react-google-maps/api";
import caseService from "./../service/caseService";

const CaseDetail = () => {
  const { id } = useParams();
  const [caseDetail, setCaseDetail] = useState(null);

  useEffect(() => {
    const fetchCaseDetail = async () => {
      try {
        const response = await caseService.caseById(id);
        setCaseDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching case detail:", error);
      }
    };

    fetchCaseDetail();
  }, [id]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAsmDXCfNp6EVrsaRMj2okavlxRrty_oLE",
  });

  if (!isLoaded || !caseDetail) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      {/* Case Information Section */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h5>รายละเอียดจุดท่อรั่ว</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(caseDetail.date).toLocaleDateString("th-TH")}
              </p>
              <p>
                <strong>Work Number:</strong> {caseDetail.numberWork}
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <p>
                <strong>Location:</strong>{" "}
                {`${caseDetail.houseNumber}, Moo ${caseDetail.villageNo}, 
                T.${caseDetail.subdistrict}, A.${caseDetail.district}, P.${caseDetail.province}`}
              </p>
              <p>
                <strong>DMA:</strong> {caseDetail.dma || "-"}
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <p>
                <strong>Pipe:</strong> {caseDetail?.pipe?.pipe || "-"}
              </p>
              <p>
                <strong>Size:</strong> {caseDetail.size || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="card shadow mb-4">
        <div className="card-header bg-secondary text-white">
          <h5>รูปภาพ</h5>
        </div>
        <div className="card-body">
          <div className="row">
            {caseDetail.images && caseDetail.images.length > 0 ? (
              caseDetail.images.map((image, index) => (
                <div key={index} className="col-md-3 mb-3">
                  <div className="card">
                    <img
                      src={`http://localhost:8080${image}`}
                      alt={`Case ${caseDetail.numberWork}`}
                      className="card-img-top img-fluid rounded"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p>No Images Available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="card shadow mb-4">
        <div className="card-header bg-success text-white">
          <h5>ตำแหน่ง</h5>
        </div>
        <div className="card-body p-0">
          <GoogleMap
            id="map"
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={{ lat: caseDetail.latitude, lng: caseDetail.longitude }}
            zoom={12}
          >
            <Marker
              position={{
                lat: caseDetail.latitude,
                lng: caseDetail.longitude,
              }}
            />
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
