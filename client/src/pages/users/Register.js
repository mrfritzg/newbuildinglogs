import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo, userRegister } from "../../services/userService";

let emptyForm = { 
    username: '',
    password: '',
    email: ''
}

function Register({ setUser }) {

    const navigate = useNavigate()

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = await userRegister(form)

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
        {/* <div className="user-auth">
            <h1>Register</h1>
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
                <label htmlFor="email">Email:</label>
                <br />
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
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
  <h2>Register</h2>
  <form class="form-horizontal" onSubmit={handleSubmit}>
    <div class="form-group">
      <label class="control-label col-sm-2" htmlFor="username">Username:</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="username" placeholder="Enter username" name="username" onChange={handleChange}
                    value={form.username} />
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" htmlFor="email">Email:</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="email" placeholder="Enter Email" name="email" onChange={handleChange}
                    value={form.email} />
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
        <button type="submit" class="btn btn-dark">Submit</button>
      </div>
    </div>  
  </form>
  </div>
        </>
     );
}

export default Register;