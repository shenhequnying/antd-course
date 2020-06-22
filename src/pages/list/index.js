import React from 'react';
import {Table} from 'antd';
import {connect} from 'dva';

const namespace = 'cards';
// const mapDispatchToProps = (dispatch) => {
//     return {
//         onDidMount: () => {
//             dispatch({
//                 type: `${namespace}/queryList`,
//             });
//         },
//         // cardsList: state.cards.data,
//         // cardsLoading: state.loading.effects[`{$namespace}/queryList`]
//     }
// }

class List extends React.Component {
    state = {

    }
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
        },
    ];
    componentDidMount() {
        this.props.dispatch(
            {
                type: 'cards/queryList'
            }
        );
    }
    render() {
        const {cardsList, cardsLoading, data } = this.props;
        console.log(this.state,"state")
        console.log(this.props,"props")
        return (
            <div>
                <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        cardsList: state.cards.cardsList,
        cardsLoading: state.loading.effects['cards/queryList'],
    };
}
export default connect(mapStateToProps)(List);