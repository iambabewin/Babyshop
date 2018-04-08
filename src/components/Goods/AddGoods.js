import React from 'react';
import { connect } from 'dva';
import { Select, List, Input, Button, Upload, Icon, Switch } from 'antd';
import '../style.less'

const Option = Select.Option;

class AddGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      categoryId: '',
      name: '',
      price: '',
      isHot: false,
      isRecomment: false,
      preview: [],
      detail: []
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'category/GetCategory'
    })
  }
  save = () => {
    const { categoryId, name, price, isHot, isRecomment, preview, detail } = this.state;
    this.props.dispatch({
      type: 'good/addGood',
      payload: {
        int_categoryId: categoryId,
        name,
        float_price: price,
        bool_hot: isHot,
        bool_recomment: isRecomment,
        preview: preview.join(','),
        detail: detail.join(','),
      }
    }).then((code) => {
      if(code === 200){
        this.onClean()
      }
    })
  }
  onClean = () => {
    this.setState({
      value: '',
      categoryId: '',
      name: '',
      price: '',
      isHot: false,
      isRecomment: false,
      preview: [],
      detail: []
    })
  }
  render() {
    const previewFileList = [];
    const detailFileList = [];
    const { categoryId, name, price, isHot, isRecomment, preview, detail } = this.state;
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
          value={categoryId}
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
        <Input value={name} onChange={(e) => this.setState({ name: e.target.value })} />
        <div className="title" style={{ paddingLeft: 50 }}>商品价格：</div>
        <Input value={price} onChange={(e) => this.setState({ price: e.target.value })} />
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">热卖商品：</div>
        <Switch style={{ position: 'relative', top: 5 }} checked={isHot}
          onChange={(bool) => this.setState({ isHot: bool })} />
        <div className="title" style={{ paddingLeft: 50 }}>店主推荐：</div>
        <Switch style={{ position: 'relative', top: 5 }} checked={isRecomment}
          onChange={(bool) => this.setState({ isRecomment: bool })} />
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">商品属性：</div>
        <ul className="goodsproperty">
          {
            (()=> {
              const category = this.props.categoryList.list.filter((category)=> category.id === this.state.categoryId)[0] || {property: ''};
              return category.property ? category.property.split(',').map((prop)=> {
                return (<li><span>{prop}:</span><Input /></li>)
              }) : null
            })()
            
          }
        </ul>
      </div>,
      <div className="input" style={{ padding: '5px 20px' }}>
        <div className="title">商品预览图：</div>
        <Upload {...previewProps}>
          <Button>
            <Icon type="upload" /> upload
            </Button>
        </Upload>
        <div className="title" style={{ paddingLeft: 120 }}>商品详情图：</div>
        <Upload {...detailProps}>
          <Button>
            <Icon type="upload" /> upload
          </Button>
        </Upload>
      </div>,
      <Button type="primary" className="save" onClick={this.save}>保存</Button>
    ];
    return (
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

export default connect((state) => {
  return {
    categoryList: state.category.categoryList
  }
})(AddGoods);
