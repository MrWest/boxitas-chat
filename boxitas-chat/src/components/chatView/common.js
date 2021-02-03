import styled from "styled-components";
import { respondTo } from "../../helpers/respondTo";

export const ContactSmallFrame = styled.div`
height: 28px;
width: 28px;
border-radius: 14px;
overflow: hidden;
position: relative;
${respondTo.sm`
height: 20px;
width: 20px;
border-radius: 10px;
`}
`;


 