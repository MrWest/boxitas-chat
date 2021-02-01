import styled from "styled-components";
import CenteredFrame from "./globals/CenterdFrame";

const Title = styled.h1`
 margin: 92px 16px;
 text-align: center;
`;
const Home = () => (
    <CenteredFrame>
        <Title>You're Home</Title>
        {process.env.REACT_APP_BOXITAS_API}
    </CenteredFrame>
);

export default Home;