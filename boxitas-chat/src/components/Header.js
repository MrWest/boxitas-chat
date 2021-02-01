import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import styled from "styled-components";
import jsonServer from "../apis/jsonServer";
import logo from '../logo.svg';
import CenteredFrame from "./globals/CenterdFrame";

// const LoginButton = styled.a`
//   color: white;
//   font-family: Roboto;
//   font-size: 16px;
//   padding: 6px 32px;
//   border: 2px solid white;
//   border-radius: 12px;
//   background: #3577d4;
//   &:hover {
//     background: transparent;
//     color: #3577d4;
//     font-weight: bold;
//     cursor: pointer;
//     border: 2px solid #3577d4;
//   }
// `
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
    let history = useHistory();
    const responseFacebook = async response => {
      console.log(response);
      if(response.accessToken)
      {
        const { post } = jsonServer();
        const payload = { id: response.id, name: response.name, avatar: response?.picture.url };
        await post('users', payload);
        history.push('/chat');
      }
        
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
                appId="831923634071922"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook} />
                
            </Grid>
        </Grid>
    </CenteredFrame>
    );
};

export default Header;