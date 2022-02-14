import React, {Component} from "react";

class Text extends Component {
    constructor(props) {
        super(props);
    }
    //当父组件的render函数被运行时，它的子组件的render都将被重新运行
    render() {
        console.log('Text render')
        return <div>{this.props.content}</div>
    }
}

export default Text;
