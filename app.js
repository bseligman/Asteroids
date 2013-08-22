$(function () {
  var canvas = $("#canvas");
  var g = new Asteroids.Game(800, 800, canvas.get(0));
  g.start();
});