import React from 'react';
import { Table, Icon, Select, Popconfirm, message   } from 'antd';
import EditGoods from './EditGoods'
import '../style.less'

const Option = Select.Option;

class ManageGoods extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
    }
  }

  showModal = (e) => {
      this.setState({
      visible: true,
      });
  }
  handleOk = (e) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  }

   confirm = () => {
    message.success('点击了确定');
  }
  
   cancel = () => {
    message.error('点击了取消');
  }

  render() {
    const columns = [{
      title: '商品编号',
      dataIndex: 'goodsid',
      key: 'goodsid',
    }, {
      title: '商品类型',
      dataIndex: 'goodstype',
      key: 'goodstype',
    }, {
      title: '商品名称',
      dataIndex: 'goodsname',
      key: 'goodsname',
    }, {
      title: '商品价格',
      dataIndex: 'goodsprice',
      key: 'goodsprice',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a onClick={this.showModal}>编辑</a>
          <Popconfirm title="确定要删除这个商品吗？" onConfirm={this.confirm} onCancel={this.cancel}>
            <a style={{color:'red',paddingLeft:5}}>删除</a>
          </Popconfirm>
        </div>
      ),
    }];
    
    const data = [{
      key: '1',
      goodsid: '1',
      goodstype: '纸尿裤湿巾',
      goodsname: 'Moony婴儿纸尿裤L54片',
      goodsprice:'338.00',
    }, {
      key: '2',
      goodsid: '2',
      goodstype: '纸尿裤湿巾',
      goodsname: '花王纸尿裤NB90片',
      goodsprice:'338.00',
    }, {
      key: '3',
      goodsid: '3',
      goodstype: '纸尿裤湿巾',
      goodsname: '丽贝乐婴儿纸尿裤大包装NB+88片',
      goodsprice:'338.00',
    }, {
      key: '4',
      goodsid: '4',
      goodstype: '奶粉辅食',
      goodsname: '惠氏S-26金装膳儿加GB新配方罐装900g',
      goodsprice:'338.00',
    }, {
      key: '5',
      goodsid: '5',
      goodstype: '奶粉辅食',
      goodsname: '美赞臣安婴儿A+亲舒1段乳蛋白部分水解婴儿配方粉850g',
      goodsprice:'338.00',
    }, {
      key: '6',
      goodsid: '6',
      goodstype: '洗护用品',
      goodsname: '贝亲婴儿沐浴露500ml',
      goodsprice:'65.00',
    }, {
      key: '7',
      goodsid: '7',
      goodstype: '洗护用品',
      goodsname: '御信堂婴儿紫草油25g',
      goodsprice:'25.00',
    }, {
      key: '8',
      goodsid: '8',
      goodstype: '童车座椅',
      goodsname: '凯利C-3高景观婴儿超轻便口袋车*卡其色',
      goodsprice:'1338.00',
    }, {
      key: '9',
      goodsid: '9',
      goodstype: '玩具',
      goodsname: '澳贝放心煮收纳盒装摇铃5pcs(463159)',
      goodsprice:'38.00',
    }, {
      key: '10',
      goodsid: '10',
      goodstype: '玩具',
      goodsname: '曼哈顿玩具 Manhattan Toy 牙胶固齿器可玩可咬手抓球',
      goodsprice:'38.00',
    }, {
      key: '11',
      goodsid: '11',
      goodstype: '玩具',
      goodsname: '澳贝蝴蝶牙',
      goodsprice:'38.00',
    }, {
      key: '12',
      goodsid: '12',
      goodstype: '玩具',
      goodsname: '美国香蕉宝宝Baby Banana 婴儿香蕉牙胶 硅胶磨牙棒咬胶',
      goodsprice:'88.00',
    }];

    const pagination = {
      total: data.length,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        console.log('Current: ', current);
      },
    };

    return (
      <div>
        <Table className="manageGoods"
          columns={columns} dataSource={data} pagination={pagination}/>
        {/*订单明细模态框*/}
        <EditGoods 
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default ManageGoods;

