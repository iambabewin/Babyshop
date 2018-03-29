import React from 'react';
import { Table, Icon, Select, Popconfirm, message, Modal } from 'antd';
import CategoryModal from './CategoryModal';
import { connect } from 'dva';
import '../style.less'

const Option = Select.Option;
const pageSize = 8;

class ManageCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      page: 1,
      editedName: '',
    }
  }

  componentDidMount() {
    this.GetCategory()
  }
  showModal = (e, name) => {
    this.setState({
      visible: true,
      editedName: name
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  /**获取所有分类 */
  GetCategory = (page) => {
    this.props.dispatch({
      type: 'category/GetCategory',
      payload: {
        page: page || this.state.page, //页数
        pageSize: pageSize //页面大小,
      }
    })
  }
  delCategory = (id) => {
    this.props.dispatch({
      type: 'category/DelCategory',
      payload: {
        int_id: id,
      }
    }).then((code) => {
      if (code === 200) {
        this.GetCategory()
      }
    })
  }
  render() {
    const columns = [{
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '分类id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a onClick={(e) => this.showModal(e, record.name)}>编辑</a>
          <Popconfirm title="确定要删除这个分类吗？" onConfirm={() => this.delCategory(record.id)}>
            <a style={{ color: 'red', paddingLeft: 5 }}>删除</a>
          </Popconfirm>
        </div>
      ),
    }];
    const { categoryList } = this.props;
    // console.log(categoryList)
    const pagination = {
      total: categoryList.total,
      showSizeChanger: false,
      onChange: (current) => {
        this.setState({ page: current });
        this.GetCategory(current);
      },
    };

    return (
      <div>
        <Table columns={columns}
          rowKey={record => record.id}
          dataSource={categoryList.list} pagination={pagination} />

        {/*编辑分类模态框*/}
        <CategoryModal
          name={this.state.editedName}
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    categoryList: state.category.categoryList
  }
})(ManageCategory);


