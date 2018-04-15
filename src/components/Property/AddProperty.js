import React from 'react';
import { connect } from 'dva';
import { Select, List, Input, Button, Icon } from 'antd';
import '../style.less'

const Option = Select.Option;

class AddProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertys: [''],
      categoryId: '',
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'category/GetCategory'
    })
  }
  onClickAdd = () => {
    const { propertys } = this.state;
    propertys.push('');
    this.setState({ propertys });
  }
  onClickDel = (i) => {
    const { propertys } = this.state;
    propertys.splice(i, 1);
    this.setState({ propertys });
  }
  inputChange = (e, i) => {
    console.log(e.target.value, i)
    const { propertys } = this.state;
    propertys[i] = e.target.value;
    this.setState({ propertys });
  }
  render() {
    const data = [
      <div className="input">
        <div className="title">商品分类：</div>
        <Select style={{ width: 260 }}
          onChange={(value) => { this.setState({ categoryId: value }) }}>
          {
            this.props.categoryList.list.map((category) => {
              return <Option key={category.id} value={category.id}>{category.name}</Option>
            })
          }
        </Select>
      </div>,
      <div className="input">
        <div className="title">属性名称：</div>
        <div className="addProperty">
          {
            this.state.propertys.map((property, i) => {
              if (this.state.propertys.length === 1) {
                return (
                  <div className="clickicon">
                    <Input value={property} onChange={(e) => this.inputChange(e, i)} />
                    <Icon type="plus-circle-o" className="icon" onClick={this.onClickAdd} />
                  </div>
                )
              } else {
                if (i === this.state.propertys.length - 1) {
                  return <div className="clickicon">
                    <Input value={property} onChange={(e) => this.inputChange(e, i)} />
                    <Icon type="plus-circle-o" className="icon" onClick={this.onClickAdd} />
                    <Icon type="minus-circle-o" className="icon-red" onClick={() => this.onClickDel(i)} />
                  </div>
                } else {
                  return <div className="clickicon">
                    <Input value={property} onChange={(e) => this.inputChange(e, i)} />
                    <Icon type="minus-circle-o" className="icon-red" onClick={() => this.onClickDel(i)} />
                  </div>
                }
              }
            })
          }

        </div>
      </div>,
      <Button type="primary" className="save">保存</Button>


    ];
    return (
      <div className="addCategory">
        <div className="box">
          <List
            size="large"
            header={<div><span className="circle"></span>添加商品属性</div>}
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
})(AddProperty);


