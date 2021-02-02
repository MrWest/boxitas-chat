import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component, myself }) => {

    
        const Component = component;
        const isAuthenticated = !!myself;
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
 
}
const mapStateTopProps = ({contacts}) =>  ({
    myself: contacts.find(c => c.current)
   });
export default connect(mapStateTopProps)(ProtectedRoute);