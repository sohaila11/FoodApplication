import { useState } from "react";

export function useInput(defaultValue,validationFn){
    const[UserValue,setUserValue]=useState(defaultValue);
    const[didEdit,setDidEdit]=useState(false);

    const valueIsValid=validationFn(UserValue);

    function handleUserValue(event){
    setUserValue(event.target.value);
    setDidEdit(false);
    }
    function handleBlur(){
        setDidEdit(true);
    }
    function handleReset(){
        setUserValue('');
    }
    return{
        value:UserValue,
        handleUserValue,
        handleBlur,
        hasError: didEdit && !valueIsValid,
        handleReset,
    };
}