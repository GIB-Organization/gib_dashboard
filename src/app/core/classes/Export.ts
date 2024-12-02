export class Export{
    fileDownload(fileData:string, fileName:string, fileType:string = 'xlsx'){
        const byteString = window.atob(fileData);
        const byteArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);   
        }
        const blob = new Blob([byteArray], {type: `application/octet-stream`});
        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = `${fileName}.${fileType}`;
        anchor.click();
        URL.revokeObjectURL(blobUrl);
    }
}