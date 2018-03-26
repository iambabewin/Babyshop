import React from 'react';
import { Table, Icon, Select, Modal  } from 'antd';
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
      key: 'orderstatus',
      render: (text, record) => (
        <Select defaultValue="已提交" style={{ width: 90 }}>
          <Option value="已提交">已提交</Option>
          <Option value="已作废" disabled>已作废</Option>
        </Select>
      ),
    }, {
      title: '支付状态',
      key: 'paystatus',
      render: (text, record) => (
        <Select defaultValue="未付款" style={{ width: 90 }}>
          <Option value="未付款">未付款</Option>
          <Option value="已付款" disabled>已付款</Option>
        </Select>
      ),
    }, {
      title: '发货状态',
      key: 'deliverstatus',
      render: (text, record) => (
          <Select defaultValue="未发货" style={{ width: 90 }}>
            <Option value="未发货">未发货</Option>
            <Option value="已发货">已发货</Option>
          </Select>
      ),
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
    }];
    
    const data = [{
      key: '1',      
      orderid: '5gfds4g64f87dgfdhajh',
      user: '李萦萦',
      totalprice:'578.00',        
      time:'2018-3-1 08:08:08',
    }, {
      key: '2',      
      orderid: 'rgdfghhh656346',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '3',      
      orderid: '5345jljfzt43',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '4',      
      orderid: 'fjiorfge74343',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '5',     
      orderid: '43254gfdu98b',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '6',      
      orderid: '326terg90f9',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '7',      
      orderid: '5436hjogivfd',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '8',      
      orderid: '546fbfdbfgh',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '9',      
      orderid: '654gfgxzdfg',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '10',
      orderid: '5435vfhuihjfx',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '11',
      orderid: 'fertae455grg5643gf',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '12',
      orderid: 'fgrf87gwthj34',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '13',
      orderid: 'wet24i5u3896utreng',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '14',
      orderid: '3454ytrebfghs5ru',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-1 08:08:08',
    }, {
      key: '15',
      orderid: '463drgs',
      user: '李萦萦',
      totalprice:'578.00',
      time:'2018-3-8 08:08:08',
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
