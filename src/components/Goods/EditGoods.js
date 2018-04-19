import React from 'react';
import { connect } from 'dva';
import { Modal, Select, List, Input, Button, Upload, Icon, Switch, message } from 'antd';
import '../style.less';

const Option = Select.Option;

class EditGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'category/GetCategory'
    })
  }

  render() {
    const { editedGood } = this.props;
    
    const previewProps = {
      action: 'http://www.babyshop.com/api/preview/',
      listType: 'picture',
      name: 'previews',
      fileList: editedGood.preview,
      onChange: ({ file, fileList, event }) => {
        this.props.setState({editedGood: Object.assign(editedGood, {preview: fileList})});
        if (file.response && file.response.code === 200) {
          editedGood.preview[editedGood.preview.length - 1].newName = file.response.data.fileName;
          this.props.setState({ 
            editedGood
           });
        } else if(file.response && file.response.data && file.response.data.code && file.response.data.code !== 200) {
          message.error('上传失败');
        }
      }
    };

    const detailProps = {
      action: 'http://www.babyshop.com/api/detail/',
      listType: 'picture',
      name: 'details',
      fileList: editedGood.detail,
      onChange: ({ file, fileList, event }) => {
        this.props.setState({editedGood: Object.assign(editedGood, {detail: fileList})});
        if (file.response && file.response.code === 200) {
          editedGood.detail[editedGood.detail.length - 1].newName = file.response.data.fileName;
          this.props.setState({ 
            editedGood
           });
        } else if(file.response && file.response.data && file.response.data.code && file.response.data.code !== 200) {
          message.error('上传失败');
        }
      }
    };
    const data = [
      <div className="input">
        <div className="title">所属分类</div>
        <Select style={{ width: 260 }}
          value={editedGood.categoryId}
          onChange={(value) => this.props.setState({ editedGood: Object.assign(editedGood, {categoryId: value}) })}>
          {
            this.props.categoryList.list.map((category) => {
              return <Option key={category.id} value={category.id}>{category.name}</Option>
            })
          }
        </Select>
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">商品名称：</div>
        <Input value={editedGood.name} onChange={(e)=> this.props.setState({ editedGood: Object.assign(editedGood, {name: e.target.value}) })}/>
        <div className="title" style={{ paddingLeft: 50 }}>商品价格：</div>
        <Input value={editedGood.price} onChange={(e)=> this.props.setState({ editedGood: Object.assign(editedGood, {price: e.target.value}) })}/>
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">热卖商品：</div>
        <Switch 
        style={{ position: 'relative', top: 5 }} 
        checked={editedGood.isHot} 
        onChange={(v) => this.props.setState({ editedGood: Object.assign(editedGood, {isHot: v}) })} />
        <div className="title" style={{ paddingLeft: 50 }}>店主推荐：</div>
        <Switch 
        style={{ position: 'relative', top: 5 }} 
        checked={editedGood.isRecomment} 
        onChange={(v) => this.props.setState({ editedGood: Object.assign(editedGood, {isRecomment: v}) })} />
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">商品属性：</div>
        {
          (() => {
            const category = this.props.categoryList.list.filter((category) => category.id === editedGood.categoryId)[0] || { property: '' };

            return category.property ? category.property.split(',').map((prop, i) => {
              return (
                <li style={{ paddingRight: 10 }} key={prop}>
                  <span>{prop}:</span>
                  <Input 
                  onChange={(e)=> {
                    editedGood.propertys[i] = e.target.value;
                    this.props.setState({ editedGood: Object.assign(editedGood, {propertys: editedGood.propertys}) })
                  }}
                  value={editedGood.propertys[i]}
                  />
                </li>
              )
            }) : null
          })()

        }
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
        <Button type="primary" className="save" onClick={this.props.handleOk}>保存</Button>
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


