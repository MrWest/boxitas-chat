import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import styled from "styled-components";
import logo from '../boxitas.png';
import CenteredFrame from "./globals/CenterdFrame";
import { connect } from "react-redux";
import { contactLogin, contactLogout, getContacts } from "../actions/contactActions";
import { ImgStandard } from "./globals";
import { StylessButton } from "./globals/buttons";

const LoggedContact = styled.p`
    font-size: 18px;
    margin: 0px;
`;
const LogoFrame = styled.div`
    height: 56px;
    width: 56px
`;
const ContactFrame = styled.div`
    height: 38px;
    width: 38px;
    border-radius: 19px;
    overflow: hidden;
`;
const AvatarFrame = styled.div`
    position: relative;
`;
const LogoutButton = styled.button`
    height: 15px;
    width: 15px;
    font-size: 12px;
    border-radius: 8px;
    position: absolute;
    background: #ef5366;
    color: white;
    border: none;
    top: -10px;
    right: -10px;
    padding: 0px 0px 1px 1px;
    cursor: pointer;
    outline: none;
    &:hover {
        background: #d14; 
    }
`;


const Header = ({ currentUser, doContactLogin, doGetContacts, doContactLogout}) => {
    let history = useHistory();

    // Handle facebook callback response to use it to log in and create (if neccessary) out chat contacts 
    const responseFacebook = async response => {
      console.log(response);
      if(response.accessToken)
      {
        const payload = { id: response.id, name: response.name, avatar: response?.picture?.data?.url };
        const rslt = await doContactLogin(payload);
        await doGetContacts();
        if(rslt.result === 'ok')
          history.push('/chat');
      }
        
      };

    return (
    <CenteredFrame>
        <Grid container alignItems="center" style={{ height: '100%', marginBottom: 32 }}>
            <Grid item >
                <StylessButton onClick={() =>  history.push('/')}>
                    <LogoFrame>
                        <ImgStandard src={logo} alt="logo" />
                    </LogoFrame>
                </StylessButton>
            </Grid>
            <Grid item xs />
            <Grid item>
                {currentUser.id ? (
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <LoggedContact>{currentUser.name}</LoggedContact>
                        </Grid>
                        <Grid item>
                            <AvatarFrame>
                                <ContactFrame>
                                    <ImgStandard src={currentUser.avatar} alt="logo" />
                                </ContactFrame>
                                <LogoutButton onClick={()=> doContactLogout(currentUser)} title="Logout" >x</LogoutButton>
                            </AvatarFrame>
                        </Grid>
                    </Grid>
                ) :
            (<FacebookLogin
                appId="831923634071922"
                size="medium"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} />)
            }
            </Grid>
        </Grid>
    </CenteredFrame>
    );
};
const mapStateTopProps = ({currentUser}) =>  ({
    currentUser
});

export default connect(mapStateTopProps, { doContactLogin: contactLogin, 
    doGetContacts: getContacts, doContactLogout: contactLogout })(Header);