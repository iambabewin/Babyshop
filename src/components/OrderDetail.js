import React from 'react';
import { connect } from 'dva';
import { Modal, Input, Table  } from 'antd';
import './style.less';

class OrderDetail extends React.Component {
  
  render(){
    const { address, goodList } = this.props.order;
    
    const columns = [{
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '商品数量',
      dataIndex: 'num',
      key: 'num',
    },{
      title: '收货人',
      key: 'receiver',
      render: ()=> address.name,
    },{
      title: '收货地址',
      key: 'address',
      render: ()=> `${address.province} ${address.city} ${address.county} ${address.detail}`,
    }];
    return(
        <Modal
            width={1000}
            mask={true}
            title="订单详情"
            visible={this.props.visible}
            onOk={this.props.handleOk}
            onCancel={this.props.handleCancel}
        >
            <Table columns={columns} dataSource={goodList} size="small" 
            pagination={false}
            />
        </Modal>
    )
  }
}

export default OrderDetail;


