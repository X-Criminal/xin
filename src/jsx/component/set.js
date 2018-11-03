import React ,{Component} from "react";
import axios              from "axios";
import {message}          from "antd";
import One     from "./setSubclass/setOne";
import Two     from "./setSubclass/setTwo";
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            BaseSet:[ ],
             ByRole:[ ],
        }
    }

    componentDidMount(){
        url = sessionStorage.getItem("url");
        this.queryBaseSet( )
        this.getRoleAuthByRole()
    }

    queryBaseSet=( )=>{
        let arr=[]
        axios.get(url+"SmartPillow/web/baseset/queryBaseSet")
             .then((res)=>{
                 if(res.data.code===1000){
                        arr.push(res.data.data)
                        this.setState({
                            BaseSet:arr
                        })
                 }else{
                        arr=[]
                 }
                 
             })
    }

    /**其他设置修改 */
    enData=(data,cb)=>{
        axios.post(url+"SmartPillow/web/baseset/updateBaseSet",data)
             .then((res)=>{
                 if(res.data.code===1000){
                     this.queryBaseSet( )
                 }else{
                    message.error(res.data.message)
                 }
             })
        cb&&cb( )
    }
    /**权限查询 */
    getRoleAuthByRole=(data,cb)=>{
        axios.get(url+"SmartPillow/web/roleManagement/getRoleAuthByRole")
              .then((res)=>{
                  if(res.data.code===1000){
                        this.setState({
                            ByRole:res.data.data
                        })
                  }else{
                    message.error(res.data.message);
                  }
              })
    }
    /**上传编辑内容*/
    updateAdminRole=(data,cb)=>{
        axios.post(url+"/SmartPillow//web/roleManagement//updateAdminRole",data)
              .then((res)=>{
                  this.getRoleAuthByRole()
                  cb&&cb()
              })
    }
        render(){
            return(
                <div className={"set admin"}>
                        <h3>设置</h3>
                        <One ByRole={this.state.ByRole} onUpdata={this.updateAdminRole}/>
                        <Two BaseSet={this.state.BaseSet} enData={this.enData}/>
                </div>
            )
        }
}