import moment from 'moment';
import Header from './componets/Header';
import TaskList from './componets/TaskList';
import { useState, useEffect } from 'react';
import './App.css';
import FormInput from './componets/FormInput';


function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title:"9am meeting",
      period: "Day",
      date: '05 13 2023',
      isChecked: false,
    }, 
    {
      id: 2,
      title:"Finish visual Design",
      period: "Week",
      date: '10/03/2023',
      isChecked: false,
    },
    {
      id: 3,
      title: "Do research",
      period: "Month",
      date: '10/02/2023',
      isChecked: false,
    },
    {
      id: 4,
      title: "Reading about best pratices in React",
      period: "Year",
      date: '07/08/2022',
      isChecked: false,
    },
]);
    
  const time = moment();
  const dayMonthYear = time.format('MMMM/DD/YYYY');
  
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(null);
  const [period, setPeriod] = useState("");
  const [mainDisplay, setMainDisplay] = useState(time.format('dddd'))
  const dates = time.format('MM/DD/YYYY');
  
  const handleSubmit = (e) => {
    e.preventDefault();
      if (edit) {
        editTask(value);
        setEdit(null);
        updateTask();
        setValue("");
      } else if (value) {
        AddTask(value, period, dates);
        updateTask();
        setValue("");
      }
  };

  useEffect(() => {
    if (!localStorage.getItem('localTasks')) {
      localStorage.setItem('localTasks', JSON.stringify([...tasks]));
    } else {
      const storedList = JSON.parse(localStorage.getItem('localTasks'));
      setTasks(storedList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTask = () => {
    const newTask = [...JSON.parse(localStorage.getItem('localTasks'))];
    const filtered = newTask.filter(task => task.period === period ? task : null)
    setTasks(filtered);
  }

  const AddTask = (title, period, date) => {
    const newTasks = [...JSON.parse(localStorage.getItem('localTasks')), {
      id: Math.floor(Math.random() * 1000),
      title,
      period,
      date,
      isChecked: false,
    },];
    localStorage.setItem('localTasks', JSON.stringify([...newTasks]));
    setPeriod(period);
   
  };

  const taskHandle = (id) => {
    const findTask = tasks.find((task) => task.id === id);
      if (findTask) {
        setEdit(findTask);
        setValue(findTask.title);
      }
  };

  const completed = (id) => {
    const newTasks = JSON.parse(localStorage.getItem('localTasks'));
    newTasks.map((task) => task.id === id ? (task.isChecked = !task.isChecked) : task);
    setTasks(newTasks);
    localStorage.setItem('localTasks', JSON.stringify([...newTasks]));
    updateTask();
  };
    
  const editTask = () => {
    const storedList = JSON.parse(localStorage.getItem('localTasks'));
    const newTask = [...storedList];
      newTask.map(task => {
        if (task.id == edit.id)
          {task.title = value}
      })
      localStorage.setItem('localTasks', JSON.stringify([...newTask]))
      setTasks(newTask);
    };

  const removeTask = (id) => {
    const storedList = JSON.parse(localStorage.getItem('localTasks'));
    const newTasks = [...storedList];
    const result = confirm("Want to delete?");
    if (result) {
      const filteredTasks = newTasks.filter(task => task.id !== id ? task : null);
    localStorage.setItem('localTasks', JSON.stringify([...filteredTasks]));
      updateTask();
      setValue("");
    }
    
    };

  const resetTasks = () => {
      localStorage.setItem('localTasks', JSON.stringify([]));
      setTasks([]);
    }

      return (
      <div className='app'>
        <Header 
          time={time} 
          dayMonthYear={dayMonthYear}
          tasks={tasks}
          setTasks={setTasks}
          setPeriod={setPeriod}
          mainDisplay={mainDisplay}
          setMainDisplay={setMainDisplay}
          />
        <FormInput 
          handleSubmit={handleSubmit} 
          value={value}
          setValue={setValue}
        />
        <TaskList 
          tasks={tasks} 
          completed={completed}
          taskHandle={taskHandle}
          removeTask={removeTask}
          resetTasks={resetTasks}
        />
     </div> 
  )
}

export default App;
