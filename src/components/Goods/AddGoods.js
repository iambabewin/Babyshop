import React from 'react';
import { connect } from 'dva';
import { Select, List, Input, Button, Upload, Icon } from 'antd';
import '../style.less'

const Option = Select.Option;

class AddGoods extends React.Component {
  render(){
    const fileList = [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'http://img.boodoll.cn/pdt/img/b1/f500c8a4cccc49b8_380X380.jpg',
      thumbUrl: 'http://img.boodoll.cn/pdt/img/b1/f500c8a4cccc49b8_380X380.jpg',
    }];
    const props = {
      action: 'http://www.babyshop.com/api/preview/',
      listType: 'picture',
      name: 'previews',
      defaultFileList: [...fileList],
    };
    const data = [
      <div className="input">
        <div className="title">所属分类</div>
        <Select defaultValue="默认为顶级分类" style={{ width: 260 }}>
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
      <div className="title">商品相册：</div>
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


