function pToPercent(v) {
    return v.endsWith("p") ? v.slice(0, -1) + "%" : v;
}

function absolution() {
    for (const e of document.getElementsByClassName("abspos")) {
        console.log(`found element ${JSON.stringify(e.classList)}`);
        var top = NaN;
        var left = NaN;
        var width = undefined;
        var height = undefined;
        var rotate = NaN;
        var fontSize = NaN;

        for (const c of e.classList) {
            if (c.startsWith("top")) {
                top = Number(c.substring(3));
            }

            if (c.startsWith("left")) {
                left = Number(c.substring(4));
            }

            if (c.startsWith("width")) {
                width = c.substring(5);
            }

            if (c.startsWith("height")) {
                height = c.substring(6);
            }

            if (c.startsWith("rotate")) {
                rotate = c.substring(6);
            }

            if (c.startsWith("fontSize")) {
                fontSize = c.substring(8);
            }
        }

        e.style.position = "absolute";

        if (top === top) {
            console.log(`found top ${top}`);
            e.style.top = `${top}px`;
        }

        if (left === left) {
            console.log(`found left ${left}`);
            e.style.left = `${left}px`;
        }

        if (width) {
            console.log(`found width ${width}`);
            e.style.width = pToPercent(width);
        }

        if (height) {
            console.log(`found height ${height}`);
            e.style.height = pToPercent(height);
        }

        if (rotate == rotate) {
            console.log(`found rotate ${rotate}`);
            e.style.transform = `rotate(${rotate}deg)`;
        }

        if (fontSize == fontSize) {
            console.log(`found fontSize ${fontSize}`);
            e.style.fontSize = `${fontSize}`;
        }

        e.style.cursor = "grab";
        e.addEventListener("mousedown", (event) => {
            event.preventDefault();
            e.style.cursor = "grabbing";
            e.style.outline = "2px dashed red";
            const offsetX = event.clientX - e.offsetLeft;
            const offsetY = event.clientY - e.offsetTop;

            function onMove(ev) {
                e.style.left = (ev.clientX - offsetX) + "px";
                e.style.top = (ev.clientY - offsetY) + "px";
            }

            function onUp() {
                e.style.cursor = "grab";
                e.style.outline = "";
                const cls = `.top${parseInt(e.style.top)}.left${parseInt(e.style.left)}`;
                navigator.clipboard.writeText(cls);
                console.log(`Copied: ${cls}`);
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
            }

            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        });
    }
}
