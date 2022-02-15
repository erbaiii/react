import React, {Component} from "react";

// import propTypes from 'prop-types'

import PropTypes from 'prop-types';

class toDoItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        console.log('children render');
        const {item, text} = this.props;
        return (
            // <li key={this.props.key}>{this.props.item}</li>
            <div onClick={this.handleClick}>{text}-{item}</div>
        )
    }

    handleClick() {
        const {deleteItem, index} = this.props;
        deleteItem(index);
        // this.props.deleteItem(this.props.index);
    }

    //一个组件从父组件接受了参数
    //只要父组件的render函数被执行了，子组件的这个生命周期函数就会被执行
    //如果这个组件第一次存在于父组件中，不会执行
    //如果这个组件之前已经存在于父组件中，才会执行
    UNSAFE_componentWillReceiveProps() {
        console.log('children componentWillReceiveProps')
    }

    //  性能优化 因为父组件render函数执行 子组件的render函数也会重新执行
    //  setState是异步函数多次操作改为一次
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.item !== this.props.item;
    }

    //  当这个组件即将被从页面剔除会自动执行
    componentWillUnmount() {
        console.log('children componentWillUnmount');
    }
}

toDoItem.propTypes = {
    text: PropTypes.string.isRequired,
    item: PropTypes.string
}
toDoItem.defaultProps = {
    text: 'hello world'
}

export default toDoItem;
