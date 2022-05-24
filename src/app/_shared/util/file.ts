export function downloadDataAsFile(content: string, filename: string, ext: string) {
    let encoded = 'data:text/'+ext+';charset=utf-8,'+encodeURI(content);
    let link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', filename+'.'+ext);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
