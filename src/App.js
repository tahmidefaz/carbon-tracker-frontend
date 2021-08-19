import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import CarbonDisplay from './CarbonDisplay';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="/display" component = {CarbonDisplay} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
