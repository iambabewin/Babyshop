import React from 'react';
import { connect } from 'dva';
import { Select, List, Input, Button, Popconfirm, message } from 'antd';
import '../style.less'

const Option = Select.Option;

class ManageProperty extends React.Component {
  confirm = () => {
    message.success('点击了确定');
  }
  
   cancel = () => {
    message.error('点击了取消');
  }
  render(){
    const data = [
      <div className="input">
        <div className="title">所属分类：</div>
        <Select defaultValue="请选择分类" style={{ width: 260 }}>
          <Option value="奶粉辅食">奶粉辅食</Option>
          <Option value="纸尿裤湿巾">纸尿裤湿巾</Option>
          <Option value="洗护用品">洗护用品</Option>
          <Option value="童车座椅">童车座椅</Option>
          <Option value="玩具">玩具</Option>
        </Select>
      </div>,
      <div className="property">
        <div className="title"><span>属性id_01：</span><Input defaultValue="默认"/>
        <Popconfirm title="确定要删除这个属性吗？" onConfirm={this.confirm} onCancel={this.cancel}>
            <a className="delete">删除</a>
          </Popconfirm>
        </div>
      </div>,
      <Button type="primary" className="save">保存属性</Button>


    ];
    return(
      <div className="addCategory">
        <div className="box">
            <List
              size="large"
              header={<div><span className="circle"></span>管理商品属性</div>}
              dataSource={data}
              renderItem={item => (
              <List.Item>{item}</List.Item>)}
            />
        </div>
      </div>
    )
  }
}

export default ManageProperty;


