
// invoke ready and pass in a callback function
ready(function () {

    console.log("Client script loaded.");

    // a function declaration inside of a callback ... which takes a callback function :O
    function contentGet(url, callback) {

        const xhr = new XMLHttpRequest();
        console.log("xhr", xhr);
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    contentGet("http://localhost:8000/table-user", function (data) {
        console.log(data);
        // since it's HTML, let's drop it right in
        document.getElementById("info").innerHTML = data;
    });

    contentGet("http://localhost:8000/table-timeline", function (data) {
        console.log(data);
        // since it's HTML, let's drop it right in
        document.getElementById("i0").innerHTML = data;
    });

});



function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}