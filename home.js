function ajax() {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        const output = document.getElementById('output');
        if(xhr.readyState === 4 && xhr.status === 200) {
            const res = xhr.responseText;
            console.log(res);
        }
    }

    xhr.open('GET', 'http://localhost:8888/search', true);
    xhr.send(null);
}

document.getElementById('btn').addEventListener('click', ajax);
