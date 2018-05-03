import React from 'react';
import { Table, Icon, Select, Modal, Button  } from 'antd';
import { connect } from 'dva';
import OrderDetail from './OrderDetail';

const Option = Select.Option;

class CountOrders extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
    }
  }

  
  componentDidMount() {
    this.props.dispatch({
      type: 'order/fetch',
      payload: {
        
      }
    });
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
        let totalPirce = 0;
        record.goodList.map((good)=> totalPirce += good.num * good.price);
        
        return totalPirce;
      },
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '下单时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '订单明细',
      key: 'detail',
      render: (text, record) => (
        <div>
          <a onClick={this.showModal}>明细</a>
        </div>
      ),
    }, {
      title: '发货状态',
      key: 'deliverstatus',
      render: (text, record) => (
          <Button type="primary" style={{fontSize:14}}>发货</Button>
      ),
    }];
    
    const data = [{
      key: '1',      
      orderid: '201804191111110123',
      user: '李宛萦',
      totalprice:'316',
      status:'已付款',        
      time:'2018-4-10 09:22:08',
    }];

    const pagination = {
      total: this.props.orderListInfo.total,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        console.log('Current: ', current);
      },
    };

    const { orderListInfo } = this.props;
    console.log(orderListInfo);
    return (
      <div>
        <Table columns={columns} dataSource={orderListInfo.list} pagination={pagination}/>
        {/*订单明细模态框*/}
        <OrderDetail 
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
