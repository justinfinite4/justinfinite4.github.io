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

    //jailbreak helpers loader
    jailbreak_helpers_loader();

    //jailbreak malloc loader
    jailbreak_malloc_loader();

    //jailbreak rop loader
    jailbreak_rop_loader();

    //jailbreak syscalls loader
    jailbreak_syscalls_a_loader();

    //jailbreak syscalls2 loader
    jailbreak_syscalls_b_loader();

    setTimeout(jc_loaded, 150);
}
