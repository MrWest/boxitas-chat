import { Button, Grid, TextField } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { connect } from "react-redux";
import Pusher from 'pusher-js';
import moment from 'moment';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { registersSelectedContactMessage, setMessageWasViewed } from "../../actions/contactActions";
import { ContactSmallFrame } from "./common";
import { ImgStandard } from "../globals";
import jsonServer from "../../apis/jsonServer";
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

const timeDiff = (date1, date2) => Math.abs(date2.getTime() - date1.getTime());

const oneMinute = 60 * 1000;
const Timestamp = ({ message, previous }) => {
  const timestamp = new Date(message.created);
  const show = !previous || timeDiff(timestamp, new Date(previous.created)) > oneMinute;
  return show && <TimeText>{moment(timestamp).format('MM/DD hh:mm A')}</TimeText>;
};

const ChatMessages =({ message, isSent, onShown, previous }) => {
    // if it is a recieved message thats not viewed -> set to viewed
    if((!message.wasViewed && !isSent) || 
    (!message.wasViewed && message.sender === message.receiver)) onShown(message);
    return (
        <div style={{ marginBottom: 4 }}>
            <Grid container justify="center">
                <Timestamp message={message} previous={previous} />
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
                        {isSent&&message.wasViewed && <CheckIcon />}
                    </MessageBulb>
                </Grid>
            </Grid>
        </div>
            
    );
}

const ChatBox = ({ selectedContact, currentUser, registerMessage, messageWasViewed }) => {
    const [outgoingText, setOutgoingText] = useState();
    const [elRef, setElRef] = useState();
    // when the component is mounted creates the Pusher object and subscribe to the channels
    // chat channel  binded  to 'message' to watch for new messages on the current chat
    useEffect(() => {
        if(selectedContact.id){ 
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER,
            forceTLS: true
          });
          const channel = pusher.subscribe('chat');
          channel.bind('message', data => {
            //   console.log('Y', selectedContact);
            //   const a = ((selectedContact.id === data.sender) && (currentUser.id === data.receiver));
            //   console.log('a-  ', selectedContact.id,  ' === ', data.sender, '  &&  ', currentUser.id, ' === ', data.receiver , data.message) 
              
            //   const b = ((currentUser.id === data.sender) && (selectedContact.id === data.receiver));
            //   console.log('b-  ', currentUser.id,  ' === ', data.sender, '  &&  ', selectedContact.id, ' === ', data.receiver, data.message )
            //   console.log('shit', a , b);
            if(((selectedContact.id === data.sender) && (currentUser.id === data.receiver)) ||
            ((currentUser.id === data.sender) && (selectedContact.id === data.receiver)) ) 
            registerMessage(data);
          });
        }
    }, [selectedContact]);

    const onTextChanged = ({ target: { value }}) => setOutgoingText(value);

    // just a simple post for a new message the API will trigger the notification back.
    // therefore we dont need to handle any global or local state in this step
    const sendMessage = () => {
        const { post } = jsonServer();
        setOutgoingText('');
        const payload = {
            id: Date.now(),
            created: Date.now(),
            sender: currentUser.id,
            senderAvatar: currentUser.avatar,
            receiver: selectedContact.id,
            message: outgoingText,
            wasViewed: false
          };
         
          post(`messages`, payload);
    };

    const onKeyDown = ({ keyCode }) => keyCode === 13 && sendMessage();

    // scroll down whenever the selected contact changes or receives a new message
    useEffect(() => {
        if (elRef) {
          elRef.scrollTop = elRef.scrollHeight;
        }
      }, [selectedContact, elRef]);

     const { name, messages } = selectedContact;
    return (
        <ChatBoxShell>
        <Grid container direction="column" style={{ width: '100%', minHeight: '50vh' }}>
                <Grid item>
                 <ChatListTitle>Message history {name && `with ${name}`}</ChatListTitle>
                </Grid>
                <Grid item xs>
                    <MessagesWrapper ref={setElRef}>
                        {selectedContact.id && messages?.map((message, idx) => (
                        <ChatMessages key={message.id} message={message} 
                        isSent={message.sender === currentUser.id} onShown={messageWasViewed}  previous={idx && messages[idx - 1]} />
                        ))}
                    </MessagesWrapper>
                </Grid>
                <Grid item>
                 <Grid container alignItems="center" spacing={1}>
                     <Grid item xs>
                         {/* disabled on no selected contact */}
                         <ChatSendInputtContainer>
                             <ChatSendInput value={outgoingText} onChange={onTextChanged} onKeyUp={onKeyDown}
                                variant="outlined"
                                multiline
                                rows={3}
                                disabled={!selectedContact.id}
                                rowsMax={3} />
                         </ChatSendInputtContainer>
                     </Grid>
                     <Grid item>
                         {/* disabled on no text for sending */}
                         <SendButton variant="contained" color="primary" disabled={!outgoingText} onClick={sendMessage}>
                             Send
                         </SendButton>
                     </Grid>
                 </Grid>
                </Grid>
         </Grid>
         </ChatBoxShell>

    );
};
const mapStateTopProps = ({selectedContact, currentUser}) =>  ({
        selectedContact,
        currentUser
    });

export default connect(mapStateTopProps, { registerMessage: registersSelectedContactMessage, messageWasViewed: setMessageWasViewed })(ChatBox);