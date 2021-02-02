import { Grid } from "@material-ui/core";
import { MessageRounded } from "@material-ui/icons";
import Pusher from 'pusher-js';
import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getContacts, selectContact, notify } from "../../actions";
import { ImgStandard } from "../globals";
import { ContactSmallFrame } from "./common";

const ChatListTitle = styled.p`
    font-size: 18px;
    margin: 0px;
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
`;
const SearchInputContainer = styled.div`
    display: flex;
`;
const ContactItemShell = styled.div`
    border-bottom: 1px solid #d4d9e2;
    padding: 4px 0px;
    background: #fafafa;
    &:hover {
        background: transparent;
        color: #3577d4;
        cursor: pointer;
        border-bottom: 1px solid #3577d4;
      }
`;

const ContactName = styled(ChatListTitle)`
    font-size: 16;
    margin: 0px;
`;
const OnlineDot = styled.div`
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background: ${props => props.isOnline ? '#31a24c' : '#828282' };
`;
const NewMessage = styled(MessageRounded)`
    background: #31a24c;
    color: white;
    padding: 3px;
    border-radius: 8px;
    height: 10px;
    width: 10px;
    position: absolute;
    top: -6px;
    right: -12px;
`

const ContactItem =({ contact, onSelectContact }) => {

    return (
        <ContactItemShell onClick={onSelectContact}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <div style={{ position: "relative"}}>
                        <ContactSmallFrame>
                            <ImgStandard src={contact.avatar} />
                        
                        </ContactSmallFrame>
                        {contact.hasNewMessages && <NewMessage />}
                    </div>
                </Grid>
                <Grid item xs>
                    <ContactName>{contact.name}</ContactName>
                </Grid>
                <Grid item>
                    <OnlineDot isOnline={contact.isOnline} />
                </Grid>
            </Grid>
        </ContactItemShell>
    );
}

const ChatContactList = ({contacts, myself, doSelectContact, doGetContacts, doNotify}) => {

    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER,
            forceTLS: true
          });
          const channel = pusher.subscribe('chat');
          channel.bind('user', () => {
            doGetContacts();
          });
          channel.bind('notify', () => {
            doNotify(myself);
          });
          return () => pusher.unsubscribe('chat');
    }, []);
    
return (
        <Grid container direction="column" style={{ minHeight: '50vh' }}>
                <Grid item>
                    <Grid container alignItems="center" spacing={2} style={{ paddingBottom: 8 }}>
                        <Grid item>
                            <ChatListTitle>Contact List</ChatListTitle>
                        </Grid>
                        <Grid item xs>
                            <SearchInputContainer>
                                <ChatSearchInput />
                            </SearchInputContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs>
                    {contacts.map(contact => (
                        <ContactItem key={contact.name} contact={contact} onSelectContact={() => doSelectContact(contact, myself)}/>
                    ))}
                </Grid>
                <Grid item></Grid>
         </Grid>

);
}

const mapStateTopProps = ({contacts}) =>  ({
     contacts,
     myself: contacts.find(c => c.current) || {}
    });

export default connect(mapStateTopProps, { doSelectContact: selectContact,
     doGetContacts: getContacts, doNotify: notify })(ChatContactList);