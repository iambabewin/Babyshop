import React from 'react';
import { Table, Icon, Select, Popconfirm, message, Modal  } from 'antd';
import CategoryModal from './CategoryModal';
import '../style.less'

const Option = Select.Option;

class ManageCategory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
    }
  }

   confirm = () => {
    message.success('点击了确定');
  }
  
   cancel = () => {
    message.error('点击了取消');
  }

  showModal = (e) => {
      this.setState({
      visible: true,
      });
  }

  handleOk = (e) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const columns = [{
      title: '分类名称',
      dataIndex: 'categoryname',
      key: 'categoryname',
    }, {
      title: '分类id',
      dataIndex: 'categoryid',
      key: 'categoryid',
    }, {
      title: '父分类pid',
      dataIndex: 'categoryPid',
      key: 'categoryPid',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a onClick={this.showModal}>编辑</a>
          <Popconfirm title="确定要删除这个分类吗？" onConfirm={this.confirm} onCancel={this.cancel}>
            <a style={{color:'red',paddingLeft:5}}>删除</a>
          </Popconfirm>
        </div>
      ),
    }];
    
    const data = [{
      key: '1',
      categoryname: '奶粉辅食',
      categoryid:'1',
      categoryPid:'0',
    },{
      key: '2',
      categoryname: '纸尿裤湿巾',
      categoryid:'2',
      categoryPid:'0',
    },{
      key: '3',
      categoryname: '洗护用品',
      categoryid:'3',
      categoryPid:'0',
    },{
      key: '4',
      categoryname: '宝宝服饰',
      categoryid:'4',
      categoryPid:'0',
    },{
      key: '5',
      categoryname: '童车座椅',
      categoryid:'5',
      categoryPid:'0',
    },{
      key: '6',
      categoryname: '玩具',
      categoryid:'6',
      categoryPid:'0',
    }];

    const pagination = {
      total: data.length,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        console.log('Current: ', current);
      },
    };

    return (
      <div>
        <Table columns={columns} dataSource={data} pagination={pagination}/>

        {/*编辑分类模态框*/}
        <CategoryModal 
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default ManageCategory;

