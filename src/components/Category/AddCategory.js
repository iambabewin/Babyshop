import React from 'react';
import { connect } from 'dva';
import { Select, List, Input, Button } from 'antd';
import '../style.less'

const Option = Select.Option;

class AddCategory extends React.Component {
  render(){
    const data = [
      <div className="input">
        <div className="title">分类名称：</div>
        <Input />
      </div>,
      <Button type="primary" className="save">保存</Button>


    ];
    return(
      <div className="addCategory">
        <div className="box">
            <List
              size="large"
              header={<div><span className="circle"></span>添加商品分类</div>}
              dataSource={data}
              renderItem={item => (
              <List.Item>{item}</List.Item>)}
            />
        </div>
      </div>
    )
  }
}

export default AddCategory;


