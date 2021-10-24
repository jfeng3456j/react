import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'


// const Users = (props) => {
const Users = ({ users, loading }) => {
        // const { users } = props.users;
    
    if (loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                {/* callback function users.map */}
                {users.map((user) => 
                    //pass user as in props
                    <UserItem key={user.id} user ={user}/>
                )}
            </div>
        )
    }
        
}

const userStyle = {
    display: 'grid',
    //(3,1fr) 3 one fraction even column
    gridTemplateColumns: 'repeat(3,1fr)', 
    gridGap: '1rem'
}


Users.protoTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default Users;