import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { getMe } from './../../actions/auth';

import './App.scss';
import { Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: React.PropTypes.bool,
    routing: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderAuthenticatedPage = this.renderAuthenticatedPage.bind(this);

    this.state = {
      collapse: false
    };
  }

  componentDidMount() {
  }

  componentWillMount() {
    let { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      return this.props.history.push("/login");
    } else {
      this.props.dispatch(getMe())
    }
  }

  renderAuthenticatedPage() {
    return (
      <div className="ant-layout-aside">
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"/>
          <Menu mode="inline" theme="dark" defaultOpenKeys={['sub1']}>
            <SubMenu key="sub1" title={<span><Icon type="study" />Lectures</span>}>
              <Menu.Item key="1">
                <Link to={'/lectures'}>
                  Upcoming
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={'/lectures/manage'}>
                  Manage (Admin)
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header" />
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div style={{ height: 590 }}>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let { isAuthenticated } = this.props;

    return (
      <div>
        {isAuthenticated? this.renderAuthenticatedPage() : <div>Loading</div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { routing, auth: { isAuthenticated, user } } = state;
  return {
    isAuthenticated, user,routing
  };
}

export default withRouter(connect(mapStateToProps)(App));
