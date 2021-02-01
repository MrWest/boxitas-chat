import { Button, Grid } from "@material-ui/core";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import styled from "styled-components";
import logo from '../logo.svg';
import CenteredFrame from "./globals/CenterdFrame";
const LoginButton = styled.a`
  color: white;
  font-family: Roboto;
  font-size: 16px;
  padding: 6px 32px;
  border: 2px solid white;
  border-radius: 12px;
  background: #3577d4;
  &:hover {
    background: transparent;
    color: #3577d4;
    font-weight: bold;
    cursor: pointer;
    border: 2px solid #3577d4;
  }
`
const ImgLogo = styled.img`
    max-height: 100%;
    width: 100%;
    object-fit: contain;
`;
const LogoFrame = styled.div`
    height: 72px;
    width: 92px
`;

const Header = () => {
    const responseFacebook = response => {
        console.log(response);
      };

    return (
    <CenteredFrame>
        <Grid container alignItems="center" style={{ height: '100%' }}>
            <Grid item >
                <a href="/">
                    <LogoFrame>
                        <ImgLogo src={logo} alt="logo" />
                    </LogoFrame>
                </a>
            </Grid>
            <Grid item xs />
            <Grid item>
            <FacebookLogin
                appId="269776263974713"
                fields="first_name, last_name ,email,picture"
                callback={responseFacebook}
                render={renderProps => (
                    <Button variant="outlined" color="primary" onClick={renderProps.onClick} >
                        Login
                    </Button>
                )}
                />
                
            </Grid>
        </Grid>
    </CenteredFrame>
    );
};

export default Header;