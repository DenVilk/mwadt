import { useEffect, useState } from "react";

const EditableField = ({editable, value, save}) => {
    const [va, setValue] = useState(value);
    
    useEffect(()=>{
        value = va;
    }, [save])

    return (
        <td>
            {
                !editable
                ?
                value
                :
                <>
                <input type="text" onInput={(e) => {setValue(e.target.value);console.log(va);}} defaultValue={va}/>
                </>
            }
        </td>
    )
};

export default EditableField;