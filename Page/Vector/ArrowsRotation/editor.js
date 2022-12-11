function isClockWise(a, b) {
    let product = crossProduct(a, b);
    return product > 0;
}

function crossProduct(a, b) {
    return a.x * b.y - a.y * b.x;
}