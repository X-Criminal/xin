import React ,{Component} from "react"
import axios             from "axios";
import Search            from "./agentSubclass/search";
import AgentLis          from "./agentSubclass/agentLis";
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
                page:1,
                idRole:0,
                keywords:"",
                condition:"",
        }
    }
    componentDidMount(){
        url = sessionStorage.getItem("url");
        this.init()
    }

      /**初始化 */
      init=(data,cb)=>{
        let _data={
            numberPage:8,
            page:this.state.page,
            condition:this.state.condition,
            idRole:this.state.idRole,
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
        axios.post(url+"SmartPillow/web/agent/getAgentList",_data)
              .then((res)=>{
                  if(res.data.code===1000&&res.data.data){
                        this.setState({
                            strip:res.data.data.strip,
                           admins:res.data.data.admins
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
    /**添加 */
    addAdmin=(data,cb)=>{
        axios.post(url+"/SmartPillow/web/agent/insertAgent",data)
             .then((res)=>{
                 this.init()
                 alert(res.data.message)
                 cb&&cb(res)
             })
    }
    /**查询 */
    onSearch=(data,cb)=>{
        this.init(data,(data)=>{
            cb&&cb(data)
        })
    }
    /**修改 */
    upData=(data,cb)=>{
        axios.post(url+"/SmartPillow/web/agent/updateAgent",data)
             .then((res)=>{
                    if(res.data.code===1000){
                         this.init()
                          alert("修改成功")
                    }else{
                          alert("修改失败")
                    }
                cb&&cb()
             })
    }
     /**删除 */
    deleData=( e ,cb)=>{
        axios.post(url+"/SmartPillow/web/agent/deleteAgent",{idAdmin:e})
             .then((res)=>{
                 if(res.data.code===1000){
                     this.init()
                 }
                alert(res.data.message)
             })
        cb&&cb( )
    }
    /**翻页 */
    emtPage=(e)=>{
        this.setState({
            page:e
        })
        this.init({page:e})
    }

        render(){
            if(sessionStorage.getItem("adminAuths").indexOf("代理商管理")>-1){
                return(
                    <div className={"agent admin"}>
                            <h3>代理商管理</h3>
                            <Search addAdmin={this.addAdmin} onSearch={this.onSearch}/>
                            <AgentLis strip={this.state.strip} admins={this.state.admins} upData={this.upData} deleData={this.deleData} emtPage={this.emtPage}/>
                    </div>
                )
            }else{
                return(
                    <div className={"agent admin"}>
                            <h3>代理商管理</h3>
                            <p>无权限</p>
                    </div>
                )
            }
        }
}