import { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { createCommentForRepair, deleteCommentFromRepair } from "../../services/commentService"
import { deleteRepair, getRepair } from "../../services/repairServices"

function Show({ user }) {

    const [repair, setRepair] = useState({})

    const navigate = useNavigate()
    const params = useParams()
   
    const bodyRef = useRef()
    const detailsRef = useRef()
     

    useEffect(() => {
        async function loadData() {
            const data = await getRepair(params.id)
            if (!data) navigate('/repairs')
            setRepair(data)
        }
        loadData()
    }, [params.id])

    async function handleDeleteComment(comment) {
        await deleteCommentFromRepair(comment._id, repair._id)
        let updatedrepair = { ...repair }
        updatedrepair.comments = updatedrepair.comments.filter(c => c._id !== comment._id)
        setRepair(updatedrepair)
    }

    async function handleDeleterepair() {
        // console.log('handleDeleteRepair ' + repair._id)
        await deleteRepair(repair._id)
        navigate('/repairs')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let comment = {
            body: bodyRef.current.value,
            user
        }

        const newComment = await createCommentForRepair(comment, repair._id)
        console.log('new comment for repair: ')
        console.log(newComment)
        let updatedrepair = { ...repair }
        updatedrepair.comments.push(newComment)
        console.log('updated repair after new comment push: ')
        console.log(updatedrepair)
        setRepair(updatedrepair)
        bodyRef.current.value = ''
        detailsRef.current.open = false
    }
console.log(repair)
    return (
            <div>
                <div className="a-repair">
                <h5 style={{ opacity: '.3'}}>Added by {repair.user} on {new Date(repair.createdAt).toLocaleDateString()} at {new Date(repair.createdAt).toLocaleTimeString()}</h5>
                <h2>Repair Ticket Details</h2>
                    <h3>{repair.subject}</h3>
                    <div className='p-body'>
                        <p><strong>DESCRIPTION: </strong>{repair.description}</p>
                        <p><strong>TYPE: </strong>{repair.type}</p>
                        <p><strong>TICKET STATUS: </strong>{ repair.fixed ===false?<span style={{color: 'red'}}>UNRESOLVED</span>:'FIXED'}</p>
                        <p><strong>Image: </strong></p>
                        <p><img src={repair.image} alt={repair.image} width="500"/></p>
                        </div><br /><br />

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