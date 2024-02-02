import React, {useState, useEffect} from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { helmetData } from "../data/data.js";
import Axios from "axios";
import TypeWriter from "typewriter-effect";
import "./style.css"
import "./main.css"

function Main() {

    const [myinfo, setMyinfo] = useState([]);

    useEffect(() => {
        console.log("main");
        Axios.get("/client/main")
        .then(({data}) => {
            setMyinfo(data);
        })
        .catch((err) => {
            {}
        })
    }, [])
    
    return (
        <>
        <HelmetProvider>
            <Helmet>
                <meta Charset="utf-8" />
                <title> {helmetData.title} | {helmetData.main_title} </title>
                <meta name="description" content={helmetData.description} />
            </Helmet>
            <div className="position-relative">
                {
                    myinfo.map((item, index) => (
                        <p key="{index}" className="main-typewriter fs-40px fw-700 text-center mt-150px white-space-prewrap">
                            <TypeWriter
                                options = {{
                                    strings: [`${item.main_content}`],
                                    autoStart: true,
                                    loop: true
                                }}
                            />
                        </p>
                    ))
                }
                {
                    myinfo.map((item, index) => (
                        <p key="{index}" className="main-content position-absolute fs-60px fw-700">{item.sub_content}</p>                    
                    ))
                }
            </div>
                
        </HelmetProvider>
        </>
    )
}

export default Main