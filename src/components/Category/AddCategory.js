import React from 'react';
import { connect } from 'dva';
import { Select, List, Input, Button } from 'antd';
import '../style.less'
import category from '../../models/category';

const Option = Select.Option;

class AddCategory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categoryName: '',
    }
  }
  addCategory = () => {
    this.props.dispatch({
      type:'category/AddCategory',
      payload:{
        name: this.state.categoryName,
      }
  }).then(()=>{
    this.onClean()
  })
  }
  onClean = () => {
    this.setState({
      categoryName:'',
    })
  }
  render(){
    const { categoryName } = this.state;
    const data = [
      <div className="input">
        <div className="title">分类名称：</div>
        <Input value={categoryName} onChange={(e) => this.setState({categoryName: e.target.value})}/>
      </div>,
      <Button type="primary" className="save" onClick={this.addCategory}>保存</Button>


    ];
    return(
      <div className="addCategory">
        <div className="box">
            <List
              size="large"
              header={<div><span className="circle"></span>添加商品分类</div>}
              dataSource={data}
              renderItem={item => (
              <List.Item>{item}</List.Item>)}
            />
        </div>
      </div>
    )
  }
}

export default connect((state)=>{
  return{
    categoryList:state.category.categoryList
  }
})(AddCategory);

