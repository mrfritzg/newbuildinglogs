import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  
  const logout = () => {
    localStorage.removeItem("token")
    setUser({})
  };

  return (
   <nav className="navbar navbar-light bg-light">
    <a href="#" className="navbar-brand mb-0 h1">
      <img className="d-inline-block align-top" src="/buildinglogo.png" width="30" height="30"/>      
    </a>
    <div className="collapse navbar-collapse" id="navbarNav">
     <ul className="user-auth navbar-nav">
      {user ? 
        <>
          <li style={{ color: "black" }} className="nav-item active">Welcome {user}!</li>
          {/* <li className="posts-nav">
            <Link to="/posts">Posts</Link>
          </li> */}
          <li className="posts-nav nav-item active">
            <Link to="/repairs">Repairs</Link>
          </li>
          <li onClick={logout} className="nav-item active">
            <Link to="/login">Logout</Link>
          </li>
        </>
       : 
        <>
          {/* <li className="posts-nav">
            <Link to="/posts">Posts</Link>
          </li> */}
          <li className="posts-nav nav-item active">
            <Link to="/repairs">Repairs</Link>
          </li>
          <li className="nav-item active">
            <Link to="/login" >Login</Link>
          </li>
          <li className="nav-item active"> 
            <Link to="/register">Register</Link>
          </li>
        </>
      }
    </ul>
    </div>
    </nav>
  );
}

export default Navbar;
