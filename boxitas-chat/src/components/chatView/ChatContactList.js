import { Grid } from "@material-ui/core";
import Person from '@material-ui/icons/PersonRounded';
import { connect } from "react-redux";
import styled from "styled-components";
import { selectContact } from "../../actions/contactActions";
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

const ContactItem =({ contact, onSelectContact }) => {

    return (
        <ContactItemShell onClick={onSelectContact}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <ContactSmallFrame>
                        <ImgStandard src={contact.avatar} />
                    </ContactSmallFrame>
                </Grid>
                <Grid item xs>
                    <ContactName>{contact.name}</ContactName>
                </Grid>
            </Grid>
        </ContactItemShell>
    );
}

const ChatContactList = ({contacts, myself, doSelectContact}) => {
    
return (
        <Grid container direction="column" style={{ minHeight: '50vh' }}>
                <Grid item>
                    <Grid container alignItems="center" spacing={2}>
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
     myself: contacts.filter(c => c.current) || {}
    });

export default connect(mapStateTopProps, { doSelectContact: selectContact })(ChatContactList);