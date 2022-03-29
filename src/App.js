import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import MainGrid from './components/grid/MainGrid';
import MainUserInformation from './components/useInformation/MainUserInformation';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact><MainGrid /></Route>
        <Route path="/user/:userId" exact><MainUserInformation /></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
