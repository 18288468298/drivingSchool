import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Menus from './routes/component/menu';
import UserTable from './routes/component/usertable';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/menu" component={Menus} />


      </Switch>
    </Router>
  );
}

export default RouterConfig;
