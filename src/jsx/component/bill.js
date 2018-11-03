import React ,{Component}               from "react";
import {Input,Button,DatePicker,Table,Pagination }        from "antd";
import axios                            from "axios";
import moment from "moment";

import locale from 'antd/lib/date-picker/locale/zh_CN';
let url;
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,

                _keywords:"",
                _endTime:"",
                _statrtTime:"",
            keywords:"",
            endTime:"",
            statrtTime:"",
            page:1,
            adminWithdrawrecords:[],
            strip:0,
        }
    }
    componentWillMount=()=>{
        url = sessionStorage.getItem("url");
        this.init()
    }
    init=(data)=>{
        let _data= {
            endTime:this.state.endTime,
            keywords:this.state.keywords,
            numberPage:8,
            page:this.state.page,
            statrtTime:this.state.statrtTime
        }
        if(data){
            for(let k in data){
                _data[k]=data[k]
            }
        }
        axios.post(url+"/SmartPillow/web/wxorder/queryAdminWithdrawrecordList",_data)
             .then((res)=>{
                    if(res.data.code===1000){
                            this.setState({
                                adminWithdrawrecords:res.data.data.adminWithdrawrecords,
                                strip:res.data.data.strip
                            })
                    }else{
                        this.setState({
                            adminWithdrawrecords:[],
                            strip:0,
                            page:1,
                        })
                    }
             })
    }

    /**获取关键字 */
    onKeyword=( e )=>{
        this.setState({
            _keywords:e.target.value
        })
    }
    /**开始时间 */
    onStatrtTime=(e,b)=>{
        this.setState({
            _statrtTime:b
       })
    }
    /**结束时间 */
    onEndTime=(e,b)=>{
       this.setState({
            _endTime:b
       })
    }
    /**翻页 */
    onPage=( e )=>{
        this.setState({
            page:e
        })
        this.init({page:e})
    }
    /**搜索 */
    search=( )=>{
        this.setState({
            keywords:this.state._keywords,
            statrtTime:this.state._statrtTime,
            endTime:this.state._endTime
        })
        this.init({
            keywords:this.state._keywords,
            statrtTime:this.state._statrtTime,
            endTime:this.state._endTime
        })
    }
        render(){
            return(
                <div className={"admin bill"}>
                       <h3>提现账单</h3>
                       <div className={"adminSearch clear-fix"}>
                            <span>搜索：</span>
                            <Input className={"keyWord"}  onChange={this.onKeyword} placeholder={"输入关键字"}/>
                            <span style={{margin:"0 8px"}}>起</span>
                            <DatePicker locale={locale} onChange={this.onStatrtTime}/>
                            <span style={{margin:"0 8px"}}>止</span>
                            <DatePicker locale={locale} onChange={this.onEndTime}/>
                            <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                                查询
                            </Button>
                       </div>
                       <div className={"AdminLis"}>
                            <Table dataSource={this.state.adminWithdrawrecords}
                                rowKey="createtime"
                                pagination={false}
                                columns={[
                                    {title:"时间",key:"createtime",render:(txt)=>{return (<span>{moment(parseInt(txt.createtime)).format('YYYY-MM-DD HH:mm:ss')}</span>)}},
                                    {title:"订单号",dataIndex:"withdrawnumber",key:"withdrawnumber"},
                                    {title:"提现人",dataIndex:"admin.name",key:"admin.name"},
                                    {title:"提现平台",key:"accounttype", render:(txt)=>{return (<span>{txt.accounttype===1?"支付宝":txt.accounttype===2?"微信":"-"}</span>)}},
                                    {title:"提现金额",dataIndex:"withdrawmoney",key:"withdrawmoney"}
                                ]
                            }/>
                            <div className={"page"}>
                                <span>共{this.state.strip}条</span>
                                <Pagination defaultPageSize={8} total={this.state.strip} onChange={this.onPage}/>
                            </div>
                       </div>
                </div>
            )
        }
}