var Asteroids = (function(Lib) {
  Lib.MovingObject = (function() {

      function MovingObject(pos, velocity, radius) {
        this.pos = pos;
        this.velocity = velocity;
        this.radius = radius;
      }

      MovingObject.prototype.update = function(xDim, yDim) {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        this.pos.x = (this.pos.x + xDim) % xDim;
        this.pos.y = (this.pos.y + yDim) % yDim;
      };

      MovingObject.prototype.isOffScreen = function(xDim, yDim) {
        var isOffScreen = ((this.pos.x > xDim) || (this.pos.x < 0) ||
          (this.pos.y > yDim) || (this.pos.y < 0));

        return isOffScreen;
      };

      MovingObject.prototype.isHit = function (otherObjects) {
        var len = otherObjects.length;

        for(var i = 0; i < len; i++) {
          if(this.collidesWith(otherObjects[i])) {
            return true;
          }
        }

        return false;
      };

      MovingObject.prototype.collidesWith = function(otherObject) {
        var distSqrd = Math.pow((this.pos.x - otherObject.pos.x), 2) +
                       Math.pow((this.pos.y - otherObject.pos.y), 2);
        var cartDist = Math.sqrt(distSqrd);

        return cartDist < (this.radius + otherObject.radius);
      };

      MovingObject.prototype.calculateForwardDir = function() {
      return { x : Math.cos(this.direction - (Math.PI / 2)),
               y : Math.sin(this.direction - (Math.PI / 2)) };
      };

    return MovingObject;
  })();

  return Lib;
})(Asteroids || { });
