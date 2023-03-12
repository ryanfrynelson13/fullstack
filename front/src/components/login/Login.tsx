import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()

    if(email.trim() === '' || password.trim() === '') return

    const {data} = await axios.post('http://localhost:3000/users/login', {
      email,
      password
    })
    
    if(data.validated){
      localStorage.setItem('tokenObj', JSON.stringify(data.payload))      
      navigate('/')       
    }
  } 
  return (
    <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
        </div>
        <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
        </div>
        <button type="submit">Login</button>
    </form>
  )
}

export default Login