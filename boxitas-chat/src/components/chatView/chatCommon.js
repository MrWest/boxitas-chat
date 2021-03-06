import { Button, Grid, TextField } from "@material-ui/core";
import { Check, MessageRounded } from "@material-ui/icons";
import styled, { keyframes } from "styled-components";
import { respondTo } from "../../helpers/respondTo";

const ChatListTitle = styled.p`
    font-size: 18px;
    margin: 0px;
    margin-right: 32px;
    margin-bottom: 20px;
    ${respondTo.sm`
    font-size: 12px;
    `}
`;
const TimeText = styled(ChatListTitle)`
    font-size: 12px;
    margin: 24px 0px 6px 0px;
    color: #828282;
    text-align: center;
`;
const IsTypingText = styled.p`
    font-size: 12px;
    margin: 16px 0px 8px 0px;
    color: #828282;
    text-align: center;
`;
const ChatSendInput = styled(TextField)`
    width: 100%;
    border-radius: 16px;
    padding: 16px 24px;
    border: 1px solid #d4d9e2;
    outline: none;
    position: relative;
`;
const SendButton = styled(Button)`
    height: 92px;
    width: 142px;
    font-size: 32px;
    ${respondTo.sm`
    width: 32px;
    `}
`
const SpacingFrame = styled(Button)`
    width: 142px;
    ${respondTo.sm`
    width: 32px;
    `}
`
const ChatSendInputtContainer = styled.div`
    display: flex;
`;

const MessagesWrapper = styled.div`
    height: 50vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 24px;
    margin-bottom: 32px;
`;
const MessageBulb = styled.div`
    background:  ${props => props.isSent ? '#CCCCCC' : '#2851A3' };
    color: ${props => props.isSent ? '#1C1C1C' : 'white' };
    padding: 10px 24px;
    border-radius: 24px;
    position: relative;
`;

const Message = styled(ChatListTitle)`
    font-size: 16;
    margin: 0px;
`;

const CheckIcon = styled(Check)`
    background: #31a24c;
    color: white;
    position: absolute;
    bottom: 1px;
    right: -5px;
    padding: 3px;
    border-radius: 8px;
    height: 10px !important;
    width: 10px !important;
`;

const ChatBoxShell = styled.div`
        padding-left: 56px;
        ${respondTo.sm`
        padding-left: 16px;
        `}
`;
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const Loader = styled.div`
    border: 12px solid #f3f3f3; /* Light grey */
    border-top: 12px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 32px;
    height: 32px;
    animation: ${spin} 2s linear infinite;
    position: absolute;
    z-index: 999;
    opacity: 0.5;

`;

const LoaderContainer = styled.div`
    width: 32px;
    position: relative;

`;

const LoaderSection = styled(Grid)`
    background: rgba(255,255,255, 0.3);
    padding-right: 56px;
`;

const ChatContactsTitle = styled.p`
    font-size: 18px;
    margin: 0px;
    ${respondTo.sm`
     display: none;
  `}
`;
const ChatSearchInput = styled.input`
    height: 32px;
    width: 100%;
    border-radius: 16px;
    padding: 0px 24px;
    padding-bottom: 2px;
    border: 1px solid #d4d9e2;
    outline: none;
    position: relative;
    ${respondTo.sm`
        height: 24px;
        padding: 0px 8px;
        border-radius: 12px;
        font-size: 12px;
  `}
`;
const SearchInputContainer = styled.div`
    display: flex;
`;
const ContactItemShell = styled.div`
    border-bottom: 1px solid ${props => props.selected ? '#3f51b5' : '#d4d9e2' };
    padding: 8px 0px;
    color: ${props => props.selected ? '#3f51b5' : 'inherit' };
    cursor: pointer;
    &:hover {
        background: transparent;
        color: #3577d4;
        cursor: pointer;
        border-bottom: 1px solid #3577d4;
      }
`;

const ContactName = styled.p`
    font-size: 16;
    margin: 0px;
    ${respondTo.sm`
    font-size: 12px;
 `}
`;
const OnlineDot = styled.div`
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background: ${props => props.isOnline && props.isOnline !== 'false' ? '#31a24c' : '#828282' };
    ${respondTo.sm`
    height: 8px;
    width: 8px;
    border-radius: 4px;
    `}
`;
const NewMessage = styled(MessageRounded)`
    background: #31a24c;
    color: white;
    padding: 3px;
    border-radius: 8px;
    height: 10px !important;
    width: 10px !important;
    position: absolute;
    top: -6px;
    right: -12px;
`

const CustomGrid = styled(Grid)`
    ${respondTo.sm`
    padding: 0px !important;
    `}
`;

const GridOnMobile = styled(Grid)`
    display: none;
    ${respondTo.sm`
    display: block;
    `}
`;

const GridNotMobile = styled(Grid)`
    ${respondTo.sm`
    display: none;
    `}
`;

const ContactsWrapper = styled.div`
    height: 50vh;
    overflow-y: auto;
    overflow-x: hidden;
`;

const ContactSmallFrame = styled.div`
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

export { 
    Loader,
    LoaderSection,
    LoaderContainer,
    spin,
    ChatBoxShell,
    ChatSendInputtContainer,
    ChatSendInput,
    ChatListTitle,
    CheckIcon,
    Message,
    MessageBulb,
    MessagesWrapper,
    SendButton,
    TimeText,
    IsTypingText,
    SpacingFrame,
    ChatContactsTitle,
    ContactsWrapper,
    GridNotMobile,
    GridOnMobile,
    CustomGrid,
    NewMessage,
    OnlineDot,
    ContactName,
    ContactItemShell,
    SearchInputContainer,
    ChatSearchInput,
    ContactSmallFrame
}
