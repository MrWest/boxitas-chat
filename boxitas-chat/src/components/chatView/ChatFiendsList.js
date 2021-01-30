import { Grid } from "@material-ui/core";
import styled from "styled-components";

const ChatListTitle = styled.p`
    font-size: 18px;
    margin: 0px;
    margin-right: 32px;
`;
const ChatSearchInput = styled.input`
    height: 32px;
    width: 100%;
    border-radius: 16px;
    padding: 6px 24px;
    border: 1px solid #d4d9e2;
    outline: none;
`;

const ChatFiendsList = () => (
    <Grid container direction="column">
        <Grid item>
            <Grid container alignItems="center" >
                <Grid item>
                  <ChatListTitle>Friend List</ChatListTitle>
                </Grid>
                <Grid item xs>
                  <ChatSearchInput />
                </Grid>
            </Grid>
        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
    </Grid>

);

export default ChatFiendsList;