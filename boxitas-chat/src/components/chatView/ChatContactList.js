import { Grid } from "@material-ui/core";
import Person from '@material-ui/icons/PersonRounded';
import styled from "styled-components";

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

const ContactItem =({ user }) => {

    return (
        <ContactItemShell>
            <Grid container alignItems="center">
                <Grid item>
                    <Person />
                </Grid>
                <Grid xs>
                    <ContactName>{user.name}</ContactName>
                </Grid>
            </Grid>
        </ContactItemShell>
    );
}

const ChatContactList = () => (
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
                    <ContactItem user={{ name: 'Karen' }} />
                    <ContactItem user={{ name: 'Stacy' }} />
                    <ContactItem user={{ name: 'Bob' }} />
                </Grid>
                <Grid item></Grid>
         </Grid>

);

export default ChatContactList;