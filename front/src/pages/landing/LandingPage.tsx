import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import UserType from "../../types/user.type"
import UserCard from "../../components/user-card/UserCard"

const LandingPage = () => {
  const navigate = useNavigate()
  const [currUser, setCurrUser] = useState<{id: string, email: string} | null>(null)
  const [allUsers, setAllUsers] = useState<UserType[]>([])

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
          setCurrUser({id: res.data.id, email: res.data.email})
        })
        .catch(err => console.log(err))
    
    }

    axios.get<UserType[]>('http://localhost:3000/users')
      .then(({data}) => {
        setAllUsers(data)
      })
      .catch(err => console.log(err))
    
    
  },[])
   
  
  return (
    <div>
      <p>email: {currUser?.email}</p>
      <div>
        <h2>Users:</h2>
        {
          allUsers.length > 0  && allUsers.map((user: UserType) => (
            <UserCard key={user._id} {...user} />
          ))
        }
      </div>
    </div>
  )
}

export default LandingPage