import React, { Component } from 'react';
import { Breadcrumb, Button } from 'antd';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router'
import { Tabs, Table } from 'antd';
import { getLectures, assignStudent, unassignStudent, getStudents } from './../actions/lectures'
import { getAllStudents } from './../actions/student'
const { TabPane } = Tabs;

class ManageLectures extends Component {
  state = {
    lecture: null,
    selectedTab: "1",
    selectedStudents: [],
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getLectures());
    if (this.props.routeParams && this.props.routeParams.lectureId) {
      this.handleTab3();
    }
  }

  handleTab3() {
    this.props.dispatch(getAllStudents());
    this.props.dispatch(getStudents(this.props.routeParams.lectureId));
    this.setState({
      selectedTab: "3"
    })
  }

  goToAsssign(lectureId) {
    location.href = "/lectures/manage/" + lectureId;
  }

  handleAssign(record, selected) {
    if (selected) {
      this.props.dispatch(assignStudent(this.props.routeParams.lectureId, record.id));
      setTimeout(() => {
        this.props.dispatch(getStudents(this.props.routeParams.lectureId))
      }, 1000);
    } else {
      this.props.dispatch(unassignStudent(this.props.routeParams.lectureId, record.id));
      setTimeout(() => {
        this.props.dispatch(getStudents(this.props.routeParams.lectureId));
      }, 1000);
    }
  }

  render() {
    const { list: lectures } = this.props.lectures;
    const { list: students } = this.props.students;
    const { list: lectureStudent } = this.props.lectureStudent;
    const { selectedTab } = this.state;
    const selectedStudents = lectureStudent.map(s => s.studentId.toString());

    return <div>
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Lectures</Breadcrumb.Item>
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
                <Table dataSource={lectures} columns={[
                  { title: "Description", key: "description", dataIndex: "description" },
                  { title: "Start", key: "start", dataIndex: "start" },
                  { title: "End", key: "end", dataIndex: "end" },
                  { title: "Subject", key: "subject.name", dataIndex: "subject.name" },
                  { title: "Teacher", key: "teacher.name", dataIndex: "teacher.name" },
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
                {!this.props.routeParams || !this.props.routeParams.lectureId
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
    lectures: state.lecturesGet,
    students: state.students,
    lectureStudent: state.lectureStudent
  };
}

export default withRouter(connect(mapStateToProps)(ManageLectures));
