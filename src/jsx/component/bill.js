import React ,{Component} from "react";
import {Input,Button,DatePicker}     from "antd"
import locale from 'antd/lib/date-picker/locale/zh_CN';
export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false
        }
    }
    search=( )=>{
        
    }
        render(){
            return(
                <div className={"admin bill"}>
                       <h3>提现账单</h3>
                       <div className={"adminSearch clear-fix"}>
                            <span>搜索：</span>
                            <Input className={"keyWord"}  />
                            <span style={{margin:"0 8px"}}>起</span>
                            <DatePicker locale={locale}/>
                            <span style={{margin:"0 8px"}}>止</span>
                            <DatePicker locale={locale}/>
                            <Button className={"Adminbtn"} type="primary" loading={this.state.loading} onClick={this.search}>
                                查询
                            </Button>
                       </div>
                </div>
            )
        }
}