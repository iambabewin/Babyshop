import React from 'react';
import { connect } from 'dva';
import { Select, List, Input, Button, Upload, Icon } from 'antd';
import '../style.less'

const Option = Select.Option;

class AddGoods extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
    }
  }
  render(){
    const fileList = [{
      uid: -1,
      name: '',
      status: 'done',
      url: '',
      thumbUrl: '',
    }];
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [...fileList],
    };
    const data = [
      <div className="input">
        <div className="title">所属分类</div>
        <Select defaultValue="默认为顶级分类" style={{ width: 260 }} 
          onChange={(value)=> this.setState({value:value})}>
          <Option value="奶粉辅食">奶粉辅食</Option>
          <Option value="纸尿裤湿巾">纸尿裤湿巾</Option>
          <Option value="洗护用品">洗护用品</Option>
          <Option value="童车座椅">童车座椅</Option>
          <Option value="玩具">玩具</Option>
        </Select>
      </div>,
      <div className="input" style={{padding:'5px 20px'}}>
        <div className="title">商品名称：</div>
        <Input />
      </div>,
      <div className="input" style={{padding:'5px 20px'}}>
        <div className="title">商品价格：</div>
          <Input />
      </div>,
      <div className="input" style={{padding:'5px 20px'}}>
        <div className="title">商品属性：</div>
        {
          this.state.value === "奶粉辅食" ? 
          <div>
            <ul className="goodsproperty">
              <li><span>商品名称:</span><Input /></li>
              <li><span>奶粉阶段:</span><Input /></li>
              <li><span>适用年龄:</span><Input /></li>
              <li><span>规格:</span><Input /></li>
              <li><span>产地:</span><Input /></li>
              <li><span>奶粉类型:</span><Input /></li>
            </ul>
          </div> 
          : 
          <div style={{position:'relative',top:6}}>无</div>
        }
      </div>,
      <div className="input" style={{padding:'5px 20px'}}>
        <div className="title">商品预览图：</div>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> upload
            </Button>
          </Upload>
      </div>,
      <div className="input" style={{padding:'5px 20px'}}>
        <div className="title">商品详情图：</div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> upload
          </Button>
        </Upload>
      </div>,
      <Button type="primary" className="save">保存</Button>
    ];
    return(
      <div className="addCategory">
        <div className="box">
            <List
              size="large"
              header={<div><span className="circle"></span>添加商品</div>}
              dataSource={data}
              renderItem={item => (
              <List.Item>{item}</List.Item>)}
            />
        </div>
      </div>
    )
  }
}

export default AddGoods;


