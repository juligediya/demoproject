import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, deletePost, fetchPosts, updatePost } from '../Redux/userslice'
import { toast } from 'react-toastify'


function Home() {
    const [data, setdata] = useState({
        title: '',
        body: ''
    })
    const existingPost = useSelector((state) => state.data.posts)
    const [posts, setposts] = useState(existingPost)
    const [edit, seteditedpost] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value })
        if (isEdit) {
            seteditedpost({ ...edit, [name]: value })
        }

    }
    const addData = (e) => {
        e.preventDefault()
        if (isEdit) {

            dispatch(updatePost(edit))
            setIsEdit(false)
            seteditedpost('')
            setdata({ title: '', body: "" })
            setposts((prev) => {
                return prev.map((item) => {
                    return item.id === edit.id ? edit : item
                })
            })
            toast.success('edited successfully', { position: 'top-center' })
        } else {
            dispatch(addPost(data))
            setdata({ title: '', body: "" })
            setposts((prev) => [...prev, data])
            toast.success('added successfully', { position: 'top-center' })
        }
        
    }
    const deletepost = (id) => {
        dispatch(deletePost(id))
        setposts(posts.filter((item) => item.id !== id))
        toast.success('Deleted successfully', { position: 'top-center' })
    }
    const editpost = (item) => {
        setIsEdit(true)
        seteditedpost(item)
    }

    return (
        <div style={{overflow:'scroll',maxHeight:'100vh'}}>
            <form className='form-control m-5' style={{ width: '250px' }}>
                <h4>Add New</h4>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={!isEdit ? data.title : edit.title} onChange={(e) => handleChange(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Body</label>
                    <input type="text" className="form-control" name="body" value={!isEdit ? data.body : edit.body} onChange={(e) => handleChange(e)} />
                </div>
                <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-primary" onClick={(e) => addData(e)}>{isEdit ? "Edit" : 'Submit'}</button></div>
            </form>
            <div className='d-flex flex-wrap m-3'>{posts?.map((item, index) => {
                return <div key={index}>
                    <div className="card m-2" style={{ width: '250px', height: '250px' }}>

                        <div className="card-body">
                            <h5 className="card-title">{item.title.slice(0, 20)}</h5>
                            <p className="card-text ">{item.body.slice(0, 100)}</p>

                            <a href="#" className="btn btn-primary m-2" onClick={() => editpost(item)}>Edit</a>
                            {/* <a href="#" className="btn btn-danger m-2" onClick={()=>deletepost(item.id)}>Delete</a> */}

                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Delete
                            </button>


                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Do you want to delete? - {item.title}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
                                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => deletepost(item.id)}>Yes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })}</div>
        </div>
    )
}

export default Home