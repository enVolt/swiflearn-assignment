import React, { Component } from 'react';
import { Breadcrumb, Table, Button, Modal, Input } from 'antd';
import { connect } from 'react-redux';

import { unattendedQuestions } from './../actions/questions'

class UnattendedQuestions extends Component {
  state = {
    answerModalVisible: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(unattendedQuestions());
  }

  closeModal () {
    this.setState({
      answerModalVisible: false
    })
  }
  showModal () {
    this.setState({
      answerModalVisible: true
    })
  }

  render() {
    return <div>
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Questions</Breadcrumb.Item>
          <Breadcrumb.Item>Unattended</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="ant-layout-container">
        <div className="ant-layout-content">
          <div>Welcome {this.props.me.name}</div>
          <Table dataSource={this.props.unattendedQuestions.list}
            columns={[
              
              { title: "Question", key: "question.question", dataIndex: "question.question" },
              { title: "Is Answered?", key: "isAnswered", dataIndex: "isAnswered", render: (is) => {
                return is ? "Yes" : "No"
              } },
              { title: "Description", key: "question.description", dataIndex: "question.description" },
              { title: "Subject", key: "question.subject.name", dataIndex: "question.subject.name" },
              { title: "Created At", key: "question.createdAt", dataIndex: "question.createdAt" },
            {
              title: "Answer", key: 'assign', render: (text, record) => {
                return <span>
                  <Button onClick={this.showModal.bind(this)}>Answer</Button>
                </span>
              }
            }]} />
        </div>
      </div>
      <div className="ant-layout-footer">
        Ant Design
      </div>
      <Modal
        title="Answer Question"
        visible={this.state.answerModalVisible}
        onOk={this.closeModal.bind(this)}
        onCancel={this.closeModal.bind(this)}
        okText={"Submit"}
      >
        <div>
          <p>Question</p>
          <Input placeholder={"Type your answer"} />
        </div>
      </Modal>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    me: state.me,
    unattendedQuestions: state.unattendedQuestions
  };
}

export default connect(mapStateToProps)(UnattendedQuestions);
