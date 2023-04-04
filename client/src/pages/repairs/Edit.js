import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getRepair, updateRepair } from '../../services/repairServices'

function Edit() {

    const [repair, setRepair] = useState({})

    const navigate = useNavigate()
    const params = useParams()

    const subjectRef = useRef()
    const descripRef = useRef()
    const typeRef = useRef()
    const imgRef = useRef()

    useEffect(() => {
        getRepair(params.id).then(data => setRepair(data))
    }, [params.id])

    async function handleSubmit(e) {
        e.preventDefault()
        let updatedrepair = {
            subject: subjectRef.current.value,
            description: descripRef.current.value,
            type: typeRef.current.value,
            image: imgRef.current.value,
        }
        await updateRepair(repair._id, updatedrepair)
        navigate(`/repairs/${repair._id}`)
    }

    return ( 
        <div>
            <h1>Edit repair</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nme">Subject:</label><br />
                    <input type="text" id="nme" ref={subjectRef} defaultValue={repair.subject} /><br /><br />

                    <label htmlFor="type">Type: </label><br />
                    <input type="text" id="typ" name="type" ref={typeRef} required defaultValue={repair.type}/><br /><br />

                    <label htmlFor="description">Description:</label><br />
                    <textarea ref={descripRef} id="description" cols="30" rows="10" defaultValue={repair.description} /><br /><br />

                    <label htmlFor="image">Image: </label><br />
                     <input type="text" id="img" name="image" ref={imgRef} required defaultValue={repair.image}/><br /><br />

                    <button>Submit</button>
                </form>
                <Link to={`/repairs/${repair._id}`}>
                    <button>Back</button>
                </Link>
                
            </div>
        </div>
    );
}

export default Edit;