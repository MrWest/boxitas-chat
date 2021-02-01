import { Button, Grid, TextField } from "@material-ui/core";
import Person from '@material-ui/icons/PersonRounded';
import { connect } from "react-redux";
import Pusher from 'pusher-js';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { registersSelectedContactMessage } from "../../actions/contactActions";
import expressServer from "../../apis/expressServer";

const ChatListTitle = styled.p`
    font-size: 18px;
    margin: 0px;
    margin-right: 32px;
`;
const ChatSendInput = styled(TextField)`
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

const ChatBox = ({ selectedContact, myself, registerMessage }) => {
    const [outgoingText, setOutgoingText] = useState();
    
    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER,
            forceTLS: true
          });
          const channel = pusher.subscribe('chat');
          channel.bind('message', data => {
            registerMessage(data);
          });
        return () => pusher.unsubscribe('chat');
    }, []);

    const onTextChanged = ({ target: { value }}) => setOutgoingText(value);

    const sendMessage = () => {
        const { post } = expressServer();
        setOutgoingText();
        const payload = {
            created: Date.now(),
            username: myself.name,
            message: outgoingText
          };
         
          post(`message`, payload);
    };
     const { name, messages } = selectedContact;
    return (
        <Grid container direction="column" style={{ width: '100%', minHeight: '50vh' }}>
                <Grid item>
                 <ChatListTitle>Message history {name && `from ${name}`}</ChatListTitle>
                </Grid>
                <Grid item xs>
                    {messages?.map(message => (
                        <ChatMessages message={message} />
                    ))}
                </Grid>
                <Grid item>
                 <Grid container alignItems="center" spacing={4}>
                     <Grid item xs>
                         <ChatSendInputtContainer>
                             <ChatSendInput value={outgoingText} onChange={onTextChanged} multiline />
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
const mapStateTopProps = ({selectedContact, contacts}) =>  ({
        selectedContact,
        myself: contacts.find(c => c.current) || { id: 1, name: "someUser"}
    });

export default connect(mapStateTopProps, { registerMessage: registersSelectedContactMessage })(ChatBox);