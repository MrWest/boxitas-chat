import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import styled from "styled-components";
import logo from '../logo.svg';
import CenteredFrame from "./globals/CenterdFrame";
import { connect } from "react-redux";
import { contactLogin } from "../actions/contactActions";
import { ImgStandard } from "./globals";

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

const LoggedContact = styled.p`
    font-size: 18px;
    margin: 0px;
`;
const LogoFrame = styled.div`
    height: 72px;
    width: 92px
`;
const ContactFrame = styled.div`
    height: 38px;
    width: 38px;
    border-radius: 19px;
    overflow: hidden;
`;

const Header = ({ myself, doContactLogin}) => {
    let history = useHistory();
    const responseFacebook = async response => {
      console.log(response);
      if(response.accessToken)
      {
        const payload = { id: response.id, name: response.name, avatar: response?.picture?.data?.url };
        const rslt = await doContactLogin(payload);
        if(rslt.result === 'ok')
          history.push('/chat');
      }
        
      };

    return (
    <CenteredFrame>
        <Grid container alignItems="center" style={{ height: '100%' }}>
            <Grid item >
                <a href="/">
                    <LogoFrame>
                        <ImgStandard src={logo} alt="logo" />
                    </LogoFrame>
                </a>
            </Grid>
            <Grid item xs />
            <Grid item>
                {myself.id ? (
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <LoggedContact>{myself.name}</LoggedContact>
                        </Grid>
                        <Grid item>
                            <ContactFrame>
                                <ImgStandard src={myself.avatar} alt="logo" />
                            </ContactFrame>
                        </Grid>
                    </Grid>
                ) :
            (<FacebookLogin
                appId="831923634071922"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook} />)
            }
            </Grid>
        </Grid>
    </CenteredFrame>
    );
};
const mapStateTopProps = ({contacts}) =>  ({
    myself: contacts.find(c => c.current) || {}
});

export default connect(mapStateTopProps, { doContactLogin: contactLogin })(Header);