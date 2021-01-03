// Insert all the variables and the commands at top level into the "jailbreak_malloc_loader" function

// Global variables

var malloc_nogc;

function malloc(sz) {
    var arr = new Uint8Array(sz);
    malloc_nogc.push(arr);
    return read_ptr_at(addrof(arr) + 0x10);
}

function jailbreak_malloc_loader() {
    malloc_nogc = [];
}
