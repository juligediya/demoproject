import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux';
import { login } from '../Redux/userslice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const validate=(values)=>{
    const errors={};
    const regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
    if(!values.email){
        errors.email="email must be required"
    }
    if(!values.password){
        errors.password="password must be required"
    }
    else if(regex.test(values.email)){
        errors.password="Password must include one UpperCase letter one LowerCase letter digit and Special Character and Length greater than 6."
    }
    return errors;
}
function Login() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const formik=useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validate,
        onSubmit:(values)=>{
            dispatch(login(values))
            const islogin=localStorage.getItem('login')
            if(islogin==='true'){
                toast.success('login successfully', { position: 'top-center' })
                navigate('/dashboard')
            }
            else{
                toast.error('invalid email or password', { position: 'top-center' })
            }
        }
    })
    return (
        <div>
            <form className='form-control  m-5 p-3' style={{border:"2px solid skyblue",width:'300px'}} onSubmit={formik.handleSubmit}>
                <h1 className='text-center'>Login</h1>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={formik.values.email} onChange={formik.handleChange}/>
                </div>
                {formik.errors.email ? <div className='text-danger mb-2'>{formik.errors.email}</div> : null}
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formik.values.password} onChange={formik.handleChange} />
                </div>
                {formik.errors.password ? <div className='text-danger mb-2'>{formik.errors.password}</div> : null}
                <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-primary mx-3"><a href='/signup' className='text-white text-decoration-none'>Sign Up</a></button>
                </div>
            </form>

        </div>
    )
}

export default Login