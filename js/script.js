;(function () {

  function Block() {

    var that = this;

    this.htmlElement = document.createElement('div');

    this.x = 0;
    this.y = 0;

    this.type;

    this.init = function (type, tileSheetX, tileSheetY) {
      that.htmlElement.className = 'block block' + type;
      that.x = tileSheetX * 50;
      that.y = tileSheetY * 50;
      that.htmlElement.style.left = that.x + 'px';
      that.htmlElement.style.top = that.y + 'px';

      that.type = type;
    };

    this.kill = function () {
      that.htmlElement.remove();
    }
  };

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

  function GameWorld(){
    var that = this;
    this.htmlElement = document.getElementById('main-screen');
    this.homeScreen = document.getElementById('home-screen');
    this.startButton = document.getElementById('start-game');
    this.loadingScreen = document.getElementById('loading-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.blocks = [];

    var level1TileMapInfo = [
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3],
      [3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3],
      [3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 1, 0, 1, 0, 1, 2, 1, 0, 3],
      [3, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3],
      [3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3],
      [3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3]
    ];
    this.init = function(){
      generateTileMap(level1TileMapInfo);
    }

    var generateTileMap = function (tileMap) {
      for (var i = 0; i < tileMap.length; i++) {
        for (var j = 0; j < tileMap[i].length; j++) {
          if (tileMap[i][j] !== 0) {
            var block = new Block();
            block.init(tileMap[i][j], i, j);
            that.blocks.push(block);
            that.htmlElement.appendChild(block.htmlElement);
          }
        }
      }
    };

    var generateLoading = function(){
      fadeOut(that.homeScreen);
      fadeIn(that.loadingScreen);
      startGame();
    }

    var startGame = function(){
      that = new GameWorld();
      that.init();
      that.gameScreen.style.opacity = 1;
      that.gameScreen.style.display = 'block';
      that.loadingScreen.style.display = 'none';
    }

    var initClickEvents = function(){
      that.startButton.onclick = function(){
        generateLoading();
      }
    }

    initClickEvents();
  };
  var gameWorld = GameWorld();
})();
