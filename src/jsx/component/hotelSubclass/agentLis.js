import React,{Component}                     from "react";
import {Route, Switch, Link}                 from 'react-router-dom';
import cookie                                from "react-cookies";
import axios                                 from "axios";
import Avatar                                from "../share/Avatar";
import Region                                from "../share/region";
import Dele                                  from "../share/dele";
import HotelDeta                             from "./HotelDetailList"
import {message}                             from "antd";   
import {Table,Button,Input,Icon,Pagination,InputNumber  } from "antd";

const {Column} =Table;
let inRouter,url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            hotelname:"",
             upData:[],
            idHotel:"",
           _idHotel:"",
              _page:1,
           HOTEDATA:[],
              strip:0,
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url");
    }
    /**保存修改 */
    onUpdateAdmin(data){
        this.setState({
            upData:data,
            idAdmin:""
        })
    }
    /**保存删除 */
    onDeleteAdmin(idHotel){
       this.setState({
            idHotel:idHotel
       })
    }
    /**提交修改数据 */
    enData=(data,cb )=>{
        data.idAdmin=cookie.load("userData").idAdmin
        this.props.upData(data,()=>{
            cb&&cb()
        })
    }
    /**判断删除 */
    DeleBox=(e)=>{
        if(e==="cancel"){
                window.history.back(-1)
        }else if(e==="sure" ){
            this.props.deleData(this.state.adminId,()=>{
                window.history.back(-1)
            })
        }
    }
    /**翻页 */
    onPage=(e)=>{
        this.props.emtPage(e)
    }
    /**查看详情 */
    getHotelDetailList=( data ,hotelname)=>{
        this.setState({
            _idHotel:data,
            hotelname:hotelname
        })
        this._init({idHotel:data})
    }
    /**详细列表 */
    _init=( data )=>{
        let _data={
            idHotel:this.state._idHotel,
            numberPage:8,
            page:this.state._page
        }
        if(data){
            for(let k in data){
                _data[k]=data[k]
            }
        }
        axios.post(url+"/SmartPillow/web/roomdetails/getHotelDetailList",_data)
             .then((res)=>{
                 if(res.data.code===1000){
                        this.setState({
                            HOTEDATA:res.data.data.hotels,
                               strip:res.data.data.strip
                        })
                 }else{
                        this.setState({
                            HOTEDATA:[],
                            strip:0,
                            _page:1,
                        })
                 }
             })
    }
    /**详细列表翻页 */
    onHotepage=(data)=>{
        this.setState({
            _page:data
        })
        this._init({page:data})
    }
    /**详情删除 */
    _deleData=(data)=>{
        axios.get(url+"/SmartPillow/web/roomdetails/deleteHotelDeteil?idRoom="+data)
             .then((res)=>{
                    if(res.data.code===1000){
                        this.init()
                        message.success("操作成功！")
                    }else{
                        message.error("操作失败！")
                    }
                    window.history.back(-1)
             })
             .catch((err)=>{
                    message.error("网络错误请稍后再试~~~~~")
                    window.history.back(-1)
                })
             
    }
    render(){
        return(
            <div className={"AdminLis"}>
                    <Table dataSource={this.props.admins} pagination={false} rowKey={"idHotel"}>
                        <Column
                        title="酒店编号"
                        dataIndex="hotelnumber"
                        key="hotelnumber"
                        />
                        <Column
                        title="酒店名称"
                        dataIndex="hotelname"
                        key="hotelname"
                        />
                        <Column
                        title="酒店地址"
                        dataIndex="hoteladdress"
                        key="hoteladdress"
                        />
                        <Column
                        title="楼层数"
                        dataIndex="floornumbers"
                        key="floornumbers"
                        />
                        <Column
                        title="房间数"
                        dataIndex="roomnumbers"
                        key="roomnumbers"
                        />
                        <Column
                        title="营业执照"
                        key="businesslicense"
                       // dataIndex="businesslicense"
                       render={(txt)=>{
                           if(txt.businesslicense){
                                return(<img  src={url+txt.businesslicense} alt={txt}/>)
                           }else{
                                return null
                           }
                       }}
                        />
                         <Column
                        title="法人"
                        dataIndex="legalperson"
                        key="legalperson"
                        />
                        <Column
                        title="所属角色"
                        dataIndex="admin.name"
                        key="admin.name"
                        />
                        <Column
                        title="操作"
                        key="idAdmin"
                        render={(text) => {
                            return(
                                <div>
                                    <Button onClick={this.getHotelDetailList.bind(this,text.idHotel,text.hotelname)}>
                                        <Link to={"/hotel/HoteData"}>
                                            详情
                                        </Link>
                                    </Button>
                                    <Button onClick={this.onUpdateAdmin.bind(this,text)}>
                                        <Link to={"/hotel/UpdateAdmin"}>
                                            编辑
                                        </Link>
                                    </Button>
                                    <Button onClick={this.onDeleteAdmin.bind(this,text.idHotel)} className={"deleBtn"}>
                                        <Link to={"/hotel/DeleteAdmin"} >
                                            删除
                                        </Link>
                                    </Button>
                                </div>
                            )
                        }}
                        />
                </Table>
                    <div  className={"page"}>
                        <span>共{this.props.strip}条</span>
                        <Pagination defaultCurrent={1} total={this.props.strip} defaultPageSize={8} onChange={this.onPage}/>
                    </div>
                    <Switch>
                        <Route path={"/hotel/HoteData"} render={()=>    <HotelDeta
                                                                             url="SmartPillow/web/roomdetails/importRoomDetails"
                                                                             deleData={this._deleData} 
                                                                             onHotepage={this.onHotepage} 
                                                                             idHotel={this.state._idHotel} 
                                                                             hotelname={this.state.hotelname} 
                                                                             HOTEDATA={this.state.HOTEDATA} 
                                                                             strip={this.state.strip}/>}/>
                        <Route path={"/hotel/UpdateAdmin"} render={()=> <UpdateAdmin upData={this.state.upData} enData={this.enData} inRouter={inRouter}/>}/>
                        <Route path={"/hotel/DeleteAdmin"} render={()=> <Dele DeleBox={this.DeleBox}/>}/>
                    </Switch>
            </div>
        )
    }
}

/**修改 */
class UpdateAdmin extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            p:"",
            c:"",
            a:"",
            adminId:"",
            hotelname:"",
            businesslicense:"",
            floornumbers:"",
            hoteladdress:"",
            _hotelname:"",
            legalperson:"",
            roomnumbers:"",
            err:""
        }
    }

    /**省市区选择 */
    onRegion=(a,txt)=>{
        this.setState({
            [a]:txt,
        })
    }
    /**获取用户输入 */
    onchange=( e )=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    /**获取图片地址 */
    upimg=( e )=>{
        this.setState({
            businesslicense:e.data,
        })
    }
    /**房间数 */
    onRoomnumbers=(e)=>{
        this.setState({
            roomnumbers:e
        })
    }
    /**楼层数 */
    onFloornumbers=(e)=>{
        this.setState({
            floornumbers:e
        })
    }

    postData=( )=>{
        this.setState({
            loading:true,
        })
        let data={
            //adminId:this.props.idAdmin,
            idHotel:this.props.upData.idHotel,
            businesslicense:this.state.businesslicense,
            floornumbers:this.state.floornumbers,
            hoteladdress:this.state.p+this.state.c+this.state.a+this.state._hotelname,
            hotelname:this.state.hotelname,
            legalperson:this.state.legalperson,
            roomnumbers:this.state.roomnumbers,
        }
        this.props.enData(data,(data)=>{
            this.setState({
                loading:false
            })
            window.history.back(-1)
        })
    }

        render(){
            let _data = this.props.upData;
            return(
                <div className={"addAdminBox"}>
                <div>
                      <h3>编辑管理员 <Link to={"/hotel"}><Icon type={"close"}/></Link></h3>
                      <div className={"addAdminData"}>
                           <div key={1}>
                               <span>
                                   酒店名称
                               </span>
                               <Input name={"hotelname"} onChange={this.onchange}  placeholder={_data.hotelname}/>
                           </div>
                           <div key={2}>
                               <span>
                                   酒店地址
                               </span>
                               <Region onRegion={this.onRegion}/>
                           </div>
                           <div key={3}>
                               <span>
                                   详细地址
                               </span>
                               <Input name={"_hotelname"} onChange={this.onchange}  placeholder={_data.hoteladdress}/>
                           </div>
                           <div key={4}>
                               <span>
                                   房间数
                               </span>
                               <InputNumber min={0} max={99999998}  onChange={this.onRoomnumbers} placeholder={_data.floornumbers}/>
                           </div>
                           <div key={5}>
                               <span>
                                   楼层数
                               </span>
                               <InputNumber min={0} max={99999998}  onChange={this.onFloornumbers} placeholder={_data.roomnumbers}/>
                           </div>
                           <div key={6} className={"keyImg"}>
                               <span>
                                   营业执照
                               </span>
                               <Avatar upimg={this.upimg}/>
                           </div>
                           <div key={7}>
                               <span>
                                  法人
                               </span>
                               <Input name={"legalperson"} onChange={this.onchange}  placeholder={_data.legalperson}/>
                           </div> 
                           <div className={"adminDataBtn"} key={10}>
                                <Button>
                                    <Link to={"/hotel"}>
                                        取消
                                    </Link>
                                </Button>
                                <Button type={"primary"} loading={this.state.loading} onClick={this.postData}>
                                     确定
                                </Button>
                           </div>
                      </div>
                </div>
        </div>
            )
        }
}
