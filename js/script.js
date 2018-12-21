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

  function Bomb() {
    var that = this;

    this.htmlElement = document.createElement('div');

    this.x = 0;
    this.y = 0;
    this.bombActive = false;

    this.init = function (x, y) {
      that.x = x;
      that.y = y;
      that.htmlElement.className = 'bomb';
      that.htmlElement.style.left = that.x + 'px';
      that.htmlElement.style.top = that.y + 'px';
    };
  };

  function BomberMan() {

    var that = this;

    this.htmlElement = document.createElement('div');

    this.x = 50;
    this.y = 50;
    this.velocityX = 0;
    this.velocityY = 0;

    this.init = function () {
      that.htmlElement.className = 'bomberman';
      that.htmlElement.style.left = that.x + 'px';
      that.htmlElement.style.top = that.y + 'px';
    };

    this.kill = function () {
      that.htmlElement.remove();
    };

    this.updatePosition = function () {
      if (that.x < 50) {
        that.velocityX = 0;
        that.x = 50;
      }
      if (that.x > 450) {
        that.velocityX = 0;
        that.x = 450;
      }
      if (that.y < 50) {
        that.velocityY = 0;
        that.y = 50;
      }
      if (that.y > 450) {
        that.velocityY = 0;
        that.y = 450;
      }
      that.x += that.velocityX;
      that.y += that.velocityY;
      // console.log(that.x);
      that.htmlElement.style.left = that.x + 'px';
      that.htmlElement.style.top = that.y + 'px';
    };
  };

  function Explosion() {
    var that = this;

    this.htmlElement = document.createElement('div');

    this.x = 0;
    this.y = 0;

    this.init = function (x, y) {
      that.x = x;
      that.y = y;
      that.htmlElement.className = "explosion";
      that.htmlElement.style.left = that.x + 'px';
      that.htmlElement.style.top = that.y + 'px';
      animateTileSprite(that.htmlElement, 31, 15);
    };
    this.clearExplosion = function () {
      setTimeout(clearAll, 500);
    };

    var clearAll = function () {
      that.htmlElement.remove();
    }
  };

  function animateTileSprite(element, noOfTiles, intervalTime) {
    var currentSpriteX = 0;
    var currentSpriteY = 0;
    element.style.backgroundPositionX = currentSpriteX + "px";
    element.style.backgroundPositionY = currentSpriteY + "px";
    setInterval(function () {
      currentSpriteX -= 50;
      if (currentSpriteX < (-50 * noOfTiles)) {
        currentSpriteX = 0;
      }
      element.style.backgroundPositionX = currentSpriteX + "px";
    }, intervalTime);
  }


  function GameWorld(){

    var that = this;

    this.htmlElement = document.getElementById('main-screen');
    this.homeScreen = document.getElementById('home-screen');
    this.startButton = document.getElementById('start-game');
    this.loadingScreen = document.getElementById('loading-screen');
    this.gameScreen = document.getElementById('game-screen');

    this.blocks = [];
    this.explosions = [];
    this.bomb;
    this.bomberMan;
    this.mainGameLooper;
    var keyRestrict = 1;

    var level1TileMapInfo = [
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3],
      [3, 0, 0, 0, 2, 2, 0, 0, 0, 0, 3],
      [3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3],
      [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3],
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

      that.bomberMan = new BomberMan();
      that.bomberMan.init();
      that.htmlElement.appendChild(that.bomberMan.htmlElement);
      initKeyEvents();
      this.mainGameLooper = setInterval(mainGameLoop, 100);
    };

    var initKeyEvents = function () {
      that.bomb = new Bomb();
      var up = 38;
      var down = 40;
      var left = 37;
      var right = 39;
      var spaceBar = 32;

      window.onkeydown = function (event) {
        if (event.which === right && keyRestrict > 0) {
          that.bomberMan.velocityX = 50;
          animateTileSprite(that.bomberMan.htmlElement, 10, 100);
          keyRestrict = 0;
          return;
        }
        if (event.which === left && keyRestrict > 0) {
          that.bomberMan.velocityX = -50;
          keyRestrict = 0;
        }
        if (event.which === down && keyRestrict > 0) {
          that.bomberMan.velocityY = 50;
          keyRestrict = 0;
        }
        if (event.which === up && keyRestrict > 0) {
          that.bomberMan.velocityY = -50;
          keyRestrict = 0;
        }
        if (event.which === spaceBar) {
          if (!that.bomb.bombActive) {
            that.bomb = new Bomb();
            that.bomb.init(that.bomberMan.x, that.bomberMan.y);
            that.htmlElement.appendChild(that.bomb.htmlElement);
            setTimeout(explodeBomb, 4000);
            that.bomb.bombActive = true;
          }
        }
      };

      var explodeBomb = function () {
        that.bomb.htmlElement.remove();
        createExplosionBoxes(that.bomb.x, that.bomb.y);
        that.bomb.bombActive = false;
      };

      var createExplosionBoxes = function (x, y) {
        var rightX = x + 50;
        var rightY = y + 0;
        var botX = x + 0;
        var botY = y + 50;
        var leftX = x - 50;
        var leftY = y + 0;
        var topX = x + 0;
        var topY = y - 50;
        var midX = x + 0;
        var midY = y + 0;
        // debugger;
        var bombM = new Explosion();
        var bombR = new Explosion();
        var bombB = new Explosion();
        var bombL = new Explosion();
        var bombT = new Explosion();

        bombM.init(midX, midY);

        bombR.init(rightX, rightY);

        bombB.init(botX, botY);

        bombL.init(leftX, leftY);

        bombT.init(topX, topY);

        that.htmlElement.appendChild(bombM.htmlElement);
        that.explosions.push(bombM);
        bombM.clearExplosion();

        if (allowExplodeCreate(bombR)) {
          that.htmlElement.appendChild(bombR.htmlElement);
          that.explosions.push(bombR);
          bombR.clearExplosion();
        }
        if (allowExplodeCreate(bombB)) {
          that.htmlElement.appendChild(bombB.htmlElement);
          that.explosions.push(bombB);
          bombB.clearExplosion();
        }
        if (allowExplodeCreate(bombL)) {
          that.htmlElement.appendChild(bombL.htmlElement);
          that.explosions.push(bombL);
          bombL.clearExplosion();
        }
        if (allowExplodeCreate(bombT)) {
          that.htmlElement.appendChild(bombT.htmlElement);
          that.explosions.push(bombT);
          bombT.clearExplosion();
        }
        that.explosions = [];
      };

      window.onkeyup = function (event) {
        that.bomberMan.velocityX = 0;
        that.bomberMan.velocityY = 0;
        animateTileSprite(that.bomberMan.htmlElement, 0, 0);
        keyRestrict = 1;
      };

    };

    var allowExplodeCreate = function (explosion) {
      for (var i = 0; i < that.blocks.length; i++) {
        if (checkCollision(explosion, that.blocks[i]) && that.blocks[i].type !== 2) {
          return false;
        }
      }
      return true;
    };

    var checkCollision = function (object1, object2) {
      if ((object1.x + 45) > object2.x && object1.x < (object2.x + 45) &&
      (object1.y + 45) > object2.y && object1.y < (object2.y + 45)) {
        return true;
      } else {
        return false;
      }
    };

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

    var mainGameLoop = function(){
      var bomberInitX = that.bomberMan.x;
      var bomberInitY = that.bomberMan.y;
      that.bomberMan.updatePosition();
      for (var i = 0; i < that.blocks.length; i++) {
        //if collided with block place is back to origin position
        if (checkCollision(that.bomberMan, that.blocks[i])) {
          // console.log("here");
          that.bomberMan.x = bomberInitX;
          that.bomberMan.y = bomberInitY;
          that.bomberMan.velocityX = 0;
          that.bomberMan.velocityY = 0;
          that.bomberMan.updatePosition();
        }
      }
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
