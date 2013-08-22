var Asteroids = (function (Lib) {
  Lib.Ship = (function () {

    function Ship(pos) {
      var that = this;
      this.pos = pos;
      this.direction = Math.PI / 2;
      this.velocity = {x : 0, y : 0};
      this.radius = 5;
      this.firedBullets = [];
      key('left', function() { that.rotate('left'); });
      key('right', function() { that.rotate('right'); });
      key('up', function() { that.power(); });
      key('down', function() { that.decelerate(); });
      key('space', function() { that.fireBullet(); });
    }

    Ship.inherits(Lib.MovingObject);

    Ship.prototype.draw = function (ctx) {
      ctx.fillStyle = 'red';
      ctx.save();
      ctx.translate(this.pos.x, this.pos.y);
      ctx.rotate(this.direction);
      ctx.beginPath();
      ctx.moveTo(0 , -14);
      ctx.lineTo(10, 11);
      ctx.lineTo(-10, 11);
      ctx.lineTo(0, -14);
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    Ship.prototype.power = function () {

      var acceleration = this.calculateForwardDir();

      this.velocity = { x : this.velocity.x + acceleration.x * 0.03,
                       y : this.velocity.y + acceleration.y * 0.03};

    };

    Ship.prototype.decelerate = function () {
      this.velocity = {x : this.velocity.x / 1.1,
                       y : this.velocity.y / 1.1};
    };

    Ship.prototype.rotate = function(direction) {
      var rotationScale = 0.2;

      if (direction === 'left') {
        this.direction -= rotationScale;
      } else if (direction === 'right') {
        this.direction += rotationScale;
      }
    };

    Ship.prototype.deleteOffscreenBullets = function () {
      for (var i = 0; i < this.firedBullets.length; i++) {
        if (this.firedBullets[i].isOffBoard) {
					this.removeBullet(i);
					i--; //corrects for removed element
        }
      }
    };

    Ship.prototype.fireBullet = function () {
      var pos = { x : this.pos.x, y : this.pos.y };
      var newBullet = new Asteroids.Bullet(pos, this.direction);
      this.firedBullets.push(newBullet);
    };
		
		Ship.prototype.removeBullet = function (idx) {
			this.firedBullets.splice(idx, 1)
		};

    return Ship;
  })();

  return Lib;
}) (Asteroids || {});