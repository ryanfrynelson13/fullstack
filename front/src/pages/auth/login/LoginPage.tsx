import { Link } from "react-router-dom"
import Login from "../../../components/login/Login"
import classes from './login-page.module.css'

const LoginPage = () => {

  

  return (
    <main className={classes["login-page"]}>
      <h1>Login to Account</h1>
      <div className={classes["login-form"]}>
        <Login />
      </div>
      <div>
        <p>Don't have an account <Link to={'/signup'}>signup here</Link> </p>
      </div>
    </main>
  )
}

export default LoginPage