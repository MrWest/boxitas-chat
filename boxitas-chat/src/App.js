import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatHome from "./components/chatView/ChatHome";
import Header from './components/Header';
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={ChatHome} path='/chat' exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
