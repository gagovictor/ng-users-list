// https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
export function serializeObject(obj: any) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
