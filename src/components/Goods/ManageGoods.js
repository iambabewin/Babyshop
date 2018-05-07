import React from 'react';
import { connect } from 'dva';
import { Table, Icon, Select, Popconfirm, message, Input } from 'antd';
import EditGoods from './EditGoods'
import '../style.less'
import { stat } from 'fs';

const Option = Select.Option;
const pageSize = 8;

class ManageGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      visible: false,
      current: 1,
      editedGood: {},
      search: '',
      selectedType: '',
    }
  }
  
  componentDidMount() {
    this.getGoods({
      page: 1
    });
    this.props.dispatch({
      type: 'category/GetCategory',
    });
  }

  search = (e)=> {
    const word = e.target.value;
    
    if(e.keyCode === 13) {
      this.setState({
        search: word,
      })
      
      this.getGoods({
        search: word,
      });  
    }
    
  }

  handleSelect = (selectedType)=> {
    this.setState({
      selectedType,
    });

    this.getGoods({
      selectedType,
    });
  }
  
  getGoods = ({page, search, selectedType}) => {
      this.setState({ loadingList: true });

      this.props.dispatch({
      type: 'good/getGoods',
      payload: {
        page: page || this.state.current,
        search: search === undefined ? this.state.search : search,
        categoryId: selectedType === undefined ? this.state.selectedType : selectedType,
        pageSize: pageSize,
      }
    }).then(() => {
      this.setState({ loadingList: false })
    }).catch((err) => {
      this.setState({ loadingList: false })
    })
  }
  showModal = (e, record) => {
    // console.log('record', record)
    this.setState({
      visible: true,
      editedGood: {
        ...record,
        preview: record.preview.split(',').map((file, i)=> ({ uid: i, name: file, newName: file, status: 'done', url: `http://www.babyshop.com/upload/previews/${file}` })),
        detail: record.detail.split(',').map((file, i)=> ({ uid: i, name: file, newName: file, status: 'done', url: `http://www.babyshop.com/upload/details/${file}` })),
        propertys: record.property.split(','),
        isHot: record.hot,
        isRecomment: record.recomment,
      }
    });
  }
  handleOk = (e) => {
    console.log('ok')
    const {editedGood} = this.state;

    this.props.dispatch({
      type: 'good/editGood',
      payload: {
        int_id: editedGood.id,
        name: editedGood.name,
        float_price: editedGood.price,
        preview: editedGood.preview.map((pic)=> pic.newName).join(','),
        detail: editedGood.detail.map(pic=> pic.newName).join(','),
        property: editedGood.propertys.join(','),
        bool_hot: editedGood.isHot,
        bool_recomment: editedGood.isRecomment,
        int_categoryId: editedGood.categoryId,
      }
    }).then(() => {
      this.setState({
        visible: false,
        loadingList: true
      });
      this.props.dispatch({
        type: 'good/getGoods',
        payload: {
          page: this.state.current,
          pageSize: pageSize,
        }
      }).then(() => {
        this.setState({ loadingList: false })
      }).catch((err) => {
        this.setState({ loadingList: false })
      })
    });
    
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  delGood = (id) => {
    // console.log(id)
    this.props.dispatch({
      type: 'good/delGood',
      payload: {
        int_id: id,
      }
    }).then((code) => {
      if (code === 200) {
        this.props.dispatch({
          type: 'good/getGoods',
          payload: {
            page: this.state.current,
            pageSize: pageSize,
          }
        }).then(() => {
          this.setState({ loadingList: false })
        }).catch((err) => {
          this.setState({ loadingList: false })
        })
      }
    })
  }
  render() {
    const columns = [{
      title: '商品编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '商品类型',
      dataIndex: 'categoryName',
      key: 'categoryName',
    }, {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a onClick={(e) => this.showModal(e, record)}>编辑</a>
          <Popconfirm title="确定要删除这个商品吗？" onConfirm={() => this.delGood(record.id)}>
            <a style={{ color: 'red', paddingLeft: 5 }}>删除</a>
          </Popconfirm>
        </div>
      ),
    }];
    const { goodsList } = this.props;
    const pagination = {
      total: goodsList.total,
      pageSize: pageSize,
      onChange: (page) => {
        this.setState({
          current: page,
          loadingList: true,
        })
        this.props.dispatch({
          type: 'good/getGoods',
          payload: {
            page: page,
            pageSize: pageSize,
          }
        }).then(() => {
          this.setState({ loadingList: false })
        }).catch((err) => {
          this.setState({ loadingList: false })
        })
      },
    };

    return (
      <div id="good-manager">
        <header>
          <span className="item">
            <label>商品类型</label>
            <Select 
            defaultValue=""
            onChange={this.handleSelect}
            >
              <Option key="all" value="">全部</Option>
              {
                this.props.categoryList.list.map((category)=> (<Option key={category.id} value={category.id}>{category.name}</Option>))
              }
            </Select>
          </span>
          <span className="item">
            <label>搜索商品</label>
            <Input onKeyDown={this.search}></Input>          
          </span>
        </header>
        <Table className="manageGoods"
          rowKey={record => record.id}
          loading={this.state.loadingList}
          columns={columns} dataSource={goodsList.list} pagination={pagination} />
        {/*编辑商品模态框*/}
        <EditGoods
          setState={(params)=> this.setState(params)}
          editedGood={this.state.editedGood}
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    goodsList: state.good.goodsList,
    categoryList: state.category.categoryList,
  }
})(ManageGoods);