import React from 'react';
import { connect } from 'dva';
import { Modal, Select, List, Input, Button, Upload, Icon, Switch } from 'antd';
import '../style.less';

const Option = Select.Option;

class EditGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: '',
      preview: [],
      detail: []
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'category/GetCategory'
    })
  }
  render() {
    const previewFileList = [];
    const detailFileList = [];
    const previewProps = {
      action: 'http://www.babyshop.com/api/preview/',
      listType: 'picture',
      name: 'previews',
      defaultFileList: [...previewFileList],
      onChange: ({ file, fileList, event }) => {
        // console.log(file)
        if (file.response && file.response.code === 200) {
          this.state.preview.push(file.response.data.fileName);
          this.setState({ preview: this.state.preview });
        }
      }
    };

    const detailProps = {
      action: 'http://www.babyshop.com/api/detail/',
      listType: 'picture',
      name: 'details',
      defaultFileList: [...detailFileList],
      onChange: ({ file, fileList, event }) => {
        if (file.response && file.response.code === 200) {
          this.state.detail.push(file.response.data.fileName);
          this.setState({ detail: this.state.detail });
        }
      }
    };
    const data = [
      <div className="input">
        <div className="title">所属分类</div>
        <Select style={{ width: 260 }}
          onChange={(value) => this.setState({ categoryId: value })}>
           {
            this.props.categoryList.list.map((category) => {
              return <Option key={category.id} value={category.id}>{category.name}</Option>
            })
          }
        </Select>
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">商品名称：</div>
        <Input value={this.props.name} />
        <div className="title" style={{ paddingLeft: 50 }}>商品价格：</div>
        <Input value={this.props.price} />
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">热卖商品：</div>
        <Switch  style={{ position: 'relative', top: 5 }} />
        <div className="title" style={{ paddingLeft: 50 }}>店主推荐：</div>
        <Switch  style={{ position: 'relative', top: 5 }} />
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">商品属性：</div>
        {/* <ul className="goodsproperty">
          <li><span>商品名称：</span><Input /></li>
          <li><span>奶粉阶段：</span><Input /></li>
          <li><span>适用年龄：</span><Input /></li>
          <li><span>规格：</span><Input /></li>
          <li><span>产地：</span><Input /></li>
          <li><span>奶粉类型：</span><Input /></li>
        </ul> */}
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">商品预览图：</div>
        <Upload {...previewProps}>
          <Button>
            <Icon type="upload" /> upload
              </Button>
        </Upload>
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">商品详情图：</div>
        <Upload {...detailProps}>
          <Button>
            <Icon type="upload" /> upload
            </Button>
        </Upload>
      </div>,
      <div className="saveGoods">
        <Button type="primary" className="save">保存</Button>
      </div>
    ];
    return (
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

export default connect((state) => {
  return {
    categoryList: state.category.categoryList
  }
})(EditGoods);


