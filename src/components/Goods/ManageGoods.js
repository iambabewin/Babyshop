import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Select, Popconfirm, message } from 'antd';
import EditGoods from './EditGoods'
import '../style.less'

const Option = Select.Option;
const pageSize = 8;

class ManageGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      visible: false,
      current: 1,
      editedName: '',
      editedPrice: '',
    }
  }
  componentDidMount() {
    this.getGoods();
  }
  getGoods = () => {
    this.props.dispatch({
      type: 'good/getGoods',
      payload: {
        page: 1,
        pageSize: pageSize,
      }
    }).then(() => {
      this.setState({ loadingList: false })
    }).catch((err) => {
      this.setState({ loadingList: false })
    })
  }
  showModal = (e, record) => {
    console.log('record', record)
    this.setState({
      visible: true,
      editedName: record.name,
      editedPrice: record.price,
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
          <a onClick={(e) => this.showModal(e, record)}>编辑</a>
          <Popconfirm title="确定要删除这个商品吗？" onConfirm={this.confirm}>
            <a style={{ color: 'red', paddingLeft: 5 }}>删除</a>
          </Popconfirm>
        </div>
      ),
    }];
    const { goodsList } = this.props;
    const pagination = {
      total: goodsList.total,
      pageSize: pageSize,
      onChange: (page) => {
        this.setState({
          current: page,
          loadingList: true,
        })
        this.props.dispatch({
          type: 'good/getGoods',
          payload: {
            page: page,
            pageSize: pageSize,
          }
        }).then(() => {
          this.setState({ loadingList: false })
        }).catch((err) => {
          this.setState({ loadingList: false })
        })
      },
    };

    return (
      <div>
        <Table className="manageGoods"
          rowKey={record => record.id}
          loading={this.state.loadingList}
          columns={columns} dataSource={goodsList.list} pagination={pagination} />
        {/*编辑商品模态框*/}
        <EditGoods
          name={this.state.editedName}
          price={this.state.editedPrice}
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