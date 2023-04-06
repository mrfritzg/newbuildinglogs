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
//this function helps automatically choose the image for the issue based on the selected issue type
    function selectRepairImg(repairType) {
        let tmp
        if(repairType === 'plumbing') {
            tmp = "/images/plumbing.png";
        } else if (repairType === "electrical") {
            tmp = "/images/electrical.png";
        } else if (repairType === "roof") {
            tmp = "/images/roof.png";
        } else if (repairType === "interior") {
            tmp = "/images/interior.png";
        } else if (repairType === "exterior") {
            tmp = "/images/exterior.png";
        }  else if (repairType === "pests") {
            tmp = "/images/pests.png";
        } else if (repairType === "garbage") {
            tmp = "/images/garbage.png";
        } else if (repairType === "wear-tear") {
            tmp = "/images/weartear.png";
        } else if (repairType === "painting") {
            tmp = "/images/painting.png";
        } else if (repairType === "leak") {
            tmp = "/images/leak.png";
        } else {
            tmp ="/images/other.png";
        }
        return tmp
    }
    // selectRepairImg("test");

    // console.log(repairs)
    return (
            <div>
                <h2>Repair Dashboard</h2>
                
                {/* <div id="repairs">

                        {repairs?.map((repairItem, index) => 
                            <Link to={`/repairs/${repairItem._id}`} key={index}>
                                <div className="a-post">
                                    {repairItem.subject}
                                </div>
                            </Link>
                        )}
            
                    
    
                </div> */}
                <div id="repairs" className="container" >
                        <div className="row g-3">
                {repairs?.map((repairItem, index) => 
                            <div className="col-12 col-md-6 col-lg-2 repairItem" key={index}>
                                <div className="card">
                                    <img src={selectRepairImg(repairItem.type)} alt="icon of repair" className="card-img-top repair-img"  />
                                    <div className="card-body">
                                    <Link to={`/repairs/${repairItem._id}`}>
                                        <h5 className="card-title"><strong>{repairItem.subject}</strong></h5>
                                        </Link>
                                        <p className="card-text">
                                        <strong>REPAIR TYPE: </strong>{ repairItem.type}
                                        </p>
                                        <p className="card-footer">
                                        <strong>REPAIR STATUS: </strong>{ repairItem.fixed ===false?<span style={{color: 'red'}}>UNRESOLVED</span>:'FIXED'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                             )}

                        </div>
                    </div>
                    {user && 
                        <Link to="/repairs/new">
                            <button>NEW POST</button>
                        </Link>
                    }
           
            </div>
    )
}

export default Index