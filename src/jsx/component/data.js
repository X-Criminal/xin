import React ,{Component}           from "react";
import Search                       from "./userSubclass/search";
import { Radio ,DatePicker,Icon,message }   from 'antd';
import axios                        from "axios"
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';

import echarts from "echarts"
import "../../css/DataStyle.css"
let upData = false,myChart,url;

const dateFormat = 'YYYY/MM/DD';


let getDay=(type)=>{
    let _date = new Date(type).getTime();
    let  day  =  moment(_date).format('d')
        _date = _date-(day==="0"?6:day-1)*(24*60*60*1000)
         return moment(_date).format('YYYY-MM-DD');
}
let initDate   = new Date( );
let _getDay     = getDay(initDate);
let inDate    = moment(initDate).format('YYYY-MM-DD');
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
             date:[],
             amount:[],
             typeData:1,
             getDay:"",
             inDate:"",
             keywords:"",
             totalMoney:""
        }
    }
    onSearch=( e , cb)=>{
        this.setState({
            keywords:e.keywords
        })
        this.init({keywords:e.keywords})
        cb&&cb()
    }
    /**选择年月日 */
    onDateType=( type )=>{
        this.setState({
            typeData:type.target.value
        })
        if(type.target.value===1){
            this.init({type:type.target.value,startTime:this.state.getDay})
        }else{
            this.init({type:type.target.value,startTime:this.state.inDate})
        }
    }
    /**选择日期 */
    onDate=( type , date)=>{
        this.setState({
            inDate:date,
            getDay:getDay(type._d),
        })
        if(this.state.typeData===1){
            this.init({startTime:getDay(type._d)})
        }else{
            this.init({startTime:date})
        }
    }
    componentWillMount(){
        url = sessionStorage.getItem("url");
        this.setState({
            getDay:_getDay,
            inDate:inDate,
        })
    }
    /**初始化 */
    componentDidMount(){
        upData=false;
        this.init()
    }
    /**初始化 */
    init( data,cb ){
        let _data={
            startTime:this.state.getDay,
             keywords:this.state.keywords,
                 type:this.state.typeData
        }
        if(data){
            for(let k in data){
                _data[k] = data[k]
            }
        }
        axios.post(url+"SmartPillow/web/wxorder/wxOrderStatistics",_data)
             .then((res)=>{
                 if(res.data.code===1000){
                     this.setState({
                        totalMoney:res.data.data.totalMoney
                     })
                    if(upData){
                        UpData(res.data.data.wxorder,this.state.typeData )
                    }else{
                        echart(res.data.data.wxorder,this.state.typeData)
                    }
                    message.success(res.data.message)
                 }else{
                    message.error(res.data.message)
                 }
                 cb&&cb()
             })
    }

        render(){
            if(sessionStorage.getItem("adminAuths").indexOf("营销报表")>-1){
                return(
                    <div className={"Data admin"}>
                        <h3>
                            营销报表
                        </h3>    
                        <Search onSearch={this.onSearch} placeholder={"输入酒店，代理商名称"}/>
                        <div className={"Datanav"}>
                            <Radio.Group buttonStyle="solid" onChange={this.onDateType} defaultValue={this.state.typeData}>
                                <Radio.Button value={1}>周</Radio.Button>
                                <Radio.Button value={2}>月</Radio.Button>
                                <Radio.Button value={4}>年</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={"DateBody"}>
                            <Icon type={"left"}/>
                            <DatePicker onChange={this.onDate} allowClear={false} locale={locale}  defaultValue={moment(initDate, dateFormat)}/>
                            <Icon type={"right"}/>
                        </div>
                        <div className={"echarts1"} style={{"width":"80%","height":"400px"}}></div>
                        <p className={"totalMoney"}>销售总额(元):{this.state.totalMoney}</p>
                    </div>
                )
            }else{
                return(
                    <div className={"Data admin"}>
                        <h3>
                            营销报表
                        </h3>
                        <p>无权限</p>
                    </div>
                    )
            }
        }
}

let inData=(data,dataType)=>{
    // if(dataType===1){
    //     return moment(parseInt(data)).format('YYYY-MM-DD')
    // }
    switch(dataType){
        case  1:
            return moment(parseInt(data)).format('MM-DD');
        case  2:
            return moment(parseInt(data)).format('MM-DD');
        default:
            return moment(parseInt(data)).format('YYYY-MM');
    }
    
}



let sEries=[0],
    xAxis =[0];
function echart( _sEries,type){
    if(_sEries.length>0){
        myChart = echarts.init(document.querySelector('.echarts1')); 
        iftype(type)
        for(let i = 0,idx = _sEries.length;i<idx;i++){
            sEries[i]=inData(_sEries[i].date,type)
            xAxis[i] =_sEries[i].money
        }
        myChart.setOption({
            legend:{
                data:"销售量"
            },
            color: ['rgb(60,172,255)'],
            tooltip: {},
            xAxis: {
                data: sEries
            },
            yAxis: {
                
            },
            series: [{
                name:"销售额",
                type: 'bar',
                data: xAxis
            },
        ]
        });
        upData=!upData;
    }
}

function UpData(_sEries,type){
     iftype(type)
        for(let i = 0,idx = _sEries.length;i<idx;i++){
            sEries[i]=inData(_sEries[i].date,type)
            xAxis[i] =_sEries[i].money
        }
        let option = myChart.getOption();
        option.xAxis[0].data=sEries;
        option.series[0].data = xAxis;
        myChart.setOption(option)
}
 function iftype(type){
    sEries=[];xAxis =[];
    if(type===1){
         for(let i = 0;i<7;i++){
            sEries.push("-");
            xAxis.push("0")
         }
    }else if(type===2){
        for(let i = 0;i<30;i++){
            sEries.push("-");
            xAxis.push("0")
         }
    }else if(type===4){
        for(let i = 0;i<12;i++){
            sEries.push("-");
            xAxis.push("0")
         }
    }
 }