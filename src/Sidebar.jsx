import React from 'react'
import {
    BsGrid1X2Fill, BsListCheck, BsMenuButtonWideFill
} from 'react-icons/bs'
import { FaWindowClose } from "react-icons/fa";




function Sidebar({ openSidebarToggle, OpenSidebar, pageChanger }) {
    return (
        <aside id='sidebar' className={openSidebarToggle ? 'sidebar-responsive' : ''}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    {/* <BsCart3 className='icon_header' />SHOP */}
                    Kakeru's Language
                </div>

                {/* <span className='icon close_icon' onClick={OpenSidebar}>X</span> */}
                <FaWindowClose className='icon close_icon' onClick={OpenSidebar} />
            </div>




            <ul className='sidebar-list'>
                <li className='sidebar-list-item' onClick={() => pageChanger('')}>
                    <BsGrid1X2Fill className='icon' /> DashBoard
                </li>
                <li className='sidebar-list-item' onClick={() => pageChanger('engList')}>
                    <BsMenuButtonWideFill className='icon' /> English List
                </li>
                <li className='sidebar-list-item' onClick={() => pageChanger('engQuiz')}>
                    <BsListCheck className='icon' /> English Quiz
                </li>

                <li className='sidebar-list-item' onClick={() => pageChanger('chinaList')}>
                    <BsMenuButtonWideFill className='icon' /> 中文 List
                </li>
                <li className='sidebar-list-item' onClick={() => pageChanger('chinaQuiz')}>
                    <BsListCheck className='icon' /> 中文 Quiz
                </li>




            </ul>
        </aside>
    )
}

export default Sidebar