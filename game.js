var Asteroids = (function(Lib) {
  Lib.Game = (function() {

    function Game(xDim, yDim, canvas) {
      this.xDim = xDim;
      this.yDim = yDim;
      this.asteroids = this.generateAsteroids();
      this.ship = new Asteroids.Ship({x : (xDim / 2), y : (yDim / 2)});
      this.ctx = canvas.getContext("2d");
    }


    Game.prototype.NUM_ASTEROIDS = 10;

    Game.prototype.generateAsteroids = function() {
      var asteroids = [];
      for(var i = 0; i < this.NUM_ASTEROIDS; i++) {
        asteroids.push(Asteroids.Asteroid.randomAsteroid(this.xDim, this.yDim));
      }

      return asteroids;
    };

    Game.prototype.deleteHitAsteroids = function () {
      for (var i = 0; i < this.asteroids.length; i++) {
				for (var j = 0; j < this.ship.firedBullets.length; j++) {
					if (this.asteroids[i].collidesWith(this.ship.firedBullets[j])) {
	        	this.removeAsteroid(i);
						this.ship.removeBullet(j);
	          this.asteroids.push(
	                      Asteroids.Asteroid.randomAsteroid(this.xDim, this.yDim));
						i--; j--; //decrement so looping doesn't break
					}
				}
      }
    };

    Game.prototype.draw = function () {
      // this.ctx.clearRect(0, 0, this.xDim, this.yDim);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.xDim, this.yDim);
      var astLen = this.asteroids.length;
      var bulLen = this.ship.firedBullets.length;

      for (var i = 0; i < astLen; i++) {
        this.asteroids[i].draw(this.ctx);
      }

      for (var i = 0; i < bulLen; i++) {
        this.ship.firedBullets[i].draw(this.ctx);
      }


      this.ship.draw(this.ctx);
    };

    Game.prototype.gameOver = function () {
      window.clearInterval(gameTimer);
      this.ctx.fillStyle = "white";
      this.ctx.font = "bold 80pt Arial ";
      this.ctx.fillText("GAME OVER.", 60, 410);
    };
		
		Game.prototype.removeAsteroid = function (idx) {
			this.asteroids.splice(idx, 1);
		}

    Game.prototype.update = function () {
      var astLen = this.asteroids.length;
      var bulLen = this.ship.firedBullets.length;

      for(var i = 0; i < astLen; i++) {
        this.asteroids[i].update(this.xDim, this.yDim);
      }

      for (var i = 0; i < bulLen; i++) {
        var bullet = this.ship.firedBullets[i];
        bullet.update(this.xDim, this.yDim);
      }

      this.ship.update(this.xDim, this.yDim);
      this.ship.deleteOffscreenBullets();
      this.deleteHitAsteroids();

      this.draw();

      if (this.ship.isHit(this.asteroids)) {
        this.gameOver();
      }
    };

    Game.prototype.start = function () {
      var that = this;
      gameTimer = window.setInterval(that.update.bind(that), 1);
    };

    return Game ;
  })();

  return Lib;
})(Asteroids || {});