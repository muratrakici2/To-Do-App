import React,{useState} from 'react'

const Login = () => {
    const [name, setname] = useState("");
    const [surname, setsurname] = useState("");
    const changeValue=(e)=>{
        if (e.target.id==="name") {
            setname(e.target.value)
        }else{
            setsurname(e.target.value)
        }
    }
    const savelocalStorage =()=>{
        if (name!=="" && surname!=="") {
            const user ={name,surname};
        localStorage.setItem("user",JSON.stringify(user));
        window.location.reload();
        }else{
            alert("Please enter your name and surname")
        }
        
    }
    return (
        <div className="login">
            <h1>My TO-DO</h1>
            <input className="log-input" placeholder="Name" onChange={changeValue} id="name"/>
            <input className="log-input" placeholder="Surname" onChange={changeValue} id="surname"/>
            <button className="log-button" onClick={savelocalStorage}>Log in</button>
        </div>
    )
}

export default Login
