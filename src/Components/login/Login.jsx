import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/userslice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const validate = (values) => {
    const errors = {};
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
    if (!values.email) {
        errors.email = "Email must be required"
    }
    if (!values.password) {
        errors.password = "Password must be required"
    }
    else if (regex.test(values.email)) {
        errors.password = "Password must include one UpperCase letter one LowerCase letter digit and Special Character and Length greater than 6."
    }
    return errors;
}
function Login() {
    const [submit , setIsSubmit]=useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        
        onSubmit:(values) => {
           
            dispatch(login(values))
            const islogin = localStorage.getItem('login')
            if (islogin) {
                toast.success('Login Successfully', { autoClose: 300, position: 'top-center' })
                navigate('/')
            }
            else {
                toast.error('Invalid Email or Password', { autoClose: 300, position: 'top-center' })
            }
        },
        validate
        
    })

    return (
        <div className='d-flex justify-sontent-center align-items-center' style={{ backgroundColor:'#fbeee6 ',height: '100vh' }}>
            <div style={{ margin  : '30%' }}>
                <form className='form-control p-5 rounded-3' style={{ border: "2px solid skyblue", width: '450px' }} onSubmit={formik.handleSubmit} >
                    <h1 className='text-center'>Login</h1>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    {submit && formik.touched.email && formik.errors.email ? <div className='text-danger mb-2'>{formik.errors.email}</div> : null}
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    {submit && formik.touched.password && formik.errors.password ? <div className='text-danger mb-2'>{formik.errors.password}</div> : null}
                    <div className='d-flex justify-content-center my-4'>
                        <button type="submit" className="btn btn-dark" onClick={()=>setIsSubmit(true)}>Login</button>
                        
                    </div>
                    <p className='text-center'>You don't have account?<Link to='/signup' className='text-dark'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login