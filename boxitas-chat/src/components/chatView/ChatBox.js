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
const SendButton = styled(Button)`
    height: 92px;
    width: 142px;
    font-size: 32px;
`
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
   const time = new Date(message.created);

    return (
        <div>
            <Grid justify="center">
                <TimeText>{time.toLocaleDateString()}</TimeText>
            </Grid>
            <Grid container spacing={2} justify={isSent? "flex-end" : "flex-start"} >
                {!isSent && 
                <Grid item  style={{ paddingTop: 16 }}>
                    <ContactSmallFrame>
                        <ImgStandard src={message.senderAvatar} />
                    </ContactSmallFrame>
                </Grid>
                }
                <Grid item style={{ maxWidth: '70%' }}>
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
        // return () => pusher.unsubscribe('chat');
    }, []);

    const onTextChanged = ({ target: { value }}) => setOutgoingText(value);

    const sendMessage = () => {
        const { post } = jsonServer();
        setOutgoingText('kkk');
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
                    {selectedContact.id && messages?.map(message => (
                       message.sender !== message.receiver && <ChatMessages message={message} isSent={message.sender === myself.id}/>
                    ))}
                </Grid>
                <Grid item>
                 <Grid container alignItems="center" spacing={1}>
                     <Grid item xs>
                         <ChatSendInputtContainer>
                             <ChatSendInput value={outgoingText} onChange={onTextChanged}
                                variant="outlined"
                                multiline
                                rows={3}
                                disabled={!selectedContact.id}
                                rowsMax={3} />
                         </ChatSendInputtContainer>
                     </Grid>
                     <Grid item>
                         <SendButton variant="contained" color="primary" disabled={!outgoingText} onClick={sendMessage}>
                             Send
                         </SendButton>
                     </Grid>
                 </Grid>
                </Grid>
         </Grid>

    );
};
const mapStateTopProps = ({selectedContact, contacts}) =>  ({
        selectedContact,
        myself: contacts.find(c => c.current) || { id: false, name: "someUser"}
    });

export default connect(mapStateTopProps, { registerMessage: registersSelectedContactMessage })(ChatBox);