import { Button, Grid } from "@material-ui/core";
import Person from '@material-ui/icons/PersonRounded';
import axios from "axios";
import Pusher from 'pusher-js';
import { useEffect, useReducer, useState } from "react";
import reducer from '../../reducers';
import styled from "styled-components";

const ChatListTitle = styled.p`
    font-size: 18px;
    margin: 0px;
    margin-right: 32px;
`;
const ChatSendInput = styled.textarea`
    width: 100%;
    border-radius: 16px;
    padding: 16px 24px;
    border: 1px solid #d4d9e2;
    outline: none;
    position: relative;
`;
const ChatSendInputtContainer = styled.div`
    display: flex;
`;
const ContactItemShell = styled(ChatListTitle)`
    border-bottom: 1px solid #d4d9e2;
    background: #fafafa;
    &:hover {
        background: transparent;
        color: #3577d4;
        font-weight: bold;
        cursor: pointer;
        border: 2px solid #3577d4;
      }
`;

const ContactName = styled(ChatListTitle)`
    font-size: 16;
    margin-left: 24px;
`;

const ChatMessages =({ message }) => {

    return (
        <ContactItemShell>
            <Grid container alignItems="center">
                <Grid item>
                    <Person />
                </Grid>
                <Grid item xs>
                    <ContactName>{message.message}</ContactName>
                </Grid>
            </Grid>
        </ContactItemShell>
    );
}

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [outgoingText, setOutgoingText] = useState();
    const [{ selectedContactReducer }, dispatch] = useReducer(reducer, {});
    
    useEffect(() => {
        Pusher.logToConsole = true;
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER,
            forceTLS: true
          });
          const channel = pusher.subscribe('chat');
          channel.bind('message', data => {
              setMessages([...messages, data]);
          });
    }, []);

    const onTextChanged = ({ target: { value }}) => setOutgoingText(value);

    const sendMessage = () => {
        setOutgoingText();
        const payload = {
            username: 'traveler',
            message: outgoingText
          };
          axios.post(`http://localhost:${process.env.REACT_APP_PORT}/message`, payload);
    };

    return (
        <Grid container direction="column" style={{ width: '100%', minHeight: '50vh' }}>
                <Grid item>
                 <ChatListTitle>Message History from {selectedContactReducer.name}</ChatListTitle>
                </Grid>
                <Grid item xs>
                    {messages.map(message => (
                        <ChatMessages message={message} />
                    ))}
                </Grid>
                <Grid item>
                 <Grid container alignItems="center" spacing={4}>
                     <Grid item xs>
                         <ChatSendInputtContainer>
                             <ChatSendInput value={outgoingText} onChange={onTextChanged}/>
                         </ChatSendInputtContainer>
                     </Grid>
                     <Grid item>
                         <Button variant="contained" color="primary" disabled={!outgoingText} onClick={sendMessage}>
                             Send
                         </Button>
                     </Grid>
                 </Grid>
                </Grid>
         </Grid>

    );
};

export default ChatBox;