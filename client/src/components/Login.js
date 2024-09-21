import axios from "axios"
import React, { Fragment, useState} from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email:"",
        password:""
    })

    const {email,password} = inputs

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {email, password}
            const response = await axios.post("http://localhost:5000/auth/login", body);
            
            if (response.data.token){
                localStorage.setItem("token", response.data.token)
                setAuth(true)
                toast.success("login successfully!")
            } else {
                setAuth(false)
                toast.error(response.data)
            }
            
        } catch (err) {
            console.error(err.message)
            toast.error("An error occurred during login. Please try again.")
        }
    }
    return(
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-control my-3"   
                    value = {email}
                    onChange={(e) => onChange(e)} 
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-control my-3" 
                    value = {password}
                    onChange={(e) => onChange(e)}   
                />
                <button
                    className="btn btn-success btn-block"
                >
                    Log in
                </button>
            </form>
            <Link to="/register">Register</Link>
        </Fragment>
    )
}
export default Login