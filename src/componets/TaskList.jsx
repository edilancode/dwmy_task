/* eslint-disable react/prop-types */
import { FaPencilAlt, FaRegTrashAlt} from 'react-icons/fa';


const TaskList = ({tasks, completed, taskHandle, removeTask, resetTasks}) => {

	return (
		<div>
			<button className='checkBtn' onClick={() => resetTasks()}>Reset</button>
			{tasks.map((task) => (
				<div className="task-list" key={task.id} 
					style={{textDecoration: task.isChecked ? "line-through" : ""}}
				>
					<input type="checkbox" name='chck' onChange={() => completed(task.id)}/>
					<p >{task.title}</p>
					<p className="period" >{task.period}</p>
					<p className="date">{task.date}</p>
					<FaPencilAlt 	
						className="pencil" 
						onClick={() => taskHandle(task.id)}
					/>
					<FaRegTrashAlt 
						className="trash" 
						onClick={() => removeTask(task.id)}
					/>
				</div>
			))}
		</div>
	)
};

export default TaskList;