export const validate = (target, dispatchError) => {
  const formName = target.name;
  const formValue = target.value;
  let success = true;

  dispatchError({ type: formName, value: '' });

  if (formName === 'fName') {
    if (formValue.length === 0) {
      success = false;
      dispatchError({ type: formName, value: 'El valor es requerido' });
    }
  }

  if (formName === 'fAge') {
    const age = Number(formValue);

    if (formValue.length === 0) {
      success = false;
      dispatchError({ type: formName, value: 'El valor es requerido' });
    } else if (Number.isNaN(age)) {
      success = false;
      dispatchError({ type: formName, value: 'La edad debe ser un número' });
    } else if (age < 1) {
      success = false;
      dispatchError({
        type: formName,
        value: 'La edad no puede ser menor a 1',
      });
    }
  }

  return success;
};
