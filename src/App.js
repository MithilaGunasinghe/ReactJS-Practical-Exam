import './App.scss';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ResultsPage } from './pages/result';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <ResultsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
