// invoke ready and pass in a callback function
ready(function () {

    console.log("Client script loaded.");

    // a function declaration inside of a callback ... which takes a callback function :O
    function ajaxGET(url, callback) {

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

    document.querySelectorAll(".clear").forEach(function (currentElement, currentIndex, listObj) {
        //console.log(currentElement, currentIndex, listObj);
        currentElement.addEventListener("click", function (e) {

            for (let i = 0; i < this.parentNode.childNodes.length; i++) {
                if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                    if (this.parentNode.childNodes[i].getAttribute("class") == "ajax-stuff") {
                        this.parentNode.childNodes[i].innerHTML = "";
                        break;
                    }
                }
            }

        });
    });

    ajaxGET("/fact", function (data) {
        console.log("before parsing", data);
        // this call is JSON so we have to parse it:
        let parsedData = JSON.parse(data);
        let str = "<p>QUICK RECIPE FACTS!</p><br><table>";
        for (let i = 0; i < parsedData.length; i++) {
            let item = parsedData[i];
            str += "<tr><td>" + item["Dish"] + "</td><td>" + item["Prep"] + "</td><td>" + item["Cook"] +
                "</td><td>" + item["Total"] + "</td><td>" + item["Makes"] + "</td></tr><tr>";
        }
        str += "</table>";
        let d1 = document.getElementById("i0");
        d1.innerHTML = str;
        console.log("after parsing", parsedData);
    });


    document.querySelector("#ingredientsHTML").addEventListener("click", function (e) {
        ajaxGET("/ingredients?format=html", function (data) {
            console.log(data);
            // since it's HTML, let's drop it right in
            document.getElementById("ingredients-html").innerHTML = data;
        });
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