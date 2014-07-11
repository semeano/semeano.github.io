// Generated by CoffeeScript 1.6.2
var BreakDemo, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BreakDemo = (function(_super) {
  __extends(BreakDemo, _super);

  function BreakDemo() {
    _ref = BreakDemo.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BreakDemo.prototype.setup = function(full) {

    var attraction, edgeBounds, collide, i, max, min, p, repulsion, mouse_repulsion, _i, _results, center, j;

    if (full == null) {
      full = true;
    }

    BreakDemo.__super__.setup.call(this, full);

    this.physics.integrator = new Verlet();

    // Center attraction
    center = new Vector(this.width * 0.5 - 150, this.height * 0.5);
    attraction = new Attraction(center, 1200, 800);

    // Mouse repulsion
    mouse_repulsion = new Attraction(this.mouse.pos, 200, -2000);

    // Edge boundaries
    min = new Vector(0.0, 0.0);
    max = new Vector(this.width, this.height);
    edgeBounds = new EdgeBounce(min, max);

    // Particles
    collide = new Collision();
    max = full ? 300 : 150;
    _results = [];

    for (i = _i = 0; 0 <= max ? _i <= max : _i >= max; i = 0 <= max ? ++_i : --_i) {

      // Particle physics
      p = new Particle(Random(1.0, 4.0));
      p.setRadius(p.mass * 2);
      p.moveTo(new Vector(Random(this.width), Random(this.height)));

      // Break logo repulsion
      var breakLogo = new BreakLogo(new Vector(this.width * 0.5, this.height * 0.5 - 15));
      for (j = 0; j < breakLogo.canvas.length; j++) {
        p.behaviours.push(breakLogo.canvas[j]);
      }

      // Particle other behaviours
      p.behaviours.push(attraction);
      p.behaviours.push(mouse_repulsion);
      p.behaviours.push(edgeBounds);
      p.behaviours.push(collide);
      collide.pool.push(p);
      _results.push(this.physics.particles.push(p));
    }

    return _results;
  };

  return BreakDemo;

})(Demo);
