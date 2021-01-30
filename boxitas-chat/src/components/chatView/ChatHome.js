import { Grid } from "@material-ui/core";
import CenteredFrame from "../globals/CenterdFrame";
import ChatFriendsList from "./ChatFriendsList";


const ChatHome = () => (
    <CenteredFrame>
        <Grid container>
            <Grid item xs={3}>
                <ChatFriendsList />
            </Grid>
            <Grid item xs>

            </Grid>
        </Grid>
    </CenteredFrame>
);

export default ChatHome;