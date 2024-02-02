import React from 'react'
import { Link } from "react-router-dom"
import "./style.css"
import "./header.css"

function Header() {


    return (
        <>
        <div className="header-bar d-flex justify-between position-fixed w-100 align-items-center pb-35px pt-35px z-100">
            <div className="white-space-nowrap">
                <Link to="/" className="logo pl-30px pr-30px">
                    BJ MIN
                </Link>
            </div>
            {/* <p className="logo ml-30px">BJ MIN</p> */}
            <div className="header-nav mr-30px">
                <Link to="/About">
                    About
                </Link>
                <Link to="/Skills">
                    Skills
                </Link>
                <Link to="/Projects">
                    Projects
                </Link>
                <Link to="/Contact">
                    Contact
                </Link>
            </div>
        </div>
        <div className="h-106px"></div>
        </>
    )
}

export default Header