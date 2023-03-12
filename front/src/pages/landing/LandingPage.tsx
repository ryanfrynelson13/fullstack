import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const LandingPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<{id: string, email: string} | null>(null)

  useEffect(() => {
    let tokenObj = localStorage.getItem('tokenObj')
    if(!tokenObj){
      navigate('/login')
    } else {
      const {token} = JSON.parse(tokenObj)
      axios.get('http://localhost:3000/users/profil', {
         headers:{
          'Authorization': `Bearer ${token}`
         }
      })
        .then(res => {
          setUser({id: res.data.id, email: res.data.email})
        })
        .catch(err => console.log(err))
    
    }
    
    
  },[])
   

  return (
    <div>email: {user?.email}</div>
  )
}

export default LandingPage