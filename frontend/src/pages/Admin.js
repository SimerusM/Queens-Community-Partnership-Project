import "../styles/Home.css";
import "../styles/Admin.css";
import { useEffect, useState } from 'react'
import { useProjectsContext } from "../hooks/useProjectsContext";

// Components
import AdminFilter from "../components/AdminComponents/AdminFilter";
import AdminTitle from "../components/AdminComponents/AdminTitle";

export default function Admin(){
    // const {projects, dispatch} = useProjectsContext()

    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [projects, setProjects] = useState(null)


    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('/api/projects') // Change localhost to server name when deploying
            const json = await response.json() // contains array of projects

            if (response.ok) {
                setProjects(json)
            }
        } 

        fetchProjects()
    }, [])

  

  // User Login info
  const database = [
    {
      username: "QueensCPP",
      password: "QueensELCPP"
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    // JSX code for login form
    const renderForm = (
        <div className="login-background">
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Admin Login</h1>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="uname" required />
                        {renderErrorMessage("uname")}
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required />
                        {renderErrorMessage("pass")}
                    </div>
                    <div className="button-container">
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    );

    // JSX code for admin page
    const adminPage = (
        <>
            <div >
                <AdminTitle />
            </div>
            <div>
                <AdminFilter />
            </div>
        </>
    );

    return (
        <div>
            {isSubmitted ? adminPage : renderForm}
        </div>
    )
}


