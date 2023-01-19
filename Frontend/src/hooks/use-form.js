import { useState } from "react";

function useFrom(inputs) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputsChange = (event) => {
    event.presist();
    setValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const validateValues = (event, name, value) => {};

  return { values, errors, handleInputsChange, validateValues };
}

export default useFrom;
