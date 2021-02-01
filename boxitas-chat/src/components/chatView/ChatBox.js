import { Button, Grid, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import Pusher from 'pusher-js';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { registersSelectedContactMessage } from "../../actions/contactActions";
import { ContactSmallFrame } from "./common";
import { ImgStandard } from "../globals";
import jsonServer from "../../apis/jsonServer";

const ChatListTitle = styled.p`
    font-size: 18px;
    margin: 0px;
    margin-right: 32px;
`;
const TimeText = styled(ChatListTitle)`
    font-size: 12px;
    margin: 24px 0px 8px 0px;
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
const ChatSendInputtContainer = styled.div`
    display: flex;
`;
const MessageBulb = styled.div`
    background:  ${props => props.isSent ? '#CCCCCC' : '#2851A3' };
    color: ${props => props.isSent ? '#1C1C1C' : 'white' };
    padding: 10px 24px;
    border-radius: 24px;
`;

const Message = styled(ChatListTitle)`
    font-size: 16;
    margin: 0px;
`;

const ChatMessages =({ message, isSent }) => {

    return (
        <div>
            <Grid justify="center">
                <TimeText>{message.created}</TimeText>
            </Grid>
            <Grid container spacing={2} justify={isSent? "flex-end" : "flex-start"} >
                {!isSent && 
                <Grid item  style={{ paddingTop: 16 }}>
                    <ContactSmallFrame>
                        <ImgStandard src={message.senderAvatar} />
                    </ContactSmallFrame>
                </Grid>
                }
                <Grid item xs={8}>
                    <MessageBulb isSent={isSent}>
                        <Message>{message.message}</Message>
                    </MessageBulb>
                </Grid>
            </Grid>
        </div>
            
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
        const { post } = jsonServer();
        setOutgoingText();
        const payload = {
            created: Date.now(),
            sender: myself.id,
            senderAvatar: myself.avatar,
            receiver: selectedContact.id,
            message: outgoingText
          };
         
          post(`messages`, payload);
    };
     const { name, messages } = selectedContact;
    return (
        <Grid container direction="column" style={{ width: '100%', minHeight: '50vh' }}>
                <Grid item>
                 <ChatListTitle>Message history {name && `from ${name}`}</ChatListTitle>
                </Grid>
                <Grid item xs>
                    {messages?.map(message => (
                        <ChatMessages message={message} isSent={message.sender === myself.id}/>
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