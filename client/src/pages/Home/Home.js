import React from 'react'
import axios from "axios";
import style from './Home.module.css'
import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import plus from '../../asset/plus.png'
import CreateNote from '../../components/CreateTask/CreateTask';
import EditNote from '../../components/EditTask/EditTask';
import { taskpost } from '../../apis/task';
import { taskdelete } from '../../apis/task';
import { taskedit } from '../../apis/task';
import Tasks from '../../components/Tasks/Tasks';
const backendUrl = process.env.REACT_APP_BACKEND_URL;


function Home() {
    const [login, setLogin] = useState(false);
    const [showTaskform, setShowTaskform] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [tasksData, setTasksData] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');


    const handledone = async (e) => {
        e.preventDefault();
        try {
            await taskpost(title, description, status);
            setShowTaskform(false);
            setTitle("");
            setDescription("");
            await fetchtasks();
        } catch (error) {
            console.error(error);
        }
    }

    const handleshowTask = (task) => {
        setShowTask(true);
        localStorage.setItem("selectedtask", task._id);
        setSelectedTask(task);
    };

    const checktoken = () => {
        let token = localStorage.getItem("token");
        if (token) {
            setLogin(true);
            fetchtasks();
        } else {
            setLogin(false);
        }
    };

    const fetchtasks = async () => {
        try {
            const id = localStorage.getItem("user_id");
            const reqUrl = `${backendUrl}task/gettask/${id}`;
            const response = await axios.get(reqUrl, {
                params: {
                    search: searchQuery,
                },
            });
            setTasksData(response.data.tasks);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (id, title, description) => {
        try {
            await taskedit(id, title, description);
            setShowTask(false);
            await fetchtasks();
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            const shouldDelete = window.confirm('Are you sure you want to delete this task?');
            if (shouldDelete) {
                await taskdelete(taskId);
                setShowTask(false);
                fetchtasks();
            }
        } catch (error) {
            console.log(error)
        }

    }



    useEffect(() => {
        checktoken();
    }, [setShowTask, setShowTaskform, setTasksData, setLogin]);


    return (
        <div className={style.main}>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} login={login} setlogin={setLogin} fetchtasks={fetchtasks} />
            <div className='midcontainer'>
                {showTask && <EditNote handleEdit={handleEdit} title={title} description={description} setTitle={setTitle} setDescription={setDescription} setStatus={setStatus} selectedTask={selectedTask} onDeleteTask={handleDeleteTask} setShowTask={setShowTask} />}
                {login ? <div className='maincontainer'>
                    <div className='createbtn' onClick={() => setShowTaskform(true)}>
                        <img src={plus} alt="" />
                    </div>

                    {showTaskform && <CreateNote setTitle={setTitle} setDescription={setDescription} setStatus={setStatus} setShowTaskform={setShowTaskform} handledone={handledone} />}
                    <div className='Tasks' >
                        <Tasks setStatus={setStatus} tasksData={tasksData} onTaskClick={handleshowTask} fetchtasks={fetchtasks} />
                    </div>
                </div>
                    :
                    <h4 className='taskmsg'> Please log in to create your task.</h4>}
            </div>
        </div>
    )
}

export default Home