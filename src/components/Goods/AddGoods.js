import React from 'react';
import { connect } from 'dva';
import { Select, List, Input, Button, Upload, Icon, Switch } from 'antd';
import '../style.less'

const Option = Select.Option;

class AddGoods extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
      categoryId: -1,
      name: '',
      price: 0,
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
  save() {
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
    })
  }
  render(){
    const previewFileList = [];
    const detailFileList = [];
    const previewProps = {
      action: 'http://www.babyshop.com/api/preview/',
      listType: 'picture',
      name: 'previews',
      defaultFileList: [...previewFileList],
      onChange: ({file, fileList, event})=> {
        console.log(file)
        if(file.response && file.response.code === 200) {
          this.state.preview.push(file.response.data.fileName);
          this.setState({preview: this.state.preview});
        }
      }
    };
    const detailProps = {
      action: 'http://www.babyshop.com/api/detail/',
      listType: 'picture',
      name: 'details',
      defaultFileList: [...detailFileList],
      onChange: ({file, fileList, event})=> {
        if(file.response && file.response.code === 200) {
          this.state.detail.push(file.response.data.fileName);
          this.setState({detail: this.state.detail});
        }
      }
    };
    const data = [
      <div className="input">
        <div className="title">所属分类</div>
        <Select style={{ width: 260 }} 
          onChange={(value)=> this.setState({categoryId:value})}>
          {
            this.props.categoryList.list.map((category)=> {
              return <Option key={category.id} value={category.id}>{category.name}</Option>
            })
          }
        </Select>
      </div>,
      <div className="input" style={{padding:'5px 20px'}}>
        <div className="title">商品名称：</div>
        <Input onChange={(e)=> this.setState({name: e.target.value})} />
        <div className="title" style={{paddingLeft:50}}>商品价格：</div>
          <Input onChange={(e)=> this.setState({price: e.target.value})}/>
      </div>,
      <div className="input" style={{padding:'5px 20px'}}>
          <div className="title">热卖商品：</div>
          <Switch style={{position:'relative',top:5}} onChange={(bool)=> this.setState({isHot: bool})}/>
          <div className="title" style={{paddingLeft:50}}>店主推荐：</div>
          <Switch style={{position:'relative',top:5}} onChange={(bool)=> this.setState({isRecomment: bool})}/>
      </div>,
      <div className="input" style={{padding:'5px 20px'}}>
        <div className="title">商品属性：</div>
        {
          this.state.value === "奶粉辅食" ? 
          <div>
            <ul className="goodsproperty">
              <li><span>商品名称：</span><Input /></li>
              <li><span>奶粉阶段：</span><Input /></li>
              <li><span>适用年龄：</span><Input /></li>
              <li><span>规格：</span><Input /></li>
              <li><span>产地：</span><Input /></li>
              <li><span>奶粉类型：</span><Input /></li>
            </ul>
          </div> 
          : 
          <div style={{position:'relative',top:6}}>无</div>
        }
      </div>,
      <div className="input" style={{padding:'5px 20px'}}>
        <div className="title">商品预览图：</div>
          <Upload {...previewProps}>
            <Button>
              <Icon type="upload" /> upload
            </Button>
          </Upload>
        <div className="title" style={{paddingLeft:120}}>商品详情图：</div>
        <Upload {...detailProps}>
          <Button>
            <Icon type="upload" /> upload
          </Button>
        </Upload>
      </div>,
      <Button type="primary" className="save" onClick={()=> this.save()}>保存</Button>
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

function mapStateToProps(_) {
  return {
    categoryList: _.category.categoryList
  }
}

export default connect(mapStateToProps)(AddGoods);


