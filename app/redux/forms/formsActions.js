import ACTIONS from '../../config/constants/ACTIONS';

export {
    initForm,
    clearForm,
    setFormErrors,
    updateFormField,
    updateFormFields
}

function initForm(formData) {
    return {
        type: ACTIONS.INIT_FORM,
        formData,
    }
}

function clearForm() {
    return {
        type: ACTIONS.CLEAR_FORM,
    }
}

function setFormErrors(formErrors) {
    return dispatch => {
        const timeout = setTimeout(() => {
            dispatch({ type: ACTIONS.CLEAR_FORM_ERRORS })
            clearTimeout(timeout)
        }, 5000)
        dispatch({
            type: ACTIONS.SET_FORM_ERRORS,
            formErrors,
        })
    }
}

function updateFormField(field, value) {
    return {
        type: ACTIONS.UPDATE_FORM_FIELD,
        field,
        value,
    }
}

function updateFormFields(fields) {
    return {
        type: ACTIONS.UPDATE_FORM_FIELDS,
        fields
    }
}