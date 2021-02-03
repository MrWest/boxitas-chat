import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component, currentUser }) => {

    
        const Component = component;
        const isAuthenticated = !!currentUser.id;
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
 
}
const mapStateTopProps = ({currentUser}) =>  ({
    currentUser
   });
export default connect(mapStateTopProps)(ProtectedRoute);