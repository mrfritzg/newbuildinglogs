import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createRepairItem } from "../../services/repairServices"

function New({ user }) {

    const repairTypes = ['plumbing', 'electrical', 'roof','interior','exterior', 'misc', 'pests', 'garbage','wear-tear', 'painting','other...','leak']

    let subjectRef = useRef()
    let descripRef = useRef()
    let typeRef = useRef()
    // let userRef = useRef()
    let imgRef = useRef()
    let navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        let repairItem = {
            subject: subjectRef.current.value,
            description: descripRef.current.value,
            user,
            type: typeRef.current.value,
            //user: userRef.current.value,
            image: imgRef.current.value,
        }
        console.log(repairItem);
        await createRepairItem(repairItem)
        navigate('/repairs')
    }

    return (
        <div>
            <h1>Add New Repair Issue</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="subject">Subject: </label><br />
                <input type="text" id="subj" name="subject" ref={subjectRef} required /><br /><br />

                <label htmlFor="type">Type: </label>
                {/* <input type="text" id="typ" name="type" ref={typeRef} required /><br /><br /> */}
                <select name="type" id="type" required ref={typeRef}> 
                        {repairTypes.map((issue, index) => {
                           return <option value={issue} key={index}>{issue}</option>
                        }
                        )}
                    </select>

                {/* <label htmlFor="user">User: </label><br />
                <input type="text" id="usr" name="user" ref={userRef} required /><br /><br /> */}
                <label htmlFor="description">Description: </label><br />
                <textarea id="descr" name="description" ref={descripRef} required rows="8" cols="50" /><br /><br />
                
                <label htmlFor="image">Image: </label><br />
                <input type="text" id="img" name="image" ref={imgRef} required /><br /><br />
                <button>SUMBIT</button>
            </form>
        </div>
    );
}

export default New;