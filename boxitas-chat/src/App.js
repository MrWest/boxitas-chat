import logo from './logo.svg';
import './App.css';
import CenteredFrame from './components/globals/CenterdFrame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <CenteredFrame>
        <p style={{ fontSize: 46, color: '#000', marginTop: 78, marginBottom: 90 }}>Orishas</p>
      </CenteredFrame>
    </div>
  );
}

export default App;
