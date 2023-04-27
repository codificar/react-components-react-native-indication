export const languages = (props) => {
    //If has lang from props, get form props, if not, get from global.
    if (isValidProps(props) && props.lang.includes('pt-BR')) {
        return require('./pt-BR.json');
    }
    if (isValidProps(props) && props.lang.includes("en")) {
        return require('./en.json');
    }
    //Get the lang from props. If hasn't lang in props, default is en
    return require('./en.json');
}

function isValidProps(props) {
    if (props != undefined && props != null && props.lang != undefined && props.lang != null) {
        return true;
    }
    return false;
}