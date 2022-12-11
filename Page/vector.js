function Vec(x, y) {
    let vec = {};
    vec.x = x;
    vec.y = y;

    vec.add = function (vec) {
        return new Vec(this.x + vec.x, this.y + vec.y);
    }

    return vec;
}

function PolarVec(radius, angle) {
    let x = radius * Math.cos(angle)
    let y = radius * Math.sin(angle);
    return new Vec(x, y);
}

function drawVector(vec, ctx, name) {
    let angle = Math.atan2(vec.b.y - vec.a.y, vec.b.x - vec.a.x);
    let angleLeft = angle + Math.PI * 9 / 10;
    let angleRight = angle - Math.PI * 9 / 10;

    let leftPoint = vec.b.add(PolarVec(40, angleLeft));
    let rightPoint = vec.b.add(PolarVec(40, angleRight));

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(vec.a.x, vec.a.y);
    ctx.lineTo(vec.b.x, vec.b.y);

    ctx.moveTo(leftPoint.x, leftPoint.y);
    ctx.lineTo(vec.b.x, vec.b.y);
    ctx.lineTo(rightPoint.x, rightPoint.y);

    ctx.stroke();

    if (name !== "") {
        let textPoint = vec.b.add(PolarVec(40, angle));
        let ba = new Vec(vec.b.x - vec.a.x, vec.b.y - vec.a.y);
        let text = name + "(" + ba.x + ", " + ba.y + ")";
        ctx.fillText(text, textPoint.x, textPoint.y);
    }
}

function drawArrow(p, angle, length, ctx) {
    let angleLeft = angle + Math.PI * 9 / 10;
    let angleRight = angle - Math.PI * 9 / 10;

    let leftPoint = p.add(PolarVec(length, angleLeft));
    let rightPoint = p.add(PolarVec(length, angleRight));

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();

    ctx.moveTo(leftPoint.x, leftPoint.y);
    ctx.lineTo(p.x, p.y);
    ctx.lineTo(rightPoint.x, rightPoint.y);

    ctx.stroke();
}