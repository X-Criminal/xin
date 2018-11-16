import React                                 from "react";
import SelectFile                            from "../share/SelectFile";
import Dele                                  from "../share/dele";
import {Table,Button,Pagination}             from "antd";
import {Route, Switch, Link}                 from 'react-router-dom';
const {Column} =Table;
export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            idRoom:""
       }
    }
    goBack=()=>{
        window.history.go(-1)
    }

      /**判断删除 */
      DeleBox=(e)=>{
        if(e==="cancel"){
                window.history.back(-1)
        }else if(e==="sure" ){
            this.props.deleData(this.state.idRoom,()=>{
                window.history.back(-1)
            })
        }
    }
    dele=(res)=>{
        this.setState({
            idRoom:res
        })
    }

    render(){
        return(
            <div className={"HotelData admin"}>
                <h3><span onClick={this.goBack}>酒店管理</span>>酒店详情</h3>
                <div className={"titleANDadd"}>
                    <h4>{this.props.hotelname}</h4> 
                    <div ><SelectFile idHotel={this.props.idHotel} url={this.props.url}/></div>
                </div>
                <Table dataSource={this.props.HOTEDATA} pagination={false} rowKey={"idRoom"}>
                        <Column
                        title="楼层号"
                        dataIndex="floornumber"
                        key="floornumber"
                        />
                        <Column
                        title="房间号"
                        dataIndex="roomnumber"
                        key="roomnumber"
                        />
                        <Column
                        title="设备数量"
                        dataIndex="equipmentnumber"
                        key="equipmentnumber"
                        />
                        <Column
                        title="操作"
                        dataIndex="idRoom"
                        key="idRoom"
                        render={(res)=>{
                           return(
                               <Link to={"/hotel/HoteData/deleHotelData"}>
                                     <Button onClick={this.dele.bind(this,res)} style={{color:"#096dd9"}}>
                                        删除
                                    </Button> 
                               </Link>
                           )
                        }}
                        />
                </Table>
                <div  className={"page"}>
                        <span>共{this.props.strip}条</span>
                        <Pagination defaultCurrent={1} total={this.props.strip} defaultPageSize={8} onChange={this.props.onHotepage}/>
                </div>
                <Switch>
                    <Route path={"/hotel/HoteData/deleHotelData"} render={()=> <Dele DeleBox={this.DeleBox}/>}/>
                </Switch>
            </div>
        )
    }
}