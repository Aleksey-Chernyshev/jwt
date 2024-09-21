import React, { Fragment, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email:"",
        password:"",
        name:""
    })

    const {email, password, name} = inputs

    const onChange = (e) =>{
        setInputs({...inputs, [e.target.name] : e.target.value })
    }
 
    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {name, email, password}
            const response = await axios.post("http://localhost:5000/auth/register", body);
            console.log(response.data);

            localStorage.setItem('token', response.data.token)
            setAuth(true)
        } catch (err) {
            console.error(err.message)
        }
    }

    return(
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-control my-3"
                    value={email}
                    onChange={e => onChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-control my-3"
                    value={password}
                    onChange={e => onChange(e)}
                />
                <input
                    type="text" 
                    name="name" 
                    placeholder="name"
                    className="form-control my-3"
                    value={name}
                    onChange={e => onChange(e)}
                />
                <button
                    className="btn btn-success btm-block">Submit

                </button>

            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    )
}
export default Register