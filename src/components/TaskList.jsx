import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';



const TaskList=()=>{
    const [tasks, setTasks] = useState([]); 

    const [task, setTask] = useState('');
    const [performer, setPerformer] = useState('');

    const loadTasks = async () => {
        
        const response = await axios.get('http://localhost:10004/priyank/getTasks');
        const tasks =  response["data"];
        setTasks(tasks)

    }

    useEffect(()=>{
        loadTasks()

    },[tasks])
     
    const deleteTask = async (id) => {

        let url = `http://localhost:10004/priyank/deleteTask/${id}`;
        console.log(url);
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (response.ok) {
            const newTasks = tasks.filter(task => task.taskId !== id)
            setTasks(newTasks)
        }

     }
     const logout =  () => {
        console.log(34)
        localStorage.clear()
        window.location.reload();
        
     }

     const updateTask = async (id,task,performer) => {
        let url = `http://localhost:10004/priyank/updateTask/${id}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {  // data is being sent to the api in json format
                "Content-Type": "application/json"
            },
            body: JSON.stringify({task, performer}) // js object into json formatted string 
        },
        
         
        );
       
        if (response.ok) {
            const newTasks = []
            tasks.forEach((taskItem,i) => {
                if (taskItem.taskId === id) {
                    taskItem.task = task
                    taskItem.performer = performer
                }
                newTasks.push(taskItem)
            })
            setTasks(newTasks)
        }

     }

     const makeTask = async () => {
        
        try{

          const response = await axios.post('http://localhost:10004/priyank/makeTask', { task,performer});
          console.log(response.data);
          const addedTask =  response["data"];
          tasks.push(addedTask)
          setTasks(tasks)

        }
        catch(error)
        {
            console.log(error)
        }
     }
    return (  
        
        <div>
           
            <br></br>
            <input type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} />
            <input type="text" placeholder="Performer" value={performer} onChange={(e) => setPerformer(e.target.value)} />
            <button onClick={makeTask}>Add Task</button>
            <br></br>
            {/* <output >    Task         Performer</output> */}
           
            <ul>
	           {
                    tasks.map((task, index) => { // iteration
                         return (
                              <li>
                                 <span>Task =  {task.task}, Performer =  {task.performer}</span>
                                 <button onClick={() => deleteTask(task.taskId)}>Delete</button> 
                                 <button onClick={() => updateTask(task.taskId, prompt('Update task:', task.task), prompt('Update Performer:', task.performer))}>Edit</button>
                                 
                                </li>

                                );
                            })

                }

       </ul>
       <button onClick={() => logout()}>Log Out</button>
          
        </div>
      );
}

export default TaskList;
