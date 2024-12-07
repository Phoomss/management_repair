import React from 'react'

const AnalysisUser = () => {
    return (
        <div>
            <div className="row">
                <div className="col-lg-4 col-12">
                    {/* small box */}
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>53<sup style={{ fontSize: 20 }}>%</sup></h3>
                            <p>จำนวนการแจ้งประจำวัน</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-4 col-12">
                    {/* small box */}
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>44</h3>
                            <p>จำนวนการแจ้งประจำสัปดาห์</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-4 col-12">
                    {/* small box */}
                    <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>65</h3>
                            <p>จำนวนการแจ้งประจำเดือน</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-pie-graph" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
            </div>
        </div>
    )
}

export default AnalysisUser