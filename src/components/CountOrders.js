import React from 'react';
import { Table, Icon, Select, Modal, Button  } from 'antd';
import OrderDetail from './OrderDetail';

const Option = Select.Option;

class CountOrders extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
    }
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
      dataIndex: 'orderid',
      key: 'orderid',
    }, {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
    }, {
      title: '总金额',
      dataIndex: 'totalprice',
      key: 'totalprice',
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

export default CountOrders;
