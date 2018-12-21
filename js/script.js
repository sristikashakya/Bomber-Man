;(function () {

  function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
      if ((el.style.opacity -= .04) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  };

  function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .04) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  };

  function gameWorld(){
    var that = this;
    this.homeScreen = document.getElementById('home-screen');
    this.startButton = document.getElementById('start-game');
    this.loadingScreen = document.getElementById('loading-screen');

    var initClickEvents = function(){
      that.startButton.onclick = function(){
        generateLoading();
      }
    }

    var generateLoading = function(){
      fadeOut(that.homeScreen);
      fadeIn(that.loadingScreen);
    }
    initClickEvents();
  };
  var gameWorld = gameWorld();
})();
