import React from 'react';
import { connect } from 'dva';
import { Modal, Input } from 'antd';
import '../style.less'

class CategoryModal extends React.Component {
  render(){
    return(
        <Modal
            className="categoryModal"
            width={450}
            mask={true}
            title="修改分类"
            visible={this.props.visible}
            onOk={this.props.handleOk}
            onCancel={this.props.handleCancel}
        >
            <div className="input">
                <div className="title">分类名称：(修改前)</div>
                <Input defaultValue="奶粉辅食"/>
            </div>
            <div className="input">
                <div className="title">分类名称修改为：</div>
                <Input />
            </div>
        </Modal>
    )
  }
}

export default CategoryModal;


