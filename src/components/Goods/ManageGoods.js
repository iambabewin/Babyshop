import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Select, Popconfirm, message } from 'antd';
import EditGoods from './EditGoods'
import '../style.less'

const Option = Select.Option;

class ManageGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      page: 1,
    }
  }
  componentDidMount() {
    this.getGoods();
  }
  getGoods = () => {
    this.props.dispatch({
      type: 'good/getGoods',
    })
  }
  showModal = (e) => {
    this.setState({
      visible: true,
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

  confirm = () => {
    message.success('点击了确定');
  }

  render() {
    const columns = [{
      title: '商品编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '商品类型',
      dataIndex: 'categoryId',
      key: 'categoryId',
    }, {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a onClick={(e) => { console.log(record); this.showModal(e) }}>编辑</a>
          <Popconfirm title="确定要删除这个商品吗？" onConfirm={this.confirm}>
            <a style={{ color: 'red', paddingLeft: 5 }}>删除</a>
          </Popconfirm>
        </div>
      ),
    }];
    const data = [];
    const { goodsList } = this.props;
    // console.log('goodsList',goodsList);
    const pagination = {
      total: goodsList.total,
      showSizeChanger: false,
      onChange: (current) => {
        this.setState({ page: current });
        this.GetCategory(current);
      },
    };

    return (
      <div>
        <Table className="manageGoods"
          rowKey={record => record.id}
          columns={columns} dataSource={goodsList.list} pagination={pagination} />
        {/*订单明细模态框*/}
        <EditGoods
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
    goodsList: state.good.goodsList,
  }
})(ManageGoods);