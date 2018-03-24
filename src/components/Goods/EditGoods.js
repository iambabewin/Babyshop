import React from 'react';
import { connect } from 'dva';
import { Modal, Select, List, Input, Button, Upload, Icon } from 'antd';
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
        </div>,
        <div className="input" style={{padding:'5px 20px'}}>
          <div className="title">商品价格：</div>
            <Input defaultValue="338.00"/>
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
        <Modal
            width={800}
            mask={true}
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


