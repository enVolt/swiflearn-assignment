import React, { Component } from 'react';
import { Breadcrumb, Table, Button, Modal } from 'antd';
import { connect } from 'react-redux';

import { upcomingLectures } from './../actions/lectures'

class UpcomingLectures extends Component {
  state = {
    videoModalVisible: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(upcomingLectures());
  }

  closeModal () {
    this.setState({
      videoModalVisible: false
    })
  }
  showModal () {
    this.setState({
      videoModalVisible: true
    })
  }

  render() {
    return <div>
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Lectures</Breadcrumb.Item>
          <Breadcrumb.Item>Upcoming</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="ant-layout-container">
        <div className="ant-layout-content">
          <div>Welcome {this.props.me.name}</div>
          <Table dataSource={this.props.upcomingLectures.list}
            columns={[{ title: "Description", key: "lecture.description", dataIndex: "lecture.description" },
            { title: "Start", key: "lecture.start", dataIndex: "lecture.start" },
            { title: "End", key: "lecture.end", dataIndex: "lecture.end" },
            { title: "Subject", key: "lecture.subject.name", dataIndex: "lecture.subject.name" },
            { title: "Teacher", key: "lecture.teacher.name", dataIndex: "lecture.teacher.name" },
            { title: "Created At", key: "lecture.createdAt", dataIndex: "lecture.createdAt" },
            {
              title: "Assign", key: 'assign', render: (text, record) => {
                return <span>
                  <Button onClick={this.showModal.bind(this)}>Watch</Button>
                </span>
              }
            }]} />
        </div>
      </div>
      <div className="ant-layout-footer">
        Ant Design
      </div>
      <Modal
        title="Watch Video"
        visible={this.state.videoModalVisible}
        onOk={this.closeModal.bind(this)}
        onCancel={this.closeModal.bind(this)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    me: state.me,
    upcomingLectures: state.upcomingLectures
  };
}

export default connect(mapStateToProps)(UpcomingLectures);
