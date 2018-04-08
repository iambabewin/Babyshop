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
      detail: [],
      isHot: false,
      isRecomment: false,
      propertys: []
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'category/GetCategory'
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({
        categoryId: nextProps.editGood.categoryId,
        isHot: nextProps.editGood.hot,
        isRecomment: nextProps.editGood.recomment,
        categoryId: nextProps.editGood.categoryId,
      })
      console.log(nextProps.editGood)
    }
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
          value={this.state.categoryId}
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
        <Switch style={{ position: 'relative', top: 5 }} checked={this.state.isHot} onChange={(v)=> this.setState({isHot: v})} />
        <div className="title" style={{ paddingLeft: 50 }}>店主推荐：</div>
        <Switch style={{ position: 'relative', top: 5 }} checkd={this.state.isRecomment} onChange={(v)=> this.setState({isRecomment: v})}/>
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">商品属性：</div>
        {
          (() => {
            const category = this.props.categoryList.list.filter((category) => category.id === this.state.categoryId)[0] || { property: '' };
            return category.property ? category.property.split(',').map((prop, i) => {
              return (<li style={{ paddingRight: 10 }}>
                <span>{prop}:</span>
                <Input value={this.state.propertys[i]} onChange={(e)=> {
                  this.state.propertys[i] = e.target.value;
                  this.setState({propertys: this.state.propertys});
                }} />
              </li>)
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


