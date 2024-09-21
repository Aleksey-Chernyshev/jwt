import axios from "axios"
import React, { Fragment, useState, useEffect } from "react"

const Dashboard = ({setAuth}) =>{
    const [name, setName] = useState("")

    async function getName() {
        try {
            const response = await axios.get("http://localhost:5000/dashboard/",{headers:{token: localStorage.token}})
            setName(response.data.user_name)
        } catch (err) {
            console.error(err.message)
        }
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }

    useEffect(() => {
        getName()
    },[])
    return(
        <Fragment>
            <h1>Dashboard {name}</h1>
            <button
                className="btn btn-primary"
                onClick={e => logout(e)}
            >Log out</button>

        </Fragment>
    )
}
export default Dashboard