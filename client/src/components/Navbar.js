import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  
  const logout = () => {
    localStorage.removeItem("token")
    setUser({})
  };

  return (
   <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <Link to="/repairs" className="navbar-brand mb-0 h1">
      <img className="d-inline-block align-top" src="/buildinglogo.png" width="75"/>      
    </Link>
    <button type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" className="navbar-toggler" aria-controls="navbarNav" aria-expanded="false" aria-lable="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
     <ul className="user-auth navbar-nav">
      {user ? 
        <>
          <li style={{ color: "black" }} className="nav-item active">Welcome {user}!</li>
          {/* <li className="posts-nav">
            <Link to="/posts">Posts</Link>
          </li> */}
          <li className="posts-nav nav-item active">
            <Link to="/repairs" className="nav-link active">Repairs</Link>
          </li>
          <li onClick={logout} className="nav-item active">
            <Link to="/login" className="nav-link active">Logout</Link>
          </li>
        </>
       : 
        <>
          {/* <li className="posts-nav">
            <Link to="/posts">Posts</Link>
          </li> */}
          <li className="posts-nav nav-item active">
            <Link to="/repairs" className="nav-link active">Repairs</Link>
          </li>
          <li className="nav-item active">
            <Link to="/login" className="nav-link active">Login</Link>
          </li>
          <li className="nav-item active"> 
            <Link to="/register" className="nav-link active">Register</Link>
          </li>
        </>
      }
    </ul>
    </div>
    </nav>
  );
}

export default Navbar;
