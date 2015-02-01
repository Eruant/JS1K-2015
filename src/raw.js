/**
 * JS1K
 *
 * @author Matt Gale
 *
 * canvas: `window.a`
 * body: `window.b`
 * context: `window.c`
 */

var hyperTrain = function () {
    this.clear();
};

hyperTrain.prototype.clear = function () {
    c.fillRect(0, 0, a.width, a.height);
};

new hyperTrain();
