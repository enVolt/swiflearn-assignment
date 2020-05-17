import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { loginUser } from './../../actions/auth';
import { Link, withRouter } from 'react-router';

import './Login.scss';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

class Login extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());
      dispatch(loginUser(creds, this.loginFaileCallback));
    });
  }

  loginFaileCallback = (message) => {
    const { setFields } = this.props.form;
    const newValue = {
      email: {
        name: "email",
        validating: false,
        value: this.props.form.getFieldsValue()["email"],
        errors: [message]
      }
    };
    setFields(newValue);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const emailProps = getFieldDecorator('email', {
      validate: [{
        rules: [
          { required: true }
        ],
        trigger: 'onBlur'
      }, {
        rules: [
          { type: 'email', message: 'Should be a valid email' }
        ],
        trigger: ['onBlur', 'onChange']
      }]
    });

    const passwordProps = getFieldDecorator('password', {
      rules: [
        { required: true, min: 8, message: 'Should\'ve minimum 8 characters' }
      ]
    });

    return (
      <div className="login-container">
        <div className="login-mask"/>
        <Form className="login-content" layout="horizontal" onSubmit={this.handleSubmit}>
          <h2>Student Login</h2>
          <FormItem label="Email" hasFeedback>
            {emailProps(
              <Input
                placeholder="john@doe.com"
                type="email"
              />
            )}
          </FormItem>
          <FormItem label="Password" hasFeedback>
            {
              passwordProps(
                <Input
                  type="password"
                  autoComplete="off"
                  placeholder="secret-text"
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                />
              )
            }
          </FormItem>
          <FormItem>
            <Button className="ant-col-24" type="primary" htmlType="submit">Login</Button>
          </FormItem>
          <FormItem>
            <Link to="/register">
              <Button className="ant-col-24" type="primary">Register</Button>

            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

export default withRouter(connect(mapStateToProps)(createForm()(Login)));
