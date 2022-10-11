import { useState, useReducer } from 'react';
import { validate } from './validateForm';

import './App.css';

function App() {
  const [input, setInput] = useState({
    fName: '',
    fAge: '',
  });

  const [errorState, dispatchError] = useReducer((state, action) => {
    return { ...state, [action.type]: action.value };
  }, {});

  const handleInputChange = (e) => {
    const { target } = e;
    setInput({ ...input, [target.name]: target.value });
    validate(target, dispatchError);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const inputsToValidate = ['fName', 'fAge'];
    let canSubmit = true;

    for (let inputToValidate of inputsToValidate) {
      const result = validate(e.target.elements[inputToValidate], dispatchError);

      if (!result) {
        canSubmit = false;
      }
    }

    if (canSubmit) {
      alert('The form is done to be submitted :)');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {JSON.stringify(errorState)}
      <label className={errorState.fName ? 'error' : ''}>
        Name:{' '}
        <input
          type='text'
          name='fName'
          value={input.fName}
          onBlur={(e) => validate(e.target, dispatchError)}
          onChange={handleInputChange}
        />
        {errorState.fName && <p>{errorState.fName}</p>}
      </label>
      <label className={errorState.fAge ? 'error' : ''}>
        Age:{' '}
        <input
          type='text'
          name='fAge'
          value={input.fAge}
          onBlur={(e) => validate(e.target, dispatchError)}
          onChange={handleInputChange}
        />
        {errorState.fAge && <p>{errorState.fAge}</p>}
      </label>
      <button type='submit'>Send</button>
    </form>
  );
}

export default App;
