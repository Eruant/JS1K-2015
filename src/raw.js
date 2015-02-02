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

    var tileSize = 32;
    var halfTileSize = tileSize * 0.5;
    var strokeWidth = tileSize * 0.2;

    var colors = {
        b: '#000',
        f: '#fff',
        vf: c.createLinearGradient(0, 0, 0, halfTileSize),
        hf: c.createLinearGradient(0, 0, halfTileSize, 0)
    };

    colors.vf.addColorStop('0', '#000');
    colors.vf.addColorStop('1', '#fff');
    colors.hf.addColorStop('0', '#000');
    colors.hf.addColorStop('1', '#fff');

    /**
     * points:
     * 7 = 15
     * 8 = 16
     * 9 = 17
     * 10 = 18
     */

    var map = {
        width: 10,
        data: [
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
        ]
    };

    var train = function (startPosition) {
        this.position = startPosition;
    };

    train.prototype.move = function () {
        // TODO move to next space
        // trains can only move forward or right
    };

    var hyperTrain = function () {

        var self = this;

        this.clear();

        window.addEventListener('click', function () {
            self.flipTrack();
        }, false);

        this.tick();
    };

    hyperTrain.prototype.clear = function () {
        c.fillStyle = colors.b;
        c.fillRect(0, 0, a.width, a.height);
    };

    hyperTrain.prototype.tick = function () {
        this.clear();
        this.update();
        this.draw();
        requestAnimationFrame(this.tick.bind(this));
    };

    hyperTrain.prototype.update = function () {
    };

    hyperTrain.prototype.flipTrack = function () {

        var i = 0,
            len = map.data.length;

        for (; i < len; i++) {
            switch (map.data[i]) {
                case  7: map.data[i] = 15; break;
                case  8: map.data[i] = 16; break;
                case  9: map.data[i] = 17; break;
                case 10: map.data[i] = 18; break;
                case 15: map.data[i] =  7; break;
                case 16: map.data[i] =  8; break;
                case 17: map.data[i] =  9; break;
                case 18: map.data[i] = 10; break;
            }
        }
    };

    hyperTrain.prototype.draw = function () {
        this.drawTrack();
    };

    hyperTrain.prototype.drawTrack = function () {

        var i = 0,
            len = map.data.length,
            x = 0,
            y = 0;

        for (; i < len; i++) {

            c.fillStyle = colors.f;
            c.strokeStyle = colors.f;

            switch (map.data[i]) {

                // corners
                case 1:  this.drawTrackType(x, y, 2, 0); break;
                case 2:  this.drawTrackType(x, y, 2, 1); break;
                case 3:  this.drawTrackType(x, y, 2, 2); break;
                case 4:  this.drawTrackType(x, y, 2, 3); break;

                // straights
                case 5:  this.drawTrackType(x, y, 1, 0); break;
                case 6:  this.drawTrackType(x, y, 1, 1); break;

                // points
                case 7:  this.drawTrackType(x, y, 3, 0); break;
                case 8:  this.drawTrackType(x, y, 3, 1); break;
                case 9:  this.drawTrackType(x, y, 3, 2); break;
                case 10: this.drawTrackType(x, y, 3, 3); break;

                // joins
                case 11: this.drawTrackType(x, y, 4, 0); break;
                case 12: this.drawTrackType(x, y, 4, 1); break;
                case 13: this.drawTrackType(x, y, 4, 2); break;
                case 14: this.drawTrackType(x, y, 4, 3); break;

                // points (closed)
                case 15: this.drawTrackType(x, y, 5, 0); break;
                case 16: this.drawTrackType(x, y, 5, 1); break;
                case 17: this.drawTrackType(x, y, 5, 2); break;
                case 18: this.drawTrackType(x, y, 5, 3); break;
            }

            x += tileSize;

            if ((i + 1) % map.width === 0) {
                x = 0;
                y += tileSize;
            }
        }
    };

    hyperTrain.prototype.drawTrackType = function (x, y, type, version) {

        c.strokeStyle = colors.f;
        c.lineWidth = strokeWidth;
        c.save();
        c.translate(x + halfTileSize, y + halfTileSize);
        c.beginPath();

        switch (version) {
            case 1: c.rotate(Math.PI * 0.5); break;
            case 2: c.rotate(Math.PI); break;
            case 3: c.rotate(Math.PI * 1.5); break;
        }

        switch (type) {
            // straights
            case 1:
                c.moveTo(-halfTileSize, 0);
                c.lineTo(halfTileSize, 0);
                break;
            // corners
            case 2:
                c.moveTo(-halfTileSize, 0);
                c.bezierCurveTo(-halfTileSize, 0, 0, 0, 0, halfTileSize);
                break;
            // points
            case 3:
            case 4:
                if (type === 3) {
                    c.strokeStyle = colors.vf;
                } else if (type === 4) {
                    c.scale(-1, 1);
                }
                c.moveTo(-halfTileSize, 0);
                c.bezierCurveTo(-halfTileSize, 0, 0, 0, 0, halfTileSize);
                c.stroke();
                c.strokeStyle = colors.f;
                c.beginPath();
                c.moveTo(-halfTileSize, 0);
                c.lineTo(halfTileSize, 0);
                break;
            case 5:
                c.strokeStyle = colors.hf;
                c.moveTo(-halfTileSize, 0);
                c.lineTo(halfTileSize, 0);
                c.stroke();
                c.strokeStyle = colors.f;
                c.beginPath();
                c.moveTo(-halfTileSize, 0);
                c.bezierCurveTo(-halfTileSize, 0, 0, 0, 0, halfTileSize);
                break;
        }

        c.stroke();
        c.restore();
    };

    // TODO draw methods
    // - train (horizontal, vertical, corners);

    new hyperTrain();

    return false;

}(a, b, c));
