import React, {useState, useEffect} from 'react'
import Axios from "axios"
import { my_skill, my_timeline } from '../data/data'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import "./skills.css"
import "./style.css"
import { helmetData } from '../data/data'


function Skills() {

    const [skillValue, setSkillValue] = useState([]);
    const [timelineValue, setTimelineValue] = useState([]);

    useEffect(() => {
        Axios.get("/client/skills")
        .then(({data}) => {
            setSkillValue(data);
        })
        .catch((err) => {
            {}
        })

        Axios.get("/client/timeline")
        .then(({data}) => {
            setTimelineValue(data);
        })
        .catch((err) => {
            {}
        })
    }, [])

    return (
        <>
        <HelmetProvider>
            <Helmet>
                <meta charSet='utf-8' />
                <title>{helmetData.title} | {helmetData.skills_title}</title>
            </Helmet>
            <h1 className="text-center mt-50px">Main Skills</h1>
            <div className="skills-box">
                {
                    skillValue.map((item, index) => (
                        <div className="d-flex align-items-center">
                        <p className="skill-text text-center fw-600">{item.name}</p>
                        <div className="skill-bar text-center" style={{width: `${item.percent*6}px`}}>{item.percent} %</div>
                    </div>
                    ))
                }
            </div>
            <div className="timeline-box">
                <h1 className="text-center mt-50px mb-50px">My Work Timeline</h1>
                <div className="timeline-detail">
                    {
                        timelineValue.map((item, index) => (
                            <div className="d-flex"> 
                                <p className="w-50">{item.name}</p>
                                <p className="w-25">{item.area}</p>
                                <p className="w-25">{item.year}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </HelmetProvider>
        </>
    )
}

export default Skills