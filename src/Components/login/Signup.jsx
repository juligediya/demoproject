import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signup } from '../../Redux/userslice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const validate=(values)=>{
    const errors={};
    const regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
    if(!values.name){
        errors.name="Name must be required"
    }
    if(!values.email){
        errors.email="Email must be required"
    }
    if(!values.password){
        errors.password="Password must be required"
    }
    else if(regex.test(values.email)){
        errors.password="Password must include one UpperCase letter one LowerCase letter digit and Special Character and Length greater than 6."
    }
    return errors;
}

function Signup() {
    const [submit , setIsSubmit]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const formik = useFormik({
        initialValues:{
            name: '',
            email: '',
            password: '',
        },
       
        onSubmit: (values,{resetForm}) => {
            dispatch(signup(values))
            resetForm()
            toast.success('Ragistered Successfully', {autoClose:300, position: 'top-center' })
            navigate('/login')
        },
        validate,
    })
    return (
        <div className='d-flex justify-sontent-center align-items-center' style={{  backgroundColor:'#fbeee6 ',height: '100vh' }}>
            <div style={{ margin  : '30%' }}>
            <form className='form-control m-5 p-5' style={{   border: "2px solid skyblue", width: '450px'  }} onSubmit={formik.handleSubmit}>
                <h1 className='text-center'>Sign Up</h1>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={formik.values.name} onChange={formik.handleChange} />
                </div>
                {submit && formik.errors.name ? <div className='text-danger mb-2'>{formik.errors.name}</div> : null}
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={formik.values.email} onChange={formik.handleChange} />
                </div>
                {submit && formik.errors.email ? <div className='text-danger mb-2'>{formik.errors.email}</div> : null}
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formik.values.password} onChange={formik.handleChange} />
                </div>
                {submit && formik.errors.password ? <div className='text-danger mb-2'>{formik.errors.password}</div> : null}
                <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-dark" onClick={()=>setIsSubmit(true)}>Submit</button>
                                
                    </div>
                    <p className='text-center'>Do you have Already Account?<Link to='/login' className='text-dark'>Login</Link></p>
            </form>
            </div>
        </div>
    )
}

export default Signup