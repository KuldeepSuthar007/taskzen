import React from 'react'
import style from './CreateTask.module.css'

function CreateNote({ Title, description, setTitle, setDescription, handledone }) {


    return (
        <div className={style.card}  >
            <div className={style.form} style={{ borderRadius: "4px" }}>
                <input
                    type="text"
                    value={Title}
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
                <button className={style.btn} onClick={handledone} >Done</button>
            </div>

        </div>
    )
}

export default CreateNote