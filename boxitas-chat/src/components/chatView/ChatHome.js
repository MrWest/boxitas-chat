import { Grid } from "@material-ui/core";
import CenteredFrame from "../globals/CenterdFrame";
import ChatBox from "./ChatBox";
import ChatContactList from "./ChatContactList";


const ChatHome = () => (
    <CenteredFrame>
        <Grid container spacing={8}>
            <Grid item xs={3}>
             <ChatContactList />
            </Grid>
            <Grid item xs>
             <ChatBox />
            </Grid>
        </Grid>
    </CenteredFrame>
);

export default ChatHome;