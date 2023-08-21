export const globalEnvironment = ()=> {
    import.meta.env;
    return ({...import.meta.env});
}