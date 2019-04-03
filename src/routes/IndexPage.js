import React from 'react';
import { connect } from 'dva';

import Login from './component/login'
function IndexPage() {
  return (
    <div style={{ background: '#4f5b75',height:'100%'}}>
    <Login/>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
