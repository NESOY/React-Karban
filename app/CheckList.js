import React, { Component, PropTypes } from 'react';

// 제어 컴포넌트
// 값이나 확인되는 속성을 가지는 폼 컴포넌트
class CheckList extends Component {
    checkInputKeyPress(event) {
        if(event.key === 'Enter'){
            this.props.taskCallbacks.add(this.props.cardId, event.target.value);
            event.target.value = '';
        }
    }

    render(){
        let tasks = this.props.tasks.map((task, taskIndex) => {
            return <li key={task.id} className="checklist__task">
                <input type="checkbox" defaultChecked={task.done} onChange={this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)}/>
                {task.name}
                <a href="#" className="checklist__task--remove" onClick={this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)}/>
            </li>
        });

        return(
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text" className="checklist--add-task" placeholder="Type then hit Enter to add a task" onKeyPress={this.checkInputKeyPress.bind(this)}/>
            </div>
        );
    }
}

CheckList.propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object)
}
export default CheckList;