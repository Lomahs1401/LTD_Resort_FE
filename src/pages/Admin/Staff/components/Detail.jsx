import React, { useState } from "react";


const Detail = ({data, setIemShow}) => {
    const [edit, setEdit ] = useState(false);
    const toggleButtonEdit = () => {
        setEdit(!edit);
    }
    return (
        <div>  
            <button onClick={() => {
                setIemShow(0);
            }}>Back</button>
            <button onClick={toggleButtonEdit}>
                {
                    edit ? 'close' : 'edit'
                }
            </button>
            <h1>sssssssssss</h1>

            {
                edit ? <input value={data.name} />
                : <p>{data.name}</p>
            }

        </div>
    )
};

export default Detail;