export const languages = (props) => {
    //If has lang from props, get form props, if not, get from global.
    if (isValidProps(props) && props.toLowerCase() === 'pt-br') {
        return require('./pt-BR.json');
    }
    if (isValidProps(props) && props.toLowerCase() === 'en') {
        return require('./en.json');
    }
    if (isValidProps(props) && props.toLowerCase() === 'es-py') {
        return require('./es-PY.json');
    }
    if (isValidProps(props) && props.toLowerCase() === 'es') {
        return require('./es-PY.json');
    }
    //Get the lang from props. If hasn't lang in props, default is en
    return require('./pt-BR.json');
}

function isValidProps(props) {
    if (props != undefined && props != null) {
        return true;
    }
    return false;
}