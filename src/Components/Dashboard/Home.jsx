import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, deletePost, updatePost } from '../../Redux/userslice'
import { toast } from 'react-toastify'
import Sidebar from './Sidebar'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createPosts, deletePosts, fetchPosts, updatePosts } from '../../API/API'

function Home() {
    const [data, setData] = useState({
        title: '',
        body: ''
    })
    const existingPost = useSelector((state) => state.data.posts)
    const [posts, setPosts] = useState(existingPost)
    const [edit, setEditPosts] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
        if (isEdit) {
            setEditPosts({ ...edit, [name]: value })
        }

    }
    const addData =async (e) => {
        e.preventDefault()
        if (isEdit) {
            await updatePosts(edit.id,edit)
            dispatch(updatePost(edit))
            setIsEdit(false)
            setEditPosts('')
            setData({ title: '', body: "" })
            setPosts((prev) => {
                return prev.map((item) => {
                    return item.id === edit.id ? edit : item
                })
            })
            toast.success('Item Edited Successfully', {autoClose:300, position: 'top-center' })
        } else {
            const id=posts.length + 1;
            await createPosts({id:id,...data})
            dispatch(addPost({id:id,...data}))
            setData({ title: '', body: "" })
            setPosts((prev) => [...prev,{id:id,... data}])
            toast.success('New Item Added Successfully', {autoClose:300, position: 'top-center' })
        }

    }
    const deletepost = async (id) => {
        await deletePosts(id)
        dispatch(deletePost(id))
        setPosts(posts.filter((item) => item.id !== id))
        toast.success('Deleted Item Successfully', {autoClose:300, position: 'top-center' })
    }
    const editpost = (item) => {
        setIsEdit(true)
        setEditPosts(item)
    }

    return (
        <div className='d-flex'>
            <div className='w-100'>
            <Sidebar />
            </div>
            
            <div style={{ overflow: 'scroll', maxHeight: '100vh' }}>

                <div>
                    <div className='d-flex justify-content-between py-4 px-5'>
                    <h2>Dashboard</h2>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Add New
                    </button>
                    </div>
                    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel"> {isEdit ? "Edit Item" : 'Add New'}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <form >
                                        
                                        <div className="mb-3">
                                            <label className="form-label">Title</label>
                                            <input type="text" className="form-control" name="title" value={!isEdit ? data.title : edit.title} onChange={(e) => handleChange(e)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea type="text" className="form-control" name="body" value={!isEdit ? data.body : edit.body} onChange={(e) => handleChange(e)} ></textarea>
                                        </div>
                    
                                            
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => addData(e)}>{isEdit ? "Edit" : 'Add'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <form className='form-control m-5' style={{ width: '250px' }}>
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
            </form> */}
                <div className='d-flex flex-wrap m-3'>{posts?.map((item, index) => {
                    return <div key={index}>
                        <div className="card m-2" style={{ width: '250px', height: '250px' }}>

                            <div className="card-body">
                                <h5 className="card-title">{item.id}.{item.title.slice(0, 20)}</h5>
                                <p className="card-text ">{item.body.slice(0, 100)}</p>
                                
                                {/* <a href="#" className="btn btn-primary m-2" onClick={() => editpost(item)}>Edit</a> */}
                                {/* <a href="#" className="btn btn-danger m-2" onClick={()=>deletepost(item.id)}>Delete</a> */}
                                
                                <button type="button" className="btn btn-outline-secondary mx-4" data-bs-toggle="modal" data-bs-target='#exampleModal' onClick={() => editpost(item)}>
                                    Edit
                                </button>
                                <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal2-${item.id}`}>
                                    Delete
                                </button>


                                <div className="modal fade" id={`exampleModal2-${item.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Do you want to delete? <br/> {item.title}</h1>
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
        </div>
    )
}

export default Home