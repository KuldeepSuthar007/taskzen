import React from 'react';
import style from './Taskcard.module.css'
import { taskedit } from '../../apis/task';


function Taskcard({ id, title, description, status, setStatus, onTaskClick, fetchtasks }) {

    const handleCheckboxChange = async (e) => {

        const status = e.target.checked ? 'completed' : 'pending';

        try {
            await taskedit(id, title, description, status);
            setStatus(status);
            fetchtasks();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const taskCardStyle = {
        textDecoration: status === 'completed' ? 'line-through' : 'none',
        color: status === 'completed' ? '#9c9d9f' : '#202124',
    };

    return (
        <div className={style.card} >
            <div className={style.cardbox} >
                <div className={style.checkbox}> <input
                    type="checkbox"
                    id="status"
                    checked={status === 'completed'}
                    onChange={handleCheckboxChange}
                /></div>
                <div style={{ borderRadius: "12px", padding: "5px", ...taskCardStyle }} onClick={onTaskClick}>
                    <div className={style.title}>{title.slice(0, 18)}</div>
                    <div className={style.content}>{description.slice(0, 20)}</div>
                </div>
            </div>
            <div className={style.status} style={{ ...taskCardStyle }}><p>{status}</p></div>
        </div>
    )
}

export default Taskcard