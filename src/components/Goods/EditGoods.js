import React from 'react';
import { connect } from 'dva';
import { Modal, Select, List, Input, Button, Upload, Icon, Switch } from 'antd';
import '../style.less';

const Option = Select.Option;

class EditGoods extends React.Component {
  render(){
    const fileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'http://img.boodoll.cn/pdt/img/v0/b28c70eeed65e6ca_380X380.jpg',
        thumbUrl: 'http://img.boodoll.cn/pdt/img/v0/b28c70eeed65e6ca_380X380.jpg',
      }];
      const props = {
        action: '//jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
        defaultFileList: [...fileList],
      };
      const data = [
        <div className="input">
          <div className="title">所属分类</div>
          <Select defaultValue="纸尿裤湿巾" style={{ width: 260 }}>
            <Option value="奶粉辅食">奶粉辅食</Option>
            <Option value="纸尿裤湿巾">纸尿裤湿巾</Option>
            <Option value="洗护用品">洗护用品</Option>
            <Option value="童车座椅">童车座椅</Option>
            <Option value="玩具">玩具</Option>
          </Select>
        </div>,
        <div className="input" style={{padding:'5px 20px'}}>
          <div className="title">商品名称：</div>
          <Input defaultValue="Moony婴儿纸尿裤L54片"/>
          <div className="title" style={{paddingLeft:50}}>商品价格：</div>
            <Input defaultValue="338.00"/>
        </div>,
        <div className="input" style={{padding:'5px 20px'}}>
          <div className="title">热卖商品：</div>
          <Switch defaultChecked style={{position:'relative',top:5}} />
          <div className="title" style={{paddingLeft:50}}>店主推荐：</div>
          <Switch defaultChecked style={{position:'relative',top:5}} />
        </div>,
         <div className="input" style={{padding:'5px 20px'}}>
         <div className="title">商品属性：</div>
             <ul className="goodsproperty">
               <li><span>商品名称：</span><Input /></li>
               <li><span>奶粉阶段：</span><Input /></li>
               <li><span>适用年龄：</span><Input /></li>
               <li><span>规格：</span><Input /></li>
               <li><span>产地：</span><Input /></li>
               <li><span>奶粉类型：</span><Input /></li>
             </ul>
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
        <div className="saveGoods">
          <Button type="primary" className="save">保存</Button>
        </div>
      ];
    return(
        <Modal
            width={800}
            mask={true}
            footer={false}
            title="编辑商品"
            visible={this.props.visible}
            onOk={this.props.handleOk}
            onCancel={this.props.handleCancel}
        >
           <div className="addCategory">
                <div className="box">
                    <List
                    size="small"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>{item}</List.Item>)}
                    />
                </div>
            </div>
        </Modal>
    )
  }
}

export default EditGoods;


