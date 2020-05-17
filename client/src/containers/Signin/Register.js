import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker, Select, Modal } from 'antd';
import { registerUser } from './../../actions/auth';

import './Login.scss';

const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

class Register extends Component {
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
      dispatch(registerUser(creds, this.loginFailedCallback));
    });
  }

  loginFailedCallback = (error) => {
    Modal.error({
      title: "Registration Failed",
      content: error.message.toString()
    });
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

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '91',
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>,
    );
    return (
      <div className="login-container register-container">
        <div className="login-mask"/>
        <Form className="login-content" layout="horizontal" onSubmit={this.handleSubmit}>
          <h2>Student Login</h2>
          <FormItem label="Name" hasFeedback>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please enter your name!' }],
            })(<Input placeholder="First Last" style={{ width: '100%' }} />)}
          </FormItem>
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
          <FormItem label="Date of Birth">
            {getFieldDecorator('dateOfBirth', {
              rules: [{ type: 'object', required: true, message: 'Please select time!' }]
            })(<DatePicker />)}
          </FormItem>
          <FormItem label="Grade" hasFeedback>
            {getFieldDecorator('grade', {
              rules: [{ required: true, message: 'Please select your grade!' }],
            })(
              <Select placeholder="Please select grade">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
                <Option value="F">F</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="Board" hasFeedback>
            {getFieldDecorator('board', {
              rules: [{ required: true, message: 'Please select your board!' }],
            })(
              <Select placeholder="Please select board">
                <Option value="CBSE">CBSE</Option>
                <Option value="ICSE">ICSE</Option>
                <Option value="State Board">State Board</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="Mobile" hasFeedback>
            {getFieldDecorator('mobile', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </FormItem>
          <FormItem>
            <Button className="ant-col-24" type="primary" htmlType="submit">Register</Button>
          </FormItem>
          <FormItem>
            <Button className="ant-col-24" type="primary">Login</Button>
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

export default connect(mapStateToProps)(createForm()(Register));
