function bl_success() {
    SuccessText = "Bin Loader Loaded";

    Status.innerHTML = SuccessText;

    SectionsUnlock();
}

function bl_failure() {
    FailureText = "Bin Loader Failed to Load";

    Status.innerHTML = FailureText;

    SectionsUnlock();
}

function bl_loaded() {
    bl_success();
}

function bl_loader() {
    LoadingText = "Loading Bin Loader ...";

    Status.innerHTML = LoadingText;

    //mira loader bin converted to js
    mira_loader();

    c_code_loaded = bl_loaded;

    //mira c-code
    setTimeout(mira_c_code, 1000);
}
