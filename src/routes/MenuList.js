import React from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Router, Route ,Link} from 'dva/router';


const SubMenu = Menu.SubMenu;
class MenuList extends React.Component {
  state = {
    current: '1',
  }
  handleClick = (e) => {
    //console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Menu
        theme="light"
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultOpenKeys={['商品设置']}
        defaultSelectedKeys={['添加商品']}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <SubMenu key="商品设置" title={<span><Icon type="bars" /><span>商品设置</span></span>}>
          <Menu.Item key="添加商品"><Link to="/addGoods">添加商品</Link></Menu.Item>
          <Menu.Item key="管理商品"><Link to="/manageGoods">管理商品</Link></Menu.Item>
        </SubMenu>      
        <SubMenu key="商品分类" title={<span><Icon type="appstore-o" /><span>商品分类</span></span>}>
          <Menu.Item key="添加分类"><Link to="/addCategory" >添加分类</Link></Menu.Item>
          <Menu.Item key="管理分类" ><Link to="/manageCategory">管理分类</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="商品属性" title={<span><Icon type="calculator" /><span>商品属性</span></span>}>
          <Menu.Item key="管理属性"><Link to="/addProperty">管理属性</Link></Menu.Item>
        </SubMenu>
        
        <SubMenu key="销售订单" title={<span><Icon type="copy" /><span>销售订单</span></span>}>
          <Menu.Item key="订单管理"><Link to="/countOrders">订单管理</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default MenuList;

