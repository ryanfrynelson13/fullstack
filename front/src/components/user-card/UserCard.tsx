import UserType from "../../types/user.type"

type UserCardProps = UserType

const UserCard = ({firstname, lastname, _id}: UserCardProps) => {
  return (
    <div style={
        {
            border: '1px solid black'
        }
    }>
        <p>{firstname}</p>
        <p>{lastname}</p>
    </div>
  )
}

export default UserCard