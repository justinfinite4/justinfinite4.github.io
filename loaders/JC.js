function jc_success() {
    SuccessText = "Jailbreak Common Loaded";

    Status.innerHTML = SuccessText;

    LoadedJailbreakCommon = true;

    SectionsUnlock();
}

function jc_failure() {
    FailureText = "Jailbreak Common Failed to Load - Reload and try again";

    Status.innerHTML = FailureText;
}

function jc_loaded() {
    jc_success();
}

function jc_loader() {
    LoadingText = "Loading Jailbreak Common ...";

    Status.innerHTML = LoadingText;

    //malloc loader
    malloc_loader();

    //rop loader
    rop_loader();

    //syscalls loader
    syscalls_a_loader();

    //syscalls2 loader
    syscalls_b_loader();

    setTimeout(jc_loaded, 150);
}
