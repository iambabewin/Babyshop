import React from 'react';
import { Table, Icon, Select, Modal, Button  } from 'antd';
import { connect } from 'dva';
import { date } from 'windlike-utils';
import OrderDetail from './OrderDetail';

const Option = Select.Option;
const STATUS = ['已付款', '已发货', '已完成'];
const formatDate = date.formatDate('yy-MM-dd hh:mm:ss');

class CountOrders extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      page: 1,
      pageSize: 10,
      selectedOrder: {
        address: {},
        goodList: [],
      }
    }
  }

  
  componentDidMount() {
    this.fetchOrderList(1, 10);
  }

  fetchOrderList = (page, pageSize)=> {
    this.props.dispatch({
      type: 'order/fetch',
      payload: {
        page,
        pageSize,
      }
    });
  }
  
  deliver = (order)=> {
    this.props.dispatch({
      type: 'order/deliver',
      payload: {
        id: order.id,
        status: 1,
      }
    }).then((data)=> {
      if(data.code === 200) {
        this.fetchOrderList(this.state.page, this.state.pageSize);
      }
    });
  }

  showModal = (e, order) => {
      this.setState({
        visible: true,
        selectedOrder: order,
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
      title: '订单id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '用户',
      dataIndex: 'address',
      key: 'address',
      render: (address)=> address ? address.name : '',
    }, {
      title: '总金额',
      render: (record)=> {
        let totalPrice = 0;
        record.goodList.map((good)=> totalPrice += good.num * good.price);
        
        return totalPrice.toLocaleString(
          'zh', 
          { style: 'currency', currency: 'cny', minimumFractionDigits: 2 }
        );
      },
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (status)=> STATUS[status]
    }, {
      title: '下单时间',
      dataIndex: 'time',
      key: 'time',
      render: (time)=> formatDate(time*1000),
    }, {
      title: '订单明细',
      key: 'detail',
      render: (text, record) => (
        <div>
          <a onClick={(e)=> this.showModal(e, record)}>明细</a>
        </div>
      ),
    }, {
      title: '发货状态',
      key: 'deliverstatus',
      render: (text, record) => 
        record.status == 0 ? <Button 
        type="primary" 
        style={{fontSize:14}} 
        onClick={()=> this.deliver(record)}
        >发货</Button>
       : <span>已发货</span>
    }];
    const pagination = {
      total: this.props.orderListInfo.total,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize)=> {
        this.setState({
          page: current,
          pageSize,
        });
        this.fetchOrderList(current, pageSize);        
      },
      onChange: (current, pageSize)=> {
        this.setState({
          page: current,
          pageSize,
        });
        this.fetchOrderList(current, pageSize);
      },
    };

    const { orderListInfo } = this.props;
    
    return (
      <div>
        <Table columns={columns} dataSource={orderListInfo.list} pagination={pagination}/>
        {/*订单明细模态框*/}
        <OrderDetail 
          order={this.state.selectedOrder}
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>
      
    );
  }
}

export default connect((_)=> {
  return {
    orderListInfo: _.order.orderListInfo
  }
})(CountOrders);
