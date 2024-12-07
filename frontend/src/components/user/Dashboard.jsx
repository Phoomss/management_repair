import React from 'react';
import CaseDay from '../chart/CaseDay';
import CaseWeek from '../chart/CaseWeek';
import CaseMonth from '../chart/CaseMonth';
import AnalysisUser from '../card/AnalysisUser';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <section className="content">
        <div className="container-fluid">
          <AnalysisUser />
          {/* Charts */}
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <CaseDay />
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <CaseWeek />
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <CaseMonth />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{/* /.content */}
    </div>
  );
};

export default Dashboard;
