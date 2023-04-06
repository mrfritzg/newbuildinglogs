import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo, userLogin } from '../../services/userService';

let emptyForm = { 
    username: '',
    password: '',
    email: ''
}

function Login({ setUser }) {

    const navigate = useNavigate()

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = await userLogin(form)

        if (!token) {
            setForm(emptyForm)
            return
        }

        localStorage.setItem("token", token)

        const user = await userInfo()
        setUser(user)

        navigate('/repairs')
    }

    return ( 
        <>
        {/* <div className='user-auth'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br />
                <input 
                    type="text" 
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <br />
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                />
                <br /><br />
                <button>Submit</button>
            </form>
        </div> */}
        <div class="container">
          
        <img className="d-inline-block align-top" src="/buildinglogo.png" alt="logo "width="40%"/>
          <h1>Welcome to MrFritz Luxury Apartments Repair Request</h1>
          <h2>We promise to repair to your issue within <span style={{color:"blue"}}>72 hours</span> or <span style={{color:"red"}}>we pay you 10%</span> of your rent each day until the issue is fixed!</h2>
  <br/>
  <h2>Login</h2>
  <form class="form-horizontal" onSubmit={handleSubmit}>
    <div class="form-group">
      <label class="control-label col-sm-2" htmlFor="username">Username:</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="username" placeholder="Enter username" name="username" onChange={handleChange}
                    value={form.username} />
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" htmlFor="password">Password:</label>
      <div class="col-sm-10">          
        <input type="password" class="form-control" id="password" placeholder="Enter password" name="password" onChange={handleChange}
                    value={form.password} />
      </div>
    </div>
    <div class="form-group">        
      <div class="col-sm-offset-2 col-sm-10">
        <div class="checkbox">
          <label><input type="checkbox" name="remember" /> Remember me</label>
        </div>
      </div>
    </div>
    <div class="form-group">        
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-dark">Submit</button>
      </div>
    </div>
  </form>
</div>
</>
     );
}

export default Login;