import React ,{Component} from "react";
import axios              from "axios";
import {message}                 from "antd";
import cookie             from "react-cookies";
import Search             from "./userSubclass/search";
import RoleLis            from "./hotelSubclass/agentLis";
import AddHotel           from "./hotelSubclass/addAgent"
let url,admin;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            condition:"",
             keywords:"",
                 page:1,
              idAdmin:"",
              AllAdminName:[],
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url");
        admin = cookie.load("userData");
    }
    componentDidMount(){
        this.init( )
        this.queryAllAdminName( )
    }
    /**初始化 */
    init=(data,cb)=>{
        let _data={
               keywords:this.state.keywords,
              // condition:this.state.condition,
              adtype:cookie.load("userData").admintype,
              idAdmin:admin.idAdmin,
             numberPage:6,
                   page:this.state.page,
        }
        if(data){
            for(let k in data){
                _data[k] = data[k]
            }
        }
        axios.post(url+"SmartPillow/web/agent/queryAdminHotelRoleList",_data)
             .then((res)=>{
                if(res.data.code===1000&&res.data.data){
                    this.setState({
                        strip:res.data.data.strip,
                       admins:res.data.data.hotels
                    })
              }else{
                this.setState({
                    strip:0,
                   admins:[ ]
                })
              }
                 cb&&cb()
             })
    }
     /**查询 */
     onSearch=(data,cb )=>{
        this.setState({
            condition:data.condition,
             keywords:data.keywords
       })
        this.init(data,()=>{
            cb&&cb( )
        })
    }
  /**删除 */
  deleData=( e ,cb)=>{
    axios.post(url+"SmartPillow/web/agent/deleteAdminHotelRole",{idHotel:e})
         .then((res)=>{
             if(res.data.code===1000){
                 this.init()
             }
             message.success(res.data.message)
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
   /**添加*/
   addAdmin=(data,cb)=>{
    axios.post(url+"SmartPillow/web/hotel/addHotel",data)
         .then((res)=>{
             if(res.data.code===1000){
                 this.init( )
             }
             cb&&cb( )
         }).catch((err)=>{
             message.success("网络错误，请稍后再试");
             cb&&cb( )
         })
        
   }
   /**修改 */
   upData=(data,cb)=>{
        axios.post(url+"/SmartPillow//web/agent/updateAdminHotelRole",data)
             .then((res)=>{
                 console.log(res)
                 cb&&cb()
             })
   }

   /**获取所有代理商 */
   queryAllAdminName=()=>{
       axios.get(url+"/SmartPillow/web/agent/queryAllAdminName")
            .then((res)=>{
                if(res.data.code===1000){
                    this.setState({
                        AllAdminName:res.data.data
                    })
                }
            }).catch((err)=>{
                message.error("获取代理商列表失败")
            })
   }
    render(){
        if(sessionStorage.getItem("adminAuths").indexOf("酒店管理")>-1){
            return(
                <div className={"admin Role"}>
                    <h3>酒店管理</h3>
                    <Search
                         postData={<AddHotel addAdmin={this.addAdmin} AllAdminName={this.state.AllAdminName}/>}
                         onSearch={this.onSearch}
                         placeholder={"酒店名称或酒店编号"}/>
                    <RoleLis  upData={this.upData} strip={this.state.strip} admins={this.state.admins} deleData={this.deleData} emtPage={this.emtPage} router={this.props.match.url} params={this.state.TypeAndId}/>
                </div>
            )
        }else{
            return(
                <div className={"admin Role"}>
                    <h3>酒店管理</h3>
                    <p>无权限</p>
                </div>
            )
        }
    }
}