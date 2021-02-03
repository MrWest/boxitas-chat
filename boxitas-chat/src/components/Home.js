import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CenteredFrame from "./globals/CenterdFrame";

const Title = styled.h1`
 margin: 92px 16px;
 text-align: center;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Home = ({ currentUser }) => {
    const history = useHistory();
    return (
    <CenteredFrame>
        <Title>You're Home</Title>
        {/* This button is intended to redirect users 
        back to chat view. It only appears when the user is online */}
        {currentUser.id && <ButtonContainer>
                        <Button size="large" variant="contained" color="primary" onClick={() => history.push('/chat')}>Let's Chat!!!</Button>
                    </ButtonContainer>}
    </CenteredFrame>
    );
};
const mapStateTopProps = ({ currentUser}) =>  ({
    currentUser
   });


export default connect(mapStateTopProps)(Home);