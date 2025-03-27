import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux';
import { signup } from '../Redux/userslice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const validate=(values)=>{
    const errors={};
    const regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
    if(!values.name){
        errors.name="name must be required"
    }
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

function Signup() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const formik = useFormik({
        initialValues:{
            name: '',
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values,{resetForm}) => {
            dispatch(signup(values))
            resetForm()
            toast.success('ragistered Successfully', { position: 'top-center' })
            navigate('/login')
        }
    })
    return (
        <div>
            <form className='form-control m-5 p-3' style={{ border: "2px solid skyblue", width: '300px' }} onSubmit={formik.handleSubmit}>
                <h1 className='text-center'>Sign Up</h1>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={formik.values.name} onChange={formik.handleChange} />
                </div>
                {formik.errors.name ? <div className='text-danger mb-2'>{formik.errors.name}</div> : null}
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={formik.values.email} onChange={formik.handleChange} />
                </div>
                {formik.errors.email ? <div className='text-danger mb-2'>{formik.errors.email}</div> : null}
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formik.values.password} onChange={formik.handleChange} />
                </div>
                {formik.errors.password ? <div className='text-danger mb-2'>{formik.errors.password}</div> : null}
                <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
            </form>

        </div>
    )
}

export default Signup