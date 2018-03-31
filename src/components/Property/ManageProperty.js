import React from 'react';
import { connect } from 'dva';
import { Select, List, Input, Button, Popconfirm, message } from 'antd';
import '../style.less'

const Option = Select.Option;

class ManageProperty extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categoryId: '',
    }
  }
  confirm = () => {
    message.success('点击了确定');
  }
  render() {
    const data = [
      <div className="input">
        <div className="title">所属分类：</div>
        <Select style={{ width: 260 }}
          onChange={(value) => { this.setState({ categoryId: value }) }}>
          {
            this.props.categoryList.list.map((category) => {
              return <Option key={category.id} value={category.id}>{category.name}</Option>
            })
          }
        </Select>
      </div>,
      <div className="property">
        <div className="title"><span>属性id_01：</span><Input defaultValue="默认" />
          <Popconfirm title="确定要删除这个属性吗？" onConfirm={this.confirm}>
            <a className="delete">删除</a>
          </Popconfirm>
        </div>
      </div>,
      <Button type="primary" className="save">保存属性</Button>


    ];
    return (
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

export default connect((state) => {
  return {
    categoryList: state.category.categoryList
  }
})(ManageProperty);


