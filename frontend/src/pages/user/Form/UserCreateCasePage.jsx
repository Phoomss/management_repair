import React from 'react'
import CreateCase from '../../../components/user/Form/CreateCase'

const UserCreateCasePage = () => {
    return (
        <div className='p-2'>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">เพิ่มจุดท่อรั่ว</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">user</a></li>
                                <li className="breadcrumb-item active">create</li>
                                <li className="breadcrumb-item active">create</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <CreateCase />
        </div>
    )
}

export default UserCreateCasePage