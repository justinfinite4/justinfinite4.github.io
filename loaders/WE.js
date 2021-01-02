function we_success() {
    SuccessText = "Webkit Exploit Loaded";

    Status.innerHTML = SuccessText;

    LoadedWebkitExploit = true;

    SectionsUnlock();
}

function we_failure() {
    FailureText = "Webkit Exploit Failed to Load - Reload and try again";

    Status.innerHTML = FailureText;
}

function we_loaded() {
    we_success();
}

function we_loader() {
    LoadingText = "Loading Webkit Exploit ...";

    Status.innerHTML = LoadingText;

    //webkit exploit loader
    webex_loader();

    setTimeout(we_loaded, 150);
}
