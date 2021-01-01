function pl_success() {
    SuccessText = PayloadName + ' ' + "Loaded";

    Status.innerHTML = SuccessText;

    SectionsUnlock();
}

function pl_failure() {
    FailureText = PayloadName + ' ' + "Failed to Load";

    Status.innerHTML = FailureText;

    SectionsUnlock();
}

function pl_loaded() {
    pl_success();
}

function pl_loader() {
    LoadingText = "Loading" + ' ' + PayloadName + ' ' + "...";

    Status.innerHTML = LoadingText;

    //mira loader bin converted to js
    mira_loader();

    c_code_loaded = pl_loaded;

    setTimeout(function () {
        if (PayloadPath.slice((PayloadPath.lastIndexOf(".") - 1 >>> 0) + 2) != "js") {
            var SourceXMLHttpRequest = new XMLHttpRequest();

            SourceXMLHttpRequest.responseType = "arraybuffer";
            SourceXMLHttpRequest.open("GET", PayloadPath, true);
            SourceXMLHttpRequest.send();
            SourceXMLHttpRequest.onreadystatechange = function () {
                if (SourceXMLHttpRequest.readyState == 4) {
                    var Payload;
                    var PayloadTemp = new Uint8Array(SourceXMLHttpRequest.response.byteLength);

                    PayloadTemp.set(new Uint8Array(SourceXMLHttpRequest.response), 0);
                    Payload = new Uint32Array(PayloadTemp);

                    window.mira_blob_2_len = "0x" + SourceXMLHttpRequest.response.byteLength.toString(16);
                    window.mira_blob_2 = malloc(window.mira_blob_2_len);
                    write_mem(window.mira_blob_2, Payload);

                    //mira c-code
                    setTimeout(mira_c_code, 500);
                }
            };
        } else {
            PayloadFunction();

            //mira c-code
            setTimeout(mira_c_code, 500);
        }
    }, 500);
}
