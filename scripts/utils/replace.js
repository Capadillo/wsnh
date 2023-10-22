export function replace(string, list = {}) {
    Object.keys(list).forEach(key => {
        string = string.replace(`{[${key}]}`, list[key]);
    });

    return string;
}