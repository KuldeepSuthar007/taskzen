import React from 'react'
import Taskcard from '../Taskcard/Taskcard';

function Tasks({ tasksData, onTaskClick, setStatus, fetchtasks }) {

    return (
        <>
            {
                tasksData.map((item) => {
                    return <Taskcard key={item._id} id={item._id} title={item.title} description={item.description} status={item.status} setStatus={setStatus} onTaskClick={() => onTaskClick(item)} fetchtasks={fetchtasks} />
                })
            }
        </>
    )
}

export default Tasks