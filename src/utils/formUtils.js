export function fullNameValidate(value) {
    let message = "";
    let isValid = false;
    if(!value) message = "Name is required";
    if(value.length < 3) message = "Name must be at least 3 characters";
    if(value.length > 50) message = "Name must be less than 50 characters";
    const matches = value.match(/[^a-zA-Z\s]/gi)
    if(matches && matches.length>0) message = "Name must be only letters";
    if(!message) isValid = true;
    return {isValid, message};
}

export function emailValidate(value) {
    let message = "";
    let isValid = false;
    if(!value) message = "Email is required";
    if(value.length < 3) message = "Email must be at least 3 characters";
    const matches = value.match(/^[a-zA-Z][a-zA-Z0-9.]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/gi)
    if(!matches || matches.length<1) message = "Email malformed";
    if(!message) isValid = true;
    return {isValid, message};
}


export function passwordValidate(value) {
    let message = "";
    let isValid = false;
    if(!value) message = "Password is required";
    if(value.length < 8) message = "Password must be at least 8 characters";
    if(value.length > 50) message = "Password must be less than 50 characters";
    if(!message) isValid = true;
    return {isValid, message};
}


export const formValidations = {
    fullName: fullNameValidate,
    email: emailValidate,
    password: passwordValidate,
}