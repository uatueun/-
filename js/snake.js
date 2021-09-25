function Snake() {
    this.color = 'pink'
    this.body = [
        { "row": 3, "col": 5 },
        { "row": 3, "col": 4 },
        { "row": 3, "col": 3 },
        { "row": 3, "col": 2 },
    ]

    //默認方向
    this.direction = "R";
    //即將改變的方向
    this.willDirection = "R";

}
//蛇的渲染
Snake.prototype.render = function() {
    //蛇身體
    this.body.forEach(item => {
        game.setColor(item.row, item.col, this.color);
    })

    //蛇頭
    game.setColor(this.body[0].row, this.body[0].col, 'deeppink');

}

//蛇的運動
Snake.prototype.update = function() {
        this.direction = this.willDirection;
        //判斷方向
        switch (this.direction) {
            case "R":
                this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col + 1 });
                break;

            case "D":
                this.body.unshift({ "row": this.body[0].row + 1, "col": this.body[0].col });
                break;

            case "L":
                this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col - 1 });
                break;

            case "U":
                this.body.unshift({ "row": this.body[0].row - 1, "col": this.body[0].col });
                break;
        }
        //失敗判定
        if (this.body[0].col > game.col - 1 || this.body[0].row > game.row - 1 || this.body[0].col < 0 || this.body[0].row < 0) {
            this.GameOver()
        }
        // 自己撞到自己的時候觸發失敗
        for (let i = 1; i < this.body.length; i++) {
            //判定 蛇的頭跟身體的某部分row和col完全重合時 就是失敗
            if (this.body[0].col == this.body[i].col && this.body[0].row == this.body[i].row) {
                this.GameOver()
            }
        }
        //蛇吃食物
        if (this.body[0].row == game.food.row && this.body[0].col == game.food.col) {
            game.food = new Food(game)
            game.f = 0;
            //分數
            game.score = game.score + 10;
            document.querySelector('.score').innerHTML = '分數:' + game.score
        } else {
            this.body.pop();
        }
    }
    //蛇的方向改變 防止的是在一次渲染之前會出現調頭的情形
Snake.prototype.changeDirection = function(d) {
        this.willDirection = d;

    }
    //遊戲結束
Snake.prototype.GameOver = function() {
    alert('遊戲結束!您的分數為:' + game.score)
    this.body.shift();
    clearInterval(game.timer)
    document.querySelector('#app').innerHTML = "";
    game = new Game();
}