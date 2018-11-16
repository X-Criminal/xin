import React   from "react";
import cookie  from "react-cookies";
import axios   from "axios"
import logo1           from "../../img/logo1.png";
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {Icon,Input,Button,Form,message}        from "antd";
import "../../css/header.css"
const FormItem = Form.Item;
let url = "";
export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    componentWillMount(){
        url=sessionStorage.getItem("url")
    }
    /**退出 */
    Cancellation=( )=>{
        cookie.remove("userData");
        sessionStorage.removeItem("adminAuths");
        window.location.reload()
    }
    /**修改密码 */
    enterLoading=(data,cb)=>{
        axios.post(url+"SmartPillow/web/admin/updateAdminPassword",data)
             .then((res)=>{
                 if(res.data.code===1000){
                     message.success(res.data.message+",重新登录后生效！")
                 }else{
                     message.warning(res.data.message)
                 }
                    cb&&cb( )
             }).catch((res)=>{
                 message.success("网络错误，请稍后再试！")
             })
    }
    render(){
        return(
            <Router>
                <div>
                    <img src={logo1} alt={"logo"}/>
                    <div className={"userName"}>
                        <i className={"iconfont icon-yonghushezhi"}></i>
                        &nbsp;
                        {cookie.load("userData").name}
                        &nbsp;
                        <Icon type="caret-down" theme="filled" />
                            <div className={"updateAdminPassword"}>
                                <Link to={"/"+this.props.pathSnippets+"/updateAdminPassword"}>
                                    重置密码
                                </Link>
                                <b onClick={this.Cancellation}>
                                    <Link to={"/ "}>
                                        退出登录
                                    </Link>
                                </b>
                            </div>
                    </div>
                    <Switch>
                        <Route path={"/"+this.props.pathSnippets[0]+"/updateAdminPassword"} render={( )=> <Updata enterLoading={this.enterLoading}/>}/>
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
        const form = this.props.form;
        let data ={
            oldPassword:form.getFieldValue('oldPassword'),
            password: form.getFieldValue('password'),
        }
        this.setState({
            loading:!this.state.loading
        })
        this.props.enterLoading(data,()=>{
            this.back( )
            this.setState({
                loading:!this.state.loading
            })
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
      
      back=()=>{
          window.history.back(-1)
      }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={"updata"}>
                <div className={"updataBox"}>
                    <h2>修改密码  <Icon type={"close"} style={{cursor:"pointer"}} onClick={this.back}/></h2>
                    <Form className={" clear-fix"}>
                        <div className={"updataTxt"}>
                            <div>
                                <span>用户名</span> <Input disabled={true} value={cookie.load("userData").name} style={{"border":"none","backgroundColor":"#fff"}}/>
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
                                <Button onClick={this.back}>
                                        取消
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