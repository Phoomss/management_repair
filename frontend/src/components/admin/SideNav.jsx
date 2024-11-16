import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import userService from '../../service/userService'
import Swal from 'sweetalert2'

const SideNav = () => {
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()

    const handleLogout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'แน่ใจแล้วหรอที่จะออกจากระบบ',
            showCancelButton: true,
            confirmButtonText: 'กดเพื่อออกจากระบบ',
            cancelButtonText: 'กดยกเลิกยังไม่แน่ใจ'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token')
                Swal.fire({
                    icon: 'success',
                    title: 'ออกจากระบบสำเร็จ',
                    text: 'แล้วเจอกันใหม่สวัสดี',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
                navigate('/')
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userService.userInfo()
                setUserInfo(res.data.data)
            } catch (error) {
                console.error("Error fetching user info:", error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <div className="sidebar">
                {userInfo && (
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="info">
                                <h5 className="d-block bg-dark">{userInfo.title}{userInfo.firstName} {userInfo.lastName}</h5>
                                <p className="d-block text-center bg-dark">สถานะ: <span className='bg-success p-1'>{userInfo.role}</span></p>
                            </div>
                        </div>
                    )}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <NavLink to='/admin/dashboard' className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>แดชบอร์ด</p>
                                </NavLink>
                            </li>
                            <li className="nav-header">จัดการระบบ</li>
                            <li className="nav-item">
                                <NavLink to='/admin/products' className="nav-link">
                                    <i className="nav-icon fab fa-product-hunt" />
                                    <p>สินค้า</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/categories' className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>ประเภทสินค้า</p>
                                </NavLink>
                            </li>
                            <li className="nav-header">จัดการใบเสนอราคา</li>
                            <li className="nav-item">
                                <NavLink to='/admin/order/pass' className="nav-link">
                                    <i className="nav-icon fas fa-clipboard-check" />
                                    <p>ตรวจสอบแล้ว</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/order/process' className="nav-link">
                                    <i className="nav-icon fas fa-spinner" />
                                    <p>ยังไม่ได้ตรวจสอบ</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/order/fail' className="nav-link">
                                    <i className="nav-icon fas fa-file-excel" />
                                    <p>ใบเสนอราคาที่ผิดพลาด</p>
                                </NavLink>
                            </li>

                            <li className="nav-header">จัดการข้อมูล</li>
                            <li className="nav-item">
                                <NavLink to='/admin/customers' className="nav-link">
                                    <i className="nav-icon 	fas fa-user-friends" />
                                    <p>ข้อมูลลูกค้า</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/sales' className="nav-link">
                                    <i className="nav-icon 	fas fa-user-friends" />
                                    <p>ข้อมูลเซลล์</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/profile' className="nav-link">
                                    <i className="nav-icon 	fas fa-user-circle" />
                                    <p>ข้อมูลส่วนตัว</p>
                                </NavLink>
                            </li>
                            <li className="nav-header">ออกจากระบบ</li>
                            <li className="nav-item">
                                <div onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
                                    <i className="nav-icon far fa-circle text-danger" />
                                    <p className="text">ออกจากระบบ</p>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside >
        </div >
    )
}

export default SideNav
