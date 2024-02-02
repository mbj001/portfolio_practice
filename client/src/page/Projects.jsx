import React, {useState, useEffect} from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { helmetData, my_project } from '../data/data'
import Axios from "axios";
import "./style.css"
import "./projects.css"

function Projects() {
    // const [flipVal, setFlipVal] = useState(false);
    // const [flipNum, setFlipNum] = useState(-1);

    const [flipVal, setFlipVal] = useState([])

    const [sqlVal, setSqlVal] = useState([]);

    function settingFlip(){
        // setFlipVal(function(){
        //     for(let i=0; i<my_project.length; i++){
        //         flipVal.push(false);
        //     }
        // })
        for(let i=0; i<my_project.length; i++){
            setFlipVal([false, ...flipVal]);
        }
    }
    

    
    useEffect(() => {
        // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
        // document.title = `You clicked ${count} times`;
        Axios.get("/client/projects")
        .then(({data}) => {
            setSqlVal(data);
            console.log("data: " + data);
        })
        .catch((err) => {
            {}
        })
        // settingFlip();
        for(let i=0; i<my_project.length; i++){
            // console.log("진입");
            setFlipVal(flipVal => [...flipVal, false]);
        }
        // console.log(flipVal);
        // console.log(flipVal.length);
      }, []);

    function flipAni(i){
        // setTimeout(function(){
        //     setFlipVal(!flipVal);
        //     setFlipNum(i);
        // }, 600);
        setTimeout(function(){
            let copy = [...flipVal];
            copy[i] = !copy[i];
            setFlipVal(copy);
        }, 600);

        let flip_id = document.getElementsByName("front");

        if(flip_id[i].classList.contains("flip-on") == true){
            flip_id[i].classList.remove("flip-on");
            flip_id[i].classList.add("flip-out");
        }
        else if(flip_id[i].classList.contains("flip-out") == true){
            flip_id[i].classList.remove("flip-out");
            flip_id[i].classList.add("flip-on");
        }
        else{
            flip_id[i].classList.add("flip-on");
        }
        console.log("3" + flipVal[i]);
    }

    return (
        <>
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{helmetData.title} | {helmetData.projects_title}</title>
            </Helmet>
            <div>
                <h1 className="text-center mb-50px mt-50px">PROJECTS</h1>
                <div className="project-box d-flex justify-center pb-50px">
                    {
                        sqlVal.map((item, i) => (
                            <div name="front" className="project-detail" onClick={() => flipAni(i)}><img src={(flipVal[i] == true)? "/images/"+item.orgimg2 : "/images/"+item.orgimg1} alt="project01" /></div>
                        ))
                    }
                </div>
            </div>  
        </HelmetProvider>
        </>
    )
}

export default Projects