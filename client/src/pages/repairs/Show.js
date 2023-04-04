import { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
// import { createCommentForrepair, deleteCommentFromrepair } from "../../services/commentService"
import { deleterepair, getrepair } from "../../services/repairService"

function Show({ user }) {

    const [repair, setRepair] = useState({})

    const navigate = useNavigate()
    const params = useParams()
   
    const bodyRef = useRef()
    const detailsRef = useRef()
     

    useEffect(() => {
        async function loadData() {
            const data = await getrepair(params.id)
            if (!data) navigate('/repairs')
            setRepair(data)
        }
        loadData()
    }, [params.id])

    async function handleDeleteComment(comment) {
        await deleteCommentFromrepair(comment._id, repair._id)
        let updatedrepair = { ...repair }
        updatedrepair.comments = updatedrepair.comments.filter(c => c._id !== comment._id)
        setRepair(updatedrepair)
    }

    async function handleDeleterepair() {
        await deleterepair(repair._id)
        navigate('/repairs')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let comment = {
            body: bodyRef.current.value,
            user
        }

        const newComment = await createCommentForrepair(comment, repair._id)
        let updatedrepair = { ...repair }
        updatedrepair.comments.push(newComment)
        setRepair(updatedrepair)
        bodyRef.current.value = ''
        detailsRef.current.open = false
    }

    return (
            <div>
                <div className="a-repair">
                    <h2>{repair.subject}</h2>
                    <h5 style={{ opacity: '.3'}}>repaired by {repair.user} on {new Date(repair.createdAt).toLocaleDateString()} at {new Date(repair.createdAt).toLocaleTimeString()}</h5>
                    <div className='p-body'>{repair.body}</div><br /><br />

                    {
                        repair.comments?.length ?
                        <>
                            <div>Comments:</div>
                            <div>{repair.comments.map((comment, i) => 
                                <div key={i} className="comm">
                                    <div>{comment.user}</div>
                                    <div>{comment.body}</div>
                                    {comment.user === user &&
                                        <>
                                            <button onClick={() => handleDeleteComment(comment)}>X</button>
                                            <Link to={`/repairs/${repair._id}/comments/${comment._id}`}><span>+</span></Link>
                                        </>
                                    }
                                </div>
                            )}</div>
                            <br/><br/>
                        </>
                        : ''
                    }
                    {user && 
                        <details ref={detailsRef}>
                            <summary style={{ opacity: '.5' }}>Leave a comment:</summary>
                            <form onSubmit={handleSubmit}>
                                <textarea ref={bodyRef} id="lc" cols="1" rows="1" />
                                <button>Comment</button>
                            </form>
                        </details>
                    }
                    
                    <div className="buttons">
                        {repair.user === user &&
                            <>
                                <button onClick={handleDeleterepair}>Delete</button>
                                <Link to={`/repairs/${repair._id}/edit`}>
                                    <button>Edit</button>
                                </Link>
                            </>
                        }
                        <Link to='/repairs'>
                            <button>Back</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default Show