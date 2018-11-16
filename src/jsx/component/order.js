import React ,{Component} from "react";
import Search             from "./userSubclass/search";
import OrderLis           from "./orderSubclass/agentLis";
import axios              from "axios";
import {message}          from "antd"
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            page:1,
            keywords:"",
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url")
    }
    componentDidMount(){
        this.init( )
    }

  /**初始化 */
  init=(data,cb)=>{
    let _data={
        numberPage:8,
        page:this.state.page,
        keywords:this.state.keywords,
    }
    if(data){
        for(let k in data){
            _data[k]=data[k]
            this.setState({
                [k]:data[k]
            })
        }
    }
    axios.post(url+"/SmartPillow/web/wxorder/getOrderList",_data)
          .then((res)=>{
              
              if(res.data.code===1000&&res.data.data){
                    this.setState({
                        strip:res.data.data.strip,
                       admins:res.data.data.wxorders
                    })
              }else{
                this.setState({
                    strip:0,
                   admins:[ ]
                })
              }
              cb&&cb( )
          })
}

     /**查询 */
     onSearch=( data,cb )=>{
        this.init(data,()=>{
            cb&&cb( )
        })
    }
    emtPage=(e)=>{
        this.setState({
            page:e
        })
        this.init({page:e})
    }
    deleteWxOrderList=(data,cb)=>{
         axios.post(url+"/SmartPillow//web/wxorder/deleteWxOrderList",data)
              .then((res)=>{
                     if(res.data.code===1000){
                         this.init( )
                         message.success(res.data.message);
                     }else{
                        message.error(res.data.message)
                     }
                     cb&&cb()
              }).catch(()=>{
                    message.error("请稍后再试~~~~~")
                    cb&&cb()
              })
    }
        render(){
            if(sessionStorage.getItem("adminAuths").indexOf("订单管理")>-1){
                return(
                    <div className={"order admin"}>
                             <h3>订单管理</h3>
                             <Search onSearch={this.onSearch} placeholder={"订单编号或者设备编号"}/>
                             <OrderLis deleteWxOrderList={this.deleteWxOrderList} strip={this.state.strip} emtPage={this.emtPage} admins={this.state.admins}/>
                    </div>
                )
            }else{
                return(
                    <div className={"order admin"}>
                             <h3>订单管理</h3>
                             <p>无权限</p>
                    </div>
                )
            }
        }
}           