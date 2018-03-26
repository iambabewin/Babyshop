import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import MenuList from './MenuList';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Router, Route ,Link, Redirect } from 'dva/router';

import AddGoods from '../components/Goods/AddGoods';
import ManageGoods from '../components/Goods/ManageGoods';
import AddCategory from '../components/Category/AddCategory';
import ManageCategory from '../components/Category/ManageCategory';
import AddProperty from '../components/Property/AddProperty';
import ManageProperty from '../components/Property/ManageProperty';
import CountOrders from '../components/CountOrders';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class IndexPage extends React.Component {
  render(){
    return (
        <Layout>
            <Header className="header">
                BabyShop母婴商城后台管理系统
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb>
                <Breadcrumb.Item> 
                   管理员：<span className="admin">Win</span>
                        欢迎您！
                    <a>[安全退出]</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <Sider width={256} style={{ background: '#fff' }}>
                    <MenuList />
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Route path="/addGoods" component={AddGoods} />
                    <Route path="/manageGoods" component={ManageGoods} />
                    <Route path="/addCategory" component={AddCategory} />
                    <Route path="/manageCategory" component={ManageCategory} />
                    <Route path="/addProperty" component={AddProperty} />
                    <Route path="/manageProperty" component={ManageProperty} />
                    <Route path="/countOrders" component={CountOrders} />
                    {/* <Redirect from="/" to="/addGoods" /> */}
                </Content>
            </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                copyright ©2018 Win All Rights Reserved
            </Footer>
        </Layout>
    )
  }
}
export default connect()(IndexPage);
