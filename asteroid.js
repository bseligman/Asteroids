var Asteroids = (function (Lib) {
  Lib.Asteroid = (function () {

    function Asteroid(pos, radius, velocity) {
      this.pos = pos;
      this.radius = radius;
      this.velocity = velocity;
    }

    Asteroid.inherits(Lib.MovingObject);
    Asteroid.MAX_RADIUS = 25;
    Asteroid.MAX_VELOCITY = 1;

    Asteroid.randomAsteroid = function (maxX, maxY) {
      return new Asteroid(
        { x : maxX * Math.random(),
          y : maxY * Math.random() },
          this.MAX_RADIUS * Math.random() + 8,
        { x : this.MAX_VELOCITY * (Math.random() - 0.5),
          y : this.MAX_VELOCITY * (Math.random() - 0.5) }
      );
    };


    Asteroid.prototype.draw = function (ctx) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.beginPath();

      ctx.arc(
        this.pos.x,
        this.pos.y,
        this.radius,
        0,
        2 * Math.PI,
        false
      );

      ctx.stroke();
    };

    return Asteroid;
  })();

  return Lib;
})(Asteroids || {});