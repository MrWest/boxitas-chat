import { Button } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CenteredFrame from "./globals/CenterdFrame";

const Title = styled.h1`
 margin: 92px 16px;
 text-align: center;
`;
const ButtonContainer = styled.div`
    padding: 56px;
`;

const Home = () => {
    const location = useLocation();
    return (
    <CenteredFrame>
        <Title>You're Home</Title>
        <ButtonContainer>
             <Button size="large" variant="contained" onClick={() => location.push('/chat')}>Let's Chat!!!</Button>
        </ButtonContainer>
    </CenteredFrame>
    );
};

export default Home;