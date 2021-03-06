import styled from "styled-components";
import { respondTo } from "../../helpers/respondTo";


const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Wrapper = styled.div`
  width: 1200px;
  ${respondTo.lg`
    width: 100%;
  `}
  ${respondTo.xs`
    padding: 0px 5px;
  `}
`;
// This component is used to proper and common frame all the app views and/or sections
const CenteredFrame = ({ children }) => (
    <Container>
        <Wrapper>
            {children}
        </Wrapper>
    </Container>
)

export default CenteredFrame;