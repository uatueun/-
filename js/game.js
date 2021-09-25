function Game() {
    //行數
    this.row = 20;
    //列數
    this.col = 20;
    //分數
    this.score = 0;
    //初始化
    this.init();
    //實例化蛇類
    this.snake = new Snake();
    //食物類
    this.food = new Food(this);
    //定時器
    this.start();
    //鍵盤事件監聽
    this.bindEvent();
}

//初始化
Game.prototype.init = function() {
    //創建table
    this.dom = document.createElement('table')
    let tr, td;

    //遍歷行和列上樹
    for (let i = 0; i < this.row; i++) {
        //創建tr
        tr = document.createElement('tr')
        for (let j = 0; j < this.col; j++) {
            //創建td
            td = document.createElement('td')
            tr.appendChild(td)
        }
        this.dom.appendChild(tr)
    }
    let score = document.createElement('h3');
    score.classList = 'score'
    score.innerHTML = '獲得分數:0'
    document.getElementById('app').appendChild(score)
    document.getElementById('app').appendChild(this.dom)
    score.style.color = '#fff'
}
Game.prototype.setHtml = function(row, col, html) {
        this.dom.querySelectorAll('tr')[row].querySelectorAll('td')[col].innerHTML = html;
    }
    //設定顏色
Game.prototype.setColor = function(row, col, color) {
    this.dom.querySelectorAll('tr')[row].querySelectorAll('td')[col].style.background = color;
}

//重置遊戲畫面
Game.prototype.clear = function() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                this.dom.querySelectorAll('tr')[i].querySelectorAll('td')[j].style.background = '#222'
                this.dom.querySelectorAll('tr')[i].querySelectorAll('td')[j].innerHTML = "";

            }
        }
    }
    //定時器
Game.prototype.start = function() {
    this.f = 0;
    this.timer = setInterval(function() {
        game.f++;
        //清屏
        game.clear();
        //運動
        var during = game.snake.body.length < 30 ? 30 - game.snake.body.length : 1;
        game.f % during == 0 && game.snake.update();
        //渲染
        game.snake.render();
        //食物
        game.food.render();
    }, 2)
}

//事件監聽
Game.prototype.bindEvent = function() {
    //onkeydown裡面的this指向的是window
    //使用一個變數接收this
    let self = this;
    document.onkeydown = function(e) {
        let event = e || window.event;
        switch (event.keyCode) { //獲取當前按下鍵盤的編碼
            case 37: //左鍵
                if (self.snake.direction == "R") return
                self.snake.changeDirection("L")
                break;

            case 39: //右鍵
                if (self.snake.direction == "L") return
                self.snake.changeDirection("R")
                break;

            case 38: //上鍵
                if (self.snake.direction == "D") return
                self.snake.changeDirection("U")
                break;

            case 40: //下鍵
                if (self.snake.direction == "U") return
                self.snake.changeDirection("D")
                break;


        }
    }
}