function jb_success() {
    SuccessText = "Jailbreak Loaded";

    Status.innerHTML = SuccessText;

    LoadedJailbreak = true;

    SectionsUnlock();
}

function jb_failure() {
    FailureText = "Jailbreak Failed to Load - Reboot and try again";

    Status.innerHTML = FailureText;
}

function jb_loaded() {
    if (c_code_return_value == 179 || c_code_return_value == 0)
        jb_success();
    else
        jb_failure();
}

function jb_loader() {
    LoadingText = "Loading Jailbreak ...";

    Status.innerHTML = LoadingText;

    c_code_loaded = jb_loaded;

    //jailbreak c-code
    jailbreak_c_code();
}
