import { Link } from "react-router-dom"
import Signup from "../../../components/signup/Signup"
import classes from './signup-page.module.css'

const SignupPage = () => {
  return (
    <main className={classes["signup-page"]}>
    <h1>Create an Account</h1>
    <div className={classes["signup-form"]}>
      <Signup />
    </div>
    <div>
      <p>Already have an account <Link to={'login'}>login here</Link> </p>
    </div>
  </main>
  )
}

export default SignupPage