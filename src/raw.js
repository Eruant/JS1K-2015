/**
 * JS1K
 *
 * @author Matt Gale
 *
 * canvas: `window.a`
 * body: `window.b`
 * context: `window.c`
 */

(function (a, b, c) {

    var d = 32,                                 // tileSize
        e = 16,                                 // halfTileSize
        f = 4,                                  // stroke width
        g = '#000',                             // background color
        h = '#fff',                             // forground color
        i = c.createLinearGradient(0, 0, 0, e), // vertical color
        j = c.createLinearGradient(0, 0, e, 0), // horizontal color
        k = 10,                                 // map width
        l = [
            4,  5,  5,  5, 11,  5,  7,  5,  5,  1,
            6,  0,  0,  0,  6,  0,  6,  0,  0,  6,
            18, 5, 11,  5,  2,  0,  3,  1,  0,  6,
            6,  0,  6,  0,  0,  0,  0,  3,  5, 12,
            14, 5, 17,  5,  5,  1,  0,  0,  0,  6,
            6,  0,  0,  0,  0,  3,  5,  5,  5,  8,
            14, 5,  5,  1,  0,  0,  0,  0,  0,  6,
            6,  0,  0,  6,  0,  0,  4,  5,  5,  2,
            6,  0,  0,  6,  0,  0,  6,  0,  0,  0,
            3,  5,  5,  9,  5,  5,  2,  0,  0,  0
        ],                                      // map
        m = l.length;                           // map length

    function n() {

        var i = 0,
            x = 0,
            y = 0;

        c.fillStyle = g;
        c.fillRect(0, 0, a.width, a.height);

        for(; i < m; i++) {
            c.fillStyle = h;
            c.strokeStyle = h;

            switch (l[i]) {

                // corners
                case 1:  nd(x, y, 2, 0); break;
                case 2:  nd(x, y, 2, 1); break;
                case 3:  nd(x, y, 2, 2); break;
                case 4:  nd(x, y, 2, 3); break;

                // straights
                case 5:  nd(x, y, 1, 0); break;
                case 6:  nd(x, y, 1, 1); break;

                // points
                case 7:  nd(x, y, 3, 0); break;
                case 8:  nd(x, y, 3, 1); break;
                case 9:  nd(x, y, 3, 2); break;
                case 10: nd(x, y, 3, 3); break;

                // joins
                case 11: nd(x, y, 4, 0); break;
                case 12: nd(x, y, 4, 1); break;
                case 13: nd(x, y, 4, 2); break;
                case 14: nd(x, y, 4, 3); break;

                // points (closed)
                case 15: nd(x, y, 5, 0); break;
                case 16: nd(x, y, 5, 1); break;
                case 17: nd(x, y, 5, 2); break;
                case 18: nd(x, y, 5, 3); break;
            }

            x += d;

            if ((i + 1) % k === 0) {
                x = 0;
                y += d;
            }
        }
        requestAnimationFrame(n.bind(this));
    }

    // draw track type
    function nd(x, y, type, version) {

        c.strokeStyle = h;
        c.lineWidth = f;
        c.save();
        c.translate(x + e, y + e);
        c.beginPath();

        switch (version) {
            case 1: c.rotate(Math.PI * 0.5); break;
            case 2: c.rotate(Math.PI); break;
            case 3: c.rotate(Math.PI * 1.5); break;
        }

        switch (type) {
            // straights
            case 1:
                c.moveTo(-e, 0);
                c.lineTo(e, 0);
                break;
            // corners
            case 2:
                c.moveTo(-e, 0);
                c.bezierCurveTo(-e, 0, 0, 0, 0, e);
                break;
            // points
            case 3:
            case 4:
                if (type === 3) {
                    c.strokeStyle = i;
                } else if (type === 4) {
                    c.scale(-1, 1);
                }
                c.moveTo(-e, 0);
                c.bezierCurveTo(-e, 0, 0, 0, 0, e);
                c.stroke();
                c.strokeStyle = h;
                c.beginPath();
                c.moveTo(-e, 0);
                c.lineTo(e, 0);
                break;
            case 5:
                c.strokeStyle = j;
                c.moveTo(-e, 0);
                c.lineTo(e, 0);
                c.stroke();
                c.strokeStyle = h;
                c.beginPath();
                c.moveTo(-e, 0);
                c.bezierCurveTo(-e, 0, 0, 0, 0, e);
                break;
        }

        c.stroke();
        c.restore();

    }

    i.addColorStop('0', g);
    i.addColorStop('1', h);
    j.addColorStop('0', g);
    j.addColorStop('1', h);

    addEventListener('click', function () {
        // flip the track
        for (var i = 0; i < m; i++) {
            switch (l[i]) {
                case  7: l[i] = 15; break;
                case  8: l[i] = 16; break;
                case  9: l[i] = 17; break;
                case 10: l[i] = 18; break;
                case 15: l[i] =  7; break;
                case 16: l[i] =  8; break;
                case 17: l[i] =  9; break;
                case 18: l[i] = 10; break;
            }
        }
    }, false);

    new n();

}(a, b, c));
