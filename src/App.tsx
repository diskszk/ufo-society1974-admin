import React from 'react';
import './assets/style.css'
import Routes from './Routes';
// import { BrowserRouter as Router, Route } from 'react-router-dom'
// import Router from './Router';
// import { Home, Login } from './pages';


const App = () => {

  return (
    <main>
      {/* <Router /> */}
      <Routes />
    </main>
    // <Router>
    //   <Route exact path={"(/)?"} component={Home} />
    //   <Route exact path={"/login"} component={Login} />
    //   <Route exact path={"/songs"} component={Login} />
    //   <Route exact path={"/users"} component={Login} />
    // </Router>
  );
}

export default App;
