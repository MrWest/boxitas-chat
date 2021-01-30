import { Grid } from "@material-ui/core";
import CenteredFrame from "../globals/CenterdFrame";
import ChatFiendsList from "./ChatFiendsList";


const ChatHome = () => (
    <CenteredFrame>
        <Grid item xs={3}>
            <ChatFiendsList />
        </Grid>
        <Grid item xs>

        </Grid>
    </CenteredFrame>
);

export default ChatHome;