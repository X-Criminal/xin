import React ,{Component} from "react";
import {Table,Button,Icon,InputNumber,Input,Checkbox }            from "antd";
const CheckboxGroup = Checkbox.Group;
const {Column} =Table;
export default class App extends Component {
    constructor(props){
        super(props)
        this.state={
            emData:{},
            showUp:false,
        }
    }

    showBox=( )=>{
        this.setState({
            showUp:!this.state.showUp
        })
    }

    onData=( res )=>{
            this.setState({
                  emData:res,
            })
            this.showBox( );
        }


    
    render(){
        return(
            <div className={"setOne"}>
                <h4>分利比例设置</h4>
                <Table pagination={false} dataSource={this.props.ByRole} rowKey={"idRole"}>
                    <Column
                        title="角色名"
                        dataIndex="roleName"
                        key="roleName"
                     />
                      <Column
                        title="分利比"
                        key="profit"
                        render={(txt)=>{
                            return(<span>{(txt.profit*1000)/10+"%"}</span>)
                        }}
                     />
                      <Column
                        title="权限"
                        key="authList[0].authName"
                        dataIndex="authList[0].authName"
                     />
                      <Column
                        title="操作"
                        key="idRole"
                        render={(res)=>{
                                 return(
                                    <Button  onClick={this.onData.bind(this,res)}>
                                        编辑
                                    </Button>
                                 )
                        }}
                     />
                </Table>
                {
                    this.state.showUp?<Updata enData={this.props.onUpdata} showBox={this.showBox} emdata={this.state.emData}/>:null
                }
            </div>
        )
    }
}

/**修改*/
class Updata extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            profit:"",
            authList:[],
            defa:[],
            idRole:"",
        }
    }
    componentWillMount(){
        this.setState({
            idRole:this.props.emdata.idRole,
            profit:this.props.emdata.profit,
            defa:this.props.emdata.authList[0]?this.initAuth(this.props.emdata.authList[0].authName):[]
        })
    }

    onTaxrate=(e)=>{
        this.setState({
            profit:e/100
        })
    }
    onchange=(e)=>{
        console.log(e)
        let arr=[]
        for(let i=0;i<e.length;i++){
                arr.push({idAuth:e[i]})
        }
        this.setState({
            authList:arr
        })
    }
    updata=( )=>{
        this.props.enData({
            profit:this.state.profit,
            authList:this.state.authList,
            idRole:this.state.idRole
        },()=>{
            this.props.showBox( );
        })
    }
    initAuth( data ){
        let _data="";
         _data=  data.replace(/用户管理/g,1);
         _data= _data.replace(/代理商管理/g,2);
         _data= _data.replace(/管理员管理/g,3);
         _data= _data.replace(/设备管理/g,4);
         _data= _data.replace(/订单管理/g,5);
         _data= _data.replace(/酒店管理/g,6);
         _data= _data.replace(/营销报表/g,7);
         _data= _data.replace(/报修管理/g,8);
         _data= _data.replace(/支付账单/g,9);
         _data= _data.replace(/设置/g,10);
         let array = Array.from(new Set( _data.split(",")));
         return array;
    }

    render(){
        let _updata =this.props.emdata;
        return(
            <div className={"addAdminBox"}>
                       <div>
                                  <h3>修改角色 <Icon style={{float:"right",cursor:"pointer"}} onClick={this.props.showBox} type={"close"}/></h3>
                                  <div className={"addAdminData"}>
                                       <div key={1}>
                                           <span>
                                               角色名
                                           </span>
                                           <Input name={"massage"}  defaultValue={_updata.roleName} disabled={true}/>
                                       </div>
                                       <div key={5}>
                                           <span>
                                               分利比(%)
                                           </span>
                                           <InputNumber
                                                defaultValue={(_updata.profit*1000)/10}
                                                min={0}
                                                max={100}
                                                formatter={value => `${value}%`}
                                                parser={value => value.replace('%', '')}
                                                onChange={this.onTaxrate}
                                                />
                                       </div>
                                        <div className={"Auth"}>
                                            <span>权限</span>
                                            <CheckboxGroup onChange={this.onchange} options={optionsWithDisabled} defaultValue={this.state.defa} />
                                        </div>
                                       <div className={"adminDataBtn"} key={10}>
                                            <Button onClick={this.props.showBox}>
                                                    取消
                                            </Button>
                                            <Button type={"primary"} loading={this.state.loading} onClick={this.updata}>
                                                 确定
                                            </Button>
                                       </div>
                                  </div>
                            </div>
            </div>
        )
        }
}
const optionsWithDisabled = [
    { value: "1", label: '用户管理'},
    { value: "2", label: '代理商管理'},
    { value: "3", label: '管理员管理',},
    { value: "4", label: '设备管理',},
    { value: "5", label: '订单管理',},
    { value: "6", label: '酒店管理',},
    { value: "7", label: '营销报表',},
    { value: "8", label: '报修管理',},
    { value: "9", label: '支付账单',},
    { value: "10",label: '设置',},
  ];



