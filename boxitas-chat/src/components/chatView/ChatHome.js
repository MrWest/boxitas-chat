import { Grid } from "@material-ui/core";
import CenteredFrame from "../globals/CenterdFrame";
import ChatBox from "./ChatBox";
import ChatFriendsList from "./ChatFriendsList";


const ChatHome = () => (
    <CenteredFrame>
        <Grid container spacing={8}>
            <Grid item xs={3}>
             <ChatFriendsList />
            </Grid>
            <Grid item xs>
             <ChatBox />
            </Grid>
        </Grid>
    </CenteredFrame>
);

export default ChatHome;