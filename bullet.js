var Asteroids = (function(Lib) {
  Lib.Bullet = (function() {

    function Bullet(pos, direction) {
      this.direction = direction;
      this.velocity = this.getVelocity();
      this.pos = pos;
      this.radius = 3;
    }

    Bullet.inherits(Asteroids.MovingObject);

    Bullet.prototype.draw = function (ctx) {
      ctx.fillStyle = "orange";
      ctx.beginPath();

      ctx.arc(
        this.pos.x,
        this.pos.y,
        this.radius,
        0,
        2 * Math.PI,
        false
      );

      ctx.fill();
    };

    Bullet.prototype.update = function () {
      this.pos.x += this.velocity.x;
      this.pos.y += this.velocity.y;
    };


    Bullet.prototype.getVelocity = function() {
      var acceleration = this.calculateForwardDir();
      return {x : acceleration.x * 2, y : acceleration.y * 2 };
    };

    return Bullet;
  })();

  return Lib;
})(Asteroids || {});