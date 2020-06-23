import React from 'react';
import {Table, Modal, Button, Form, Input} from 'antd';
import {connect} from 'dva';

const namespace = 'cards';
const FormItem = Form.Item;
function mapStateToProps(state) {
    return {
        //这里就是return model中获取的state到prop中
        cardsList: state.cards.cardsList,
        cardsLoading: state.loading.effects['cards/queryList'],
    }
}



class List extends React.Component {
    state = {
        visible:false,
    };
    showModal = () => {
        this.setState({visible: true});
        // console.log("我被点击了..")
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    handleOk = () => {
        const {dispatch, form: {validateFields}} = this.props;
        validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'cards/addOne',
                    payload: values,
                });
                this.setState({
                    visible: false,
                });
            };
        });
        }
    // }
    columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '链接',
            dataIndex: 'url',
            render: value => <a href={value}>{value}</a>
        },
    ];
    //必须有这一步，然后才能在mapstatetoprops中，将获取到的state放入到props中.
    componentDidMount() {
        this.props.dispatch(
            {
                type: 'cards/queryList'
            }
        );
    }
    render() {
        const {visible} = this.state;
        const {cardsList, cardsLoading, form:{getFieldDecorator}} = this.props;
        console.log(this.props)
        return (
            <div>
                <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
                <Button onClick={this.showModal}>新建</Button>
                <Modal title="新增记录" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Form>
                        <FormItem label="名称">
                            {getFieldDecorator('name', {
                                rules: [{required: true}],
                            })(
                            <Input />
                            )}
                        </FormItem>
                        <FormItem label="描述">
                        {getFieldDecorator('desc')(
                            <Input />
                        )}
                        </FormItem>
                        <FormItem label="链接">
                            {getFieldDecorator('url', {
                                rules: [{type: 'url'}],
                            })(
                            <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Form.create()(List));