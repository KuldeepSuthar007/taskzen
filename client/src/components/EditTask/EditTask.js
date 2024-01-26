import React, { useState, useEffect } from 'react';
import style from './EditTask.module.css'
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function EditNote({ title, description, setTitle, setDescription, selectedTask, onDeleteTask, setShowTask, handleEdit }) {

    const id = localStorage.getItem("selectedtask");

    const fetchtasks = async () => {
        try {
            const reqUrl = `${backendUrl}task/detail-task/${id}`;
            const response = await axios.get(reqUrl);
            setTitle(response.data.title);
            setDescription(response.data.description);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchtasks();
    }, []);


    const handleDelete = () => {
        onDeleteTask(id);
    };

    return (
        <>
            <div className={style.popup_box}>
                <div className={style.box}>
                    <div className={style.form} style={{ padding: '10px' }}>
                        <input
                            type="text"
                            value={title}
                            placeholder='Title'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        <textarea
                            placeholder='Write description here...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={style.bottombox}>
                        <button className={style.btn} onClick={handleDelete}>Delete</button>
                        <button className={style.btn} onClick={() => handleEdit(id, title, description)}>Done</button>
                    </div>
                </div>
            </div></>
    )
}


export default EditNote