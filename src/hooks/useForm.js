import { useState } from 'react';

export const useForm = ( initialForm = {} , formValidations= {}) => {

    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        let valid = {isValid: true, message: ""};
        if(formValidations[ name ]) valid = formValidations[ name ](value);
        setFormState({
            ...formState,
            [ name ]: value,
            [ `${ name }Valid` ]: valid
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}