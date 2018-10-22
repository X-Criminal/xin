import React   from "react";
import logo1           from "../../img/logo1.png"
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {Icon,Input,Button,Form}        from "antd";
import "../../css/header.css"
const FormItem = Form.Item;
export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <Router>
                <div>
                    <img src={logo1} alt={"logo"}/>
                    <div className={"userName"}>
                        <i className={"iconfont icon-yonghushezhi"}></i>
                        &nbsp;
                        范柳原
                        &nbsp;
                        <Icon type="caret-down" theme="filled" />
                            <div className={"updateAdminPassword"}>
                                <Link to={"/header/updateAdminPassword"}>
                                    重置密码
                                </Link>
                                <b >
                                    退出登录
                                </b>
                            </div>
                    </div>
                    <Switch>
                                <Route path="/header/updateAdminPassword" component={Updata}/>
                                <Route path="/header/updateAdminPassword" render={()=>null}/>
                            </Switch>
                </div>
            </Router>
        )
    }
}

class updata extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
        }
    }

    /**提交修改 */
    enterLoading=( )=>{
        this.setState({
            loading:!this.state.loading
        })
    }

      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一致!');
        } else {
          callback();
        }
      }


    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={"updata"}>
                <div className={"updataBox"}>
                    <h2>修改密码  <Link to={"/header"}><Icon type={"close"} /></Link></h2>
                    <Form className={" clear-fix"}>
                        <div className={"updataTxt"}>
                            <div>
                                <span>用户名</span> <Input disabled={true} style={{"border":"none","backgroundColor":"#fff"}}/>
                            </div>
                            <FormItem>
                                    <span>原密码</span>
                                    {getFieldDecorator("oldPassword",{
                                        rules: [{ required: true, message: '请输入原密码!' }],
                                    })(
                                        <Input type={"password"}/>
                                    )
                                    }
                            </FormItem>
                            <FormItem>
                                    <span>新密码</span> 
                                        {getFieldDecorator("password",{
                                            rules: [{ required: true, message: '请输入密码!' }],
                                        })(
                                            <Input type={"password"}/>
                                        )
                                        }
                                </FormItem>
                                <FormItem>
                                <span>重复新密码</span>
                                        {getFieldDecorator("confirmPassword",{
                                            rules: [{ required: true, message: '请输入密码!' },{validator: this.compareToFirstPassword}],
                                        })(
                                            <Input type={"password"}/>
                                        )
                                        }
                            </FormItem>
                            <div>
                                <Button>
                                    <Link to={"/header"}>
                                        取消
                                    </Link>
                                </Button>
                                <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
                                        确定
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
const  Updata  = Form.create( )(updata);