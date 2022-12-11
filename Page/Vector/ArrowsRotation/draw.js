let points = [new Vec(500, 500), new Vec(900, 700), new Vec(200, 200)];
const dotRadius = 40;
let dragIndex = -1;
let canvas;
function initCanvas() {
    console.log('initCanvas');

    canvas = document.getElementById("canvas");
    let dpr = window.devicePixelRatio;
    let rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleMouseUp);

    draw();
}

function draw() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let o = points[0];
    let a = points[1];
    let b = points[2];

    let vec0 = {"a": o, "b": a};
    let vec1 = {"a": o, "b": b};

    ctx.fillStyle = '#f8f8f8';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#e0e0e0';

    drawPoint(o, ctx);
    drawPoint(a, ctx);
    drawPoint(b, ctx);

    ctx.font = "48px sans-serif";
    ctx.fillStyle = '#ff3333ff';
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#ff3333ff";

    drawVector(vec0, ctx, "A");
    drawVector(vec1, ctx, "B");

    drawDirection(a, b, o, ctx);

    ctx.fillStyle = '#808080';

    drawCrossProduct(a, b, o, ctx);
}

function drawCrossProduct(a, b, o, ctx) {
    let oa = new Vec(a.x - o.x, a.y - o.y);
    let ob = new Vec(b.x - o.x, b.y - o.y);

    let product = crossProduct(oa, ob);
    ctx.fillText("crossProduct: " + product, 0.1 * canvas.width, 0.9 * canvas.width);
}

function drawDirection(a, b, o, ctx) {
    let oa = new Vec(a.x - o.x, a.y - o.y);
    let ob = new Vec(b.x - o.x, b.y - o.y);

    let startAngle = Math.atan2(oa.y, oa.x);
    let endAngle = Math.atan2(ob.y, ob.x);

    let clockWise = isClockWise(oa, ob);
    let k;
    if (clockWise) {
        ctx.strokeStyle = "#0066ffff";
        k = 1;
    } else {
        ctx.strokeStyle = "#55d400ff";
        k = -1;
    }

    ctx.lineWidth = 8;

    let r = 100;

    ctx.beginPath();
    ctx.arc(o.x, o.y, r, startAngle, endAngle, !clockWise);
    ctx.stroke();

    let p = PolarVec(r, endAngle).add(o);

    drawArrow(p, endAngle + k * 0.45 * Math.PI, 30, ctx);
}

function drawPoint(p, ctx) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, dotRadius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
}

function handleMouseDown(event) {
    let vec = getWorld(event);

    let i = 0;
    let index = -1;
    const rr = dotRadius * dotRadius;
    let min = rr + 1;
    while (i < points.length) {
        let p = points[i];
        let dx = (vec.x - p.x);
        let dy = (vec.y - p.y);
        let dd = dx * dx + dy * dy;
        if (dd < min) {
            min = dd;
            index = i;
        }
        i++;
    }

    dragIndex = index >= 0 ? index : -1;
}

function handleMouseMove(event) {
    if (dragIndex === -1) { return }
    let vec = getWorld(event);
    points[dragIndex] = vec;
    draw();
}

function handleMouseUp(event) {
    if (dragIndex === -1) { return }
    dragIndex = -1;
    draw();
}
function getWorld(event) {
    let rect = canvas.getBoundingClientRect();
    let dpr = window.devicePixelRatio;

    let x = Math.round(dpr * (event.pageX - rect.x));
    let y = Math.round(dpr * (event.pageY - rect.y));

    return new Vec(x, y);
}