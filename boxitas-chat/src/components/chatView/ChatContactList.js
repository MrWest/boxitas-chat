import { Grid } from "@material-ui/core";
import { MessageRounded } from "@material-ui/icons";
import Pusher from 'pusher-js';
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getContacts, selectContact, notify } from "../../actions";
import { ImgStandard } from "../globals";
import { ContactSmallFrame } from "./common";
import { respondTo } from "../../helpers/respondTo";

const ChatListTitle = styled.p`
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

const ContactItem =({ contact, onSelectContact, selected }) => {

    return (
        <ContactItemShell onClick={onSelectContact} selected={selected}>
            <Grid container spacing={2} alignItems="center">
                <Grid item md="auto" sm>
                    <div style={{ position: "relative"}}>
                        <ContactSmallFrame>
                            <ImgStandard src={contact.avatar} />
                        </ContactSmallFrame>
                        {contact.hasNewMessages && <NewMessage />}
                    </div>
                </Grid>
                <GridOnMobile item>
                    <OnlineDot isOnline={contact.isOnline} />
                </GridOnMobile>
                <Grid item xs>
                    <ContactName>{contact.name}</ContactName>
                </Grid>
                <GridNotMobile item>
                    <OnlineDot isOnline={contact.isOnline} />
                </GridNotMobile>
            </Grid>
        </ContactItemShell>
    );
}

const ChatContactList = ({contacts, currentUser, selectedContact, doSelectContact, doGetContacts, doNotify}) => {
    const [search, setSearch] = useState('');
    // when the component is mounted creates the Pusher object and subscribe to the channels
    // chat channel  binded  to 'user' to watch for new contacts
    // chat channel  binded  to 'notify' to watch for new messages
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
            doNotify(currentUser);
          });
          return () => pusher.unsubscribe('chat');
        
    }, []);

    const onTextChanged = ({ target: { value }}) => setSearch(value);
    
return (
        <Grid container direction="column" style={{ minHeight: '50vh' }}>
                <Grid item>
                    <Grid container alignItems="center" spacing={2} style={{ paddingBottom: 8 }}>
                        <CustomGrid item >
                            <ChatListTitle>Contact List</ChatListTitle>
                        </CustomGrid>
                        <Grid item xs>
                            <SearchInputContainer>
                                <ChatSearchInput onChange={onTextChanged}/>
                            </SearchInputContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs>
                    {contacts.map(contact => contact.name?.toLowerCase()
                    .includes(search.toLowerCase()) && <ContactItem key={contact.name} contact={contact}
                         onSelectContact={() => doSelectContact(contact, currentUser)} selected={contact.id === selectedContact.id}/>
                    )}
                </Grid>
                <Grid item></Grid>
         </Grid>

);
}

const mapStateTopProps = ({contacts, selectedContact, currentUser}) =>  ({
     contacts,
     currentUser,
     selectedContact
    });

export default connect(mapStateTopProps, { doSelectContact: selectContact,
     doGetContacts: getContacts, doNotify: notify })(ChatContactList);