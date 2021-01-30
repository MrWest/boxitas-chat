import { Button, Grid } from "@material-ui/core";
import Person from '@material-ui/icons/PersonRounded';
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
const FriendItemShell = styled(ChatListTitle)`
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

const FriendName = styled(ChatListTitle)`
    font-size: 16;
    margin-left: 24px;
`;

const ChatMessages =({ user }) => {

    return (
        <FriendItemShell>
            <Grid container alignItems="center">
                <Grid item>
                    <Person />
                </Grid>
                <Grid xs>
                    <FriendName>{user.name}</FriendName>
                </Grid>
            </Grid>
        </FriendItemShell>
    );
}

const ChatBox = () => (
        <Grid container direction="column" style={{ width: '100%', minHeight: '50vh' }}>
                <Grid item>
                 <ChatListTitle>Message History</ChatListTitle>
                </Grid>
                <Grid item xs>
                    <ChatMessages user={{ name: 'Karen' }} />
                    <ChatMessages user={{ name: 'Stacy' }} />
                    <ChatMessages user={{ name: 'Bob' }} />
                </Grid>
                <Grid item>
                 <Grid container alignItems="center" spacing={4}>
                     <Grid item xs>
                         <ChatSendInputtContainer>
                             <ChatSendInput />
                         </ChatSendInputtContainer>
                     </Grid>
                     <Grid item>
                         <Button variant="contained" color="primary">
                             Send
                         </Button>
                     </Grid>
                 </Grid>
                </Grid>
         </Grid>

);

export default ChatBox;