import { Grid } from "@material-ui/core";
import Pusher from 'pusher-js';
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getContacts, selectContact, notify, setIsLoading } from "../../actions";
import { ImgStandard } from "../globals";
import { ChatContactsTitle, ContactSmallFrame, ChatSearchInput, ContactItemShell, ContactName, ContactsWrapper, CustomGrid, GridNotMobile, GridOnMobile, NewMessage, OnlineDot, SearchInputContainer } from "./chatCommon";



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

const ChatContactList = ({contacts, currentUser, selectedContact, doSelectContact, doGetContacts, doNotify, isLoading}) => {
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
                            <ChatContactsTitle>Contact List</ChatContactsTitle>
                        </CustomGrid>
                        <Grid item xs>
                            <SearchInputContainer>
                                <ChatSearchInput data-testid="search-input" onChange={onTextChanged}/>
                            </SearchInputContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <ContactsWrapper>
                        {contacts.map(contact => contact.name?.toLowerCase()
                        .includes(search.toLowerCase()) && <ContactItem key={contact.name} contact={contact}
                            onSelectContact={() => {
                                 isLoading(false);
                                 doSelectContact(contact, currentUser);
                                 isLoading(true);
                                }} selected={contact.id === selectedContact.id}/>
                        )}
                    </ContactsWrapper>
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
     doGetContacts: getContacts, doNotify: notify, isLoading: setIsLoading })(ChatContactList);