import React,{Component}                    from "react";
import { HashRouter as Router, Route, Switch, Link,withRouter } from 'react-router-dom';
import {Layout,Menu}        from "antd";

import "../css/home.css";
import "../font-icn/iconfont.css"
import HEADER    from "./component/header"
/**路由组件 */  
import Admin     from "./component/admin";
import Agent     from "./component/agent";
import AgentRole  from "./component/details/detailsRole"
import AgentHotel from "./component/details/datailsHotel"
import User      from "./component/user";
import Equipment from "./component/equipment";
import Order     from "./component/order";
import Hotel     from "./component/hotel";
import Data      from "./component/data";
import Reviewed  from "./component/reviewed";
import Bill      from "./component/bill"
import SET       from "./component/set"



const {Header,Sider,Content} = Layout;
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class App extends Component{
        constructor(props){
            super(props)
            this.state={

            }
        }
        render(){
            return(
                <Router>
                     <Home/>
                </Router>
            )
        }
}

const Home = withRouter((props)=>{
    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    return(
        <div className={"Home"}>
        <Layout>
            <Header>
                <HEADER pathSnippets={pathSnippets}/>
            </Header>
            <Layout>
                <Sider breakpoint={Enum}>
                    <Menu
                        defaultSelectedKeys={['/']}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={pathSnippets}
                        mode="inline"
                        theme="dark"
                    >
                            <Menu.Item key=" " >
                                <Link to="/ ">
                                    <i className={"iconfont icon-user-manage"}></i>
                                    管理员管理
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="agent">
                                <Link to={"/agent"}>
                                    <i className={"iconfont icon-User_SFontCN"}></i>
                                    代理商管理
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="user">
                                <Link to={"/user"}>
                                    <i className={"iconfont icon-yonghu"}></i>
                                    用户管理
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="equipment">
                                <Link to={"/equipment"}>
                                    <i className={"iconfont icon-c_sz"}></i>
                                    设备管理
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="order">
                                <Link to={"/order"}>
                                    <i className={"iconfont icon-ziyuan"}></i>
                                    订单管理
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="hotel">
                                <Link to={"/hotel"}>
                                    <i className={"iconfont icon-jiudian"}></i>
                                    酒店管理
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="data">
                                <Link to={"/data"}>
                                    <i className={"iconfont icon-shuju"}></i>
                                    营销管理
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="reviewed">
                                <Link to={"/reviewed"}>
                                    <i className={"iconfont icon-xiaoxi1"}></i>
                                    审核通知
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="bill">
                                <Link to={"/bill"}>
                                    <i className={"iconfont icon-hongbao002"}></i>
                                    提现账单
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="set">
                                <Link to={"/set"}>
                                    <i className={"iconfont icon-shezhi"}></i>
                                    设置
                                </Link>
                            </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <Switch>
                            <Route  path="/agent"     component={ Agent }/>
                                <Route  path='/AgentRole/:data'  component={AgentRole}/>
                                <Route  path='/AgentHotel/:data' component={AgentHotel}/>
                            <Route  path="/user"      component={ User}/>
                            <Route  path="/equipment" component={ Equipment}/>
                            <Route  path="/order"     component={ Order}/>
                            <Route  path="/hotel"     component={ Hotel}/>
                            <Route  path="/data"      component={ Data}/>
                            <Route  path="/reviewed"  component={ Reviewed}/>
                            <Route  path="/bill"      component={ Bill}/>
                            <Route  path="/set"       component={ SET}/>
                            <Route                    component={ Admin} /> 
                    </Switch>
                </Content>
            </Layout>
        </Layout>
      </div>
    )
})


export default App;

 let Enum ={
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
}