import React, {useEffect, useState} from 'react'
import Axios from "axios";
import { HelmetProvider, Helmet } from 'react-helmet-async'
import Alert from "react-bootstrap/Alert"
import * as emailjs from "emailjs-com"
import { helmetData, my_info } from '../data/data'
import "./style.css"
import "./contact.css"

function Contact() {
    const [sqlVal, setSqlVal] = useState([]);

    const [formData, setFormData] = useState({
        email:"",
        name:"",
        message:"",
        show:false,
        alertmessage:"",
        variant:""
      });

   

      const handleSubmit =(e) =>{
        e.preventDefault();
        setFormData({ loading:true });
        
        const templateParams ={
          from_name : formData.email,
          user_name : formData.name,
          to_name : sqlVal[0].email,
          message : formData.message
        };
    
          emailjs.send(
            // my_info.service_id,
            // my_info.template_id,
            // templateParams,
            // my_info.api
            sqlVal[0].service_id,
            sqlVal[0].template_id,
            templateParams,
            sqlVal[0].api,
           ).then(
             (res) =>{
            //   console.log(res.text)
              console.log("전송 성공");
              setFormData({
              loading: false,
              alertmessage: "전송 성공, 답변 드리겠습니다. 감사합니다.",
              variant: 'success',
              show:true
            });
           },(error) => {
            console.log("전송 실패");
    
              setFormData({
              alertmessage: "전송 실패.",
              variant: 'danger',
              show: true
            });
            }
        )
      };
    
    console.log(formData);
    
    useEffect(() => {
        Axios.get("/client/contact")
        .then(({data}) => {
            setSqlVal(data);
            console.log("sqlVal: " + sqlVal[0].email);
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
                <title>{helmetData.title} | {helmetData.contact_title}</title>
                <meta name="description" content={helmetData.description} />
            </Helmet>
            <div className="w-80 text-center m-auto">
                <Alert key= {formData.variant} variant={formData.variant} className={`rounded-0 co-alert ${formData.show? "d-block":"d-none"}`} onClose={()=>setFormData({show:false})} dismissible>
                    <p className='my-0 fs-20px fw-700'>{formData.alertmessage}</p>
                </Alert>
            </div>
            <h1 className="text-center mt-50px mb-70px">CONTACT ME</h1>
            <form onSubmit={handleSubmit}>
                <div className='contact-box d-flex m-center align-items-center'>
                    {/* <div className="contact-left-box text-center mb-100px">
                        <img src="/images/contact.jpg" alt="" />
                        <p className="fs-20px fw-700 mt-30px mb-0px pb-0px">EMAIL : {my_info.email}</p>
                        <p className="fs-20px fw-700 mt-0px pt-0px">PHONE : {my_info.phone}</p>
                        <p className="text-center fw-500 mt-50px mb-50px">Thank You</p>
                    </div> */}
                    {
                        sqlVal.map((item, index) => (
                            <div className="contact-left-box text-center mb-100px">
                                <img src={"/images/" + item.orgimg} alt="" />
                                <p className="fs-20px fw-700 mt-30px mb-0px pb-0px">EMAIL : {item.email}</p>
                                <p className="fs-20px fw-700 mt-0px pt-0px">PHONE : {item.phone}</p>
                                <p className="text-center fw-500 mt-50px mb-50px">Thank You</p>
                            </div>
                        ))
                    }
                    <div className="contact-right-box text-center mb-100px">
                        <input className="input-form" type="text" name="name" placeholder='Name' required />
                        <input className="input-form" type="text" name="email" placeholder='Eamil' required />
                        <textarea className="textarea-form" name="message" cols="30" rows="10" placeholder='Message' required></textarea>
                        <button type="submit" className="contact-button">SEND</button>
                    </div>
                </div>
            </form>
        </HelmetProvider>
        </>
    )
}

export default Contact