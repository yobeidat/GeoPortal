const input = document.querySelector('#fileInput');
const form = document.querySelector('#uploadForm');
form.addEventListener('submit', upload);

async function upload(event) {
    event.preventDefault();

    var data = new FormData()
    data.append('layerExcelFile', input.files[0])

    const result = await fetch('/files/upload', {
        method: 'POST',
        body: data
    }).then((res) => res.json());

    if (result.status === "ok") {
        toastr.success('The file has been uploaded successfully');
        input.value = "";
    } else {
        toastr.error(result.message);
        input.value = "";
    }
}