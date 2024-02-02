import React, {useState, useEffect} from 'react'
import Axios from "axios" 
import { HelmetProvider, Helmet } from 'react-helmet-async'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {RiUser3Fill, RiCake2Fill, RiHome8Line, RiMailLine, RiGraduationCapFill} from "react-icons/ri"
import "./style.css"
import "./about.css"
import TypeWriter from "typewriter-effect"
import { helmetData, my_info } from '../data/data'

function About() {
    const [aboutInfo, setAboutInfo] = useState([]);

    useEffect(() => {
        Axios.get("/client/about")
        .then(({data}) => {
            console.log(data);
            setAboutInfo(data);
        })
        .catch((err) => {
            {}
        })
    }, [])

    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet='utt-8' />
                <title>{helmetData.title} | {helmetData.about_title}</title>
            </Helmet>
            <div>
                <div>
                    <div className="about-box">
                        <p className="text-center fs-30px fw-700">ABOUT</p>
                        {
                            aboutInfo.map((item, index) => (
                                <div className="d-flex align-items-center">
                                    <div className="photo-box"><img src={"/images/" + item.orgphoto} alt="photo" /></div>
                                    <div className="pl-30px">
                                        <p key={"name-" + index} className="fs-18px"><RiUser3Fill className="about-icon"/>{item.name}</p>
                                        <p key={"birth-" + index} className="fs-18px"><RiCake2Fill className="about-icon" />{item.birthday}</p>
                                        <p key={"address-" + index} className="fs-18px"><RiHome8Line className="about-icon" />{item.address}</p>
                                        <p key={"email-" + index} className="fs-18px"><RiMailLine className="about-icon" />{item.email}</p>
                                        <p key={"school-" + index} className="fs-18px"><RiGraduationCapFill className="about-icon" />{item.school} ({item.department})</p>
                                    </div>  
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default About