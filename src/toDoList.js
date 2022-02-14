import React, {Component, Fragment} from "react";

import './toDoList.css'

import ToDoItem from './toDoItem'
import Text from "./Text";

class toDoList extends Component {
    constructor(props) {
        super(props);
        //当组件的state或者props发生改变时，render函数会被重新执行
        this.state = {
            inputVal: '',
            list: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //在组件即将挂载在页面上是执行
    // componentWillMount() {
    //     console.log('componentWillMount')
    // }

    static getDerivedStateFormProps() {
        console.log('getDerivedStateFormProps')
    }

    //组件被挂载到页面自动执行
    componentDidMount() {
        console.log('componentDidMount')
    }

    //组件被更新之前，他会自动执行
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return true;
    }

    //组件被更新之前，他会自动执行，但是他在shouldComponentUpdate之后执行
    //如果shouldComponentUpdate返回true他才执行
    //如果返回false，这个函数就不会被执行了
    UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('componentWillUpdate')
    }

    //组件更新之后执行
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate')
    }

    render() {
        const {list} = this.state;
        console.log('render')
        return (
            <Fragment>
                <div>
                    <label htmlFor={"input"}>输入框</label>
                    <input id={"input"} className="input" value={this.state.inputVal}
                           onChange={this.handleChange} type="text"/>
                    <button onClick={this.handleSubmit}>提交</button>
                </div>
                <ul ref={(ul) => {
                    this.ul = ul
                }}>
                    {
                        list.map((item, index) => {
                            // return (<li dangerouslySetInnerHTML={{__html: item}}
                            //             key={index}
                            //             onClick={this.handleDeleteItem.bind(this, index)}>
                            // </li>)
                            return (
                                <ToDoItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    deleteItem={this.handleDeleteItem.bind(this)}
                                />
                            )
                        })
                    }
                </ul>
                <Text content={this.state.inputVal}/>
            </Fragment>
        )
    }

    handleChange(e) {
        const val = e.target.value;
        this.setState(() => ({
            inputVal: val
        }));
        // this.setState({
        //     inputVal: e.target.value
        // })
    }

    handleSubmit() {
        // this.state.list.unshift(this.state.inputVal)
        // this.setState({
        //     list: [this.state.inputVal, ...this.state.list],
        //     inputVal: ''
        // })

        //this.setState是异步的 第二个参数是成功的回调函数 等待dom渲染完成执行 类似vue的this.$nextTick
        this.setState((prevState) => ({
            list: [prevState.inputVal, ...prevState.list],
            inputVal: ''
        }), () => {
            console.log(this.ul.querySelectorAll('div').length)
        });

        console.log(this.state.list)
    }

    handleDeleteItem(index) {
        //immutable
        //state 不允许我们做任何的改变
        this.setState((prevState) => {
            const list = [...prevState.list];
            list.splice(index, 1);
            return {list}
        });

        // this.setState({
        //     list
        // })
        // this.state.list.splice(index, 1)
    }
}

export default toDoList;

