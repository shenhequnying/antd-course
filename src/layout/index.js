import {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import styles from "./layout.less"
import logo from "../assets/logo.svg"
// import logo from '../assets/logo.svg';
// import {
//     MenuUnfoldOutlined,
//     MenuFoldOutlined
// } from '@ant-design/icons';
import Link from 'umi/link';
const {Header, Footer, Sider, Content} = Layout;

const SubMenu = Menu.SubMenu;

class BaiscLayout extends Component{
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render(){
        return (
            <Layout>
                <Sider width={256} style={{minHeight: '100vh', color: 'white'}} collapsible collapsed={this.state.collapsed}>
                    <div className={styles.logo} key="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                            <h1>SQL TOOL</h1>
                        </Link>
                    </div>
                    {/*<div style={{height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}>SQL TOOL</div>*/}
                    {/*<div className="logo">测试下</div>*/}
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                            <Menu.Item key="1">
                                <Link to="/helloWorld"/>
                                <Icon type="pie-chart"/>
                                <span>HelloWorld</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="dashboard" /><span>Dashboard</span></span>}
                            >
                            {/*<SubMenu key="sub1" title={<span><Icon type="dashboard"/><span>Dashboard</span></span>}>*/}
                                <Menu.Item key="2"><Link to="/dashboard/analysis"/>分析页</Menu.Item>
                                <Menu.Item key="3"><Link to="/dashboard/monitor"/>监控页</Menu.Item>
                                <Menu.Item key="4"><Link to="/dashboard/workplace"/>工作台</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={<span><Icon type="database" /><span>sqltool</span></span>}
                            >
                                <Menu.Item key="2"><Link to="/sqltool/discovery"/>发现频道</Menu.Item>
                                <Menu.Item key="3"><Link to="/sqltool/product_item"/>渠道流量</Menu.Item>
                            </SubMenu>
                        </Menu>
                </Sider>
                <Layout>
                    {/*className="site-layout-background" */}
                    <Header style={{background: '#fff', padding: 0}} >
                        <Icon
                            className="trigger"
                            style={{marginLeft: 10}}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{margin: '24px 16px 0'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default BaiscLayout;
