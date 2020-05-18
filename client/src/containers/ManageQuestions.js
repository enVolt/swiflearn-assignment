import React, { Component } from 'react';
import { Breadcrumb, Button } from 'antd';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router'
import { Tabs, Table } from 'antd';
import { getQuestions, getStudents, assignStudent, unassignStudent } from './../actions/questions'
import { getAllStudents } from './../actions/student'
const { TabPane } = Tabs;

class ManageQuestions extends Component {
  state = {
    lecture: null,
    selectedTab: "1",
    selectedStudents: [],
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getQuestions());
    if (this.props.routeParams && this.props.routeParams.questionId) {
      this.handleTab3();
    }
  }

  handleTab3() {
    this.props.dispatch(getAllStudents());
    this.props.dispatch(getStudents(this.props.routeParams.questionId));
    this.setState({
      selectedTab: "3"
    })
  }

  goToAsssign(questionId) {
    location.href = "/questions/manage/" + questionId;
  }

  handleAssign(record, selected) {
    if (selected) {
      this.props.dispatch(assignStudent(this.props.routeParams.questionId, record.id));
      setTimeout(() => {
        this.props.dispatch(getStudents(this.props.routeParams.questionId))
      }, 1000);
    } else {
      this.props.dispatch(unassignStudent(this.props.routeParams.questionId, record.id));
      setTimeout(() => {
        this.props.dispatch(getStudents(this.props.routeParams.questionId));
      }, 1000);
    }
  }

  render() {
    const { list: questions } = this.props.questions;
    const { list: students } = this.props.students;
    const { list: questionStudent } = this.props.questionStudent;
    const { selectedTab } = this.state;
    const selectedStudents = questionStudent.map(s => s.studentId.toString());

    return <div>
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Questions</Breadcrumb.Item>
          <Breadcrumb.Item>Manage</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="ant-layout-container">
        <div className="ant-layout-content">
          <div style={{ height: 590 }}>
            <Tabs defaultActiveKey={selectedTab}>
              <TabPane tab="Create" key="1">
                Form to Create Lecture
              </TabPane>
              <TabPane tab="Show All" key="2">
                <Table dataSource={questions} columns={[
                  { title: "Question", key: "question", dataIndex: "question" },
                  { title: "Description", key: "description", dataIndex: "description" },
                  { title: "Subject", key: "subject.name", dataIndex: "subject.name" },
                  { title: "Created At", key: "createdAt", dataIndex: "createdAt" },
                  {
                    title: "Assign", key: 'assign', render: (text, record) => {
                      return <span>
                        <Button onClick={this.goToAsssign.bind(this, record.id)} >Assign</Button>
                      </span>
                    }
                  },
                ]}
                />
              </TabPane>
              <TabPane tab="Assign" key="3">
                {!this.props.routeParams || !this.props.routeParams.questionId
                  ? <div>Select Row from List Tab</div>
                  : <Table
                    rowSelection={{
                      selectedRowKeys: selectedStudents,
                      onSelect: this.handleAssign.bind(this)
                    }}
                    dataSource={students}
                    rowKey={"id"} columns={[
                      { title: "Name", key: "name", dataIndex: "name" },
                      { title: "Board", key: "board", dataIndex: "board" },
                      { title: "Grade", key: "grade", dataIndex: "grade" }
                    ]} />
                }
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="ant-layout-footer">
        Ant Design
      </div>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questionsGet,
    students: state.students,
    questionStudent: state.questionStudent
  };
}

export default withRouter(connect(mapStateToProps)(ManageQuestions));
