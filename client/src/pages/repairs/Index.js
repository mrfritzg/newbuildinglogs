import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllRepairs } from "../../services/repairServices"

function Index({ user }) {

    const [repairs, setRepairs] = useState([])

    useEffect(() => {
        async function loadData() {
            const data = await getAllRepairs()
            setRepairs(data)
        }
        loadData()
    }, [])
    console.log(repairs)
    return (
            <div>
                <h1>Index View</h1>
                <div id="repairs">

                        {repairs?.map((repairItem, index) => 
                            <Link to={`/repairs/${repairItem._id}`} key={index}>
                                <div className="a-post">
                                    {repairItem.subject}
                                </div>
                            </Link>
                        )}
            
                    {user && 
                        <Link to="/repairs/new">
                            <button>NEW POST</button>
                        </Link>
                    }
    
                </div>
            </div>
    )
}

export default Index