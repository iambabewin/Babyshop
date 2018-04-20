import React from 'react';
import { connect } from 'dva';
import { Modal, Input, Table  } from 'antd';
import './style.less';

class OrderDetail extends React.Component {
  render(){
    const columns = [{
      title: '商品名称',
      dataIndex: 'goodsname',
      key: 'goodsname',
    }, {
      title: '商品价格',
      dataIndex: 'goodsprice',
      key: 'goodsprice',
    }, {
      title: '商品数量',
      dataIndex: 'goodsnum',
      key: 'goodsnum',
    },{
      title: '收货人',
      dataIndex: 'receiver',
      key: 'receiver',
    },{
      title: '收货地址',
      dataIndex: 'address',
      key: 'address',
    }];
    const data = [{
      key: '1',
      goodsname: '惠氏S-26铂臻健儿乐2段（6-12月）800g',
      goodsprice:'258',
      goodsnum:'1',
      receiver: '李宛萦',
      address: '广东省东莞市松山湖东莞理工学院'
    },{
      key: '1',
      goodsname: '美国香蕉宝宝Baby Banana 婴儿香蕉牙胶 硅胶磨牙棒咬胶',
      goodsprice:'58',
      goodsnum:'1',
      receiver: '李宛萦',
      address: '广东省东莞市松山湖东莞理工学院'
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
            <Table columns={columns} dataSource={data} size="small" 
            pagination={false}
            />
        </Modal>
    )
  }
}

export default OrderDetail;


