// Insert all the variables and the commands at top level into the "malloc_loader" function

// Global variables

var malloc_nogc;

function malloc(sz)
{
    var arr = new Uint8Array(sz);
    malloc_nogc.push(arr);
    return read_ptr_at(addrof(arr)+0x10);
}

function malloc_loader() {
    malloc_nogc = [];
}
