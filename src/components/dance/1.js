
var context; //画布上下文context，用来获取相关HTML5画布方法

var width = 300;//游戏区宽度
var height = 300;//游戏区高度

var snakeLength = 3;//初始贪食蛇的长度      
var sqSize = 10;//每节的实际像素长度10px   

var bodyX = [150+sqSize, 150, 150-sqSize];//此数组包含初始状态贪食蛇每节图形左上角的x坐标
var bodyY = [150, 150, 150];//此数组包含初始状态贪食蛇每节图形左上角的y坐标    

var vX = [1, 1, 1]; //贪食蛇每一节图形的水平方向速度(1为向右，0为静止，-1为向左)
var vY = [0, 0, 0]; //贪食蛇每一节图形的垂直方向速度(1为向下，0为静止，-1为向上)

var rX;//小老鼠图形左上角x坐标
var rY;//小老鼠图形左上角y坐标     

var eaten = true;//判断是否吃上  

var level = 1; //游戏关卡

// 分数
var score = 0;       

// 计分器div
var scoreDiv;         

// 游戏是否结束
var gameOver = false;  

// 控制说明
var controlsDiv;   

window.addEventListener("load", init, true);
window.onkeydown = keydown;

scoreDiv = document.getElementById("score");
controlDiv = document.getElementById("control");

var intervalId = setTimeout(gameProcess, 1000/6);

//初始化HTML5画布
function init()
{
  context = document.getElementById("canvas").getContext("2d");
  drawCanvasBoundary();
  drawSnake();
}

//游戏主程序
function gameProcess()
{
 intervalId = setTimeout(gameProcess, 1000/(6*level)); 
 clear();//清除游戏区图形
 drawCanvasBoundary();
 placeRat();
 moveSnake();//移动贪食蛇
 checkCollision();
 drawSnake();
}

//删除游戏区中绘制图形内容
function clear()
{
  context.clearRect(0,0,width,height);
}

//绘制游戏区
function drawCanvasBoundary()
{
  context.fillStyle="#FFF"; 
  context.fillRect(0,0,width,height);  
  context.fill();
  context.strokeStyle="#666";
  context.strokeRect(0,0,width,height);
}

//生成移动贪食蛇的方法
function moveSnake(){
  for(var i=0; i < snakeLength; i++)
  {
    bodyX[i] += (vX[i]*sqSize);
    bodyY[i] += (vY[i]*sqSize);
  }
  
  for(var i=snakeLength-1; i>0; i--)
  {
    vX[i] = vX[i-1];
    vY[i] = vY[i-1];
  }
  
  eatRat();
}

//吃小老鼠方法
function eatRat()
{
  if(bodyX[0] == rX && bodyY[0] == rY)
  {
    eaten = true;
    
    // 计算新尾巴的坐标
    var newX = bodyX[snakeLength-1]-vX[snakeLength-1]*sqSize;
    var newY = bodyY[snakeLength-1]-vY[snakeLength-1]*sqSize;
   
    // 添加新尾巴到body数组中
    bodyX.push(newX);
    bodyY.push(newY);
   
    //速度相关应该和老尾巴一致
    vX.push(vX[snakeLength-1]);
    vY.push(vY[snakeLength-1]);
    snakeLength++;   // 长度增加
    
  
    score += 10;    // 计分
    
    // 关卡设计
    if((score%100) == 0)
      level++;
    
    // 更新到页面
    scoreDiv.innerHTML = "第" + level + "关 分数: " + score ;
  }

}

//生成贪食蛇，缺省长度是3节
function drawSnake()
{
  for(var i=0; i < snakeLength; i++)
      drawPoint(bodyX[i],bodyY[i]);
}

//生成小老鼠并随机放到游戏区里
function placeRat()
{
      if(eaten)
      {
        rX = Math.floor(width*Math.random()/sqSize)*sqSize;
        rY = Math.floor(height*Math.random()/sqSize)*sqSize;
        if(checkFoodCollision(rX,rY))
          placeRat();
        else
          eaten = false;
      }
      drawPoint(rX, rY);
};  

//判断是否接触到小老鼠
function checkFoodCollision(x, y)
{
      for (var i = 0;i<snakeLength; i++)
        if(x == bodyX[i]&& y == bodyY[i])
        {
          return true;
        }
      return false;
}

//判断自身碰撞
function checkSelfCollision(x, y)
{
  for (var i = 4; i < snakeLength; i++)
    if(x == bodyX[i] && y == bodyY[i])
    {
      return true;
    }
  return false;
}

//判断是否碰撞区及调用自身碰撞
function checkCollision()
{
  if(bodyX[0] >= width || bodyX[0] < 0 || bodyY[0] < 0 || bodyY[0] >= height)
  {
    scoreDiv.innerHTML = "第" + level + "关 分数: " + score
      +" <b>游戏结束</b>";
    controlDiv.innerHTML = "按 \"回车键\" 重新开始";
    gameOver = true;
    clearTimeout(intervalId);
  }
  else if(snakeLength > 4)
    {
      if(checkSelfCollision(bodyX[0],bodyY[0]))
      {
        scoreDiv.innerHTML = "第" + level + "关 分数: " + score
        +" <b>游戏结束</b>";
        controlDiv.innerHTML = "按 \"回车键\" 重新开始";
        gameOver = true;
        clearTimeout(intervalId);
      }
    }
}

//绘制贪食蛇和小老鼠的基础图形，即生成一个小的正方形图形
function drawPoint(x,y)
{
  context.fillStyle = "#eb281d";
  context.fillRect(x,y,sqSize, sqSize);
  context.fill();
  context.strokeStyle="#fff";
  context.strokeRect(x,y,sqSize, sqSize);
}

//添加键盘控制贪食蛇
function keydown(e){
  //a键控制向左
  if(e.keyCode == 65 && vX[0] != 1){
    vX[0] = -1;
    vY[0] = 0;
  }
  //w键控制向上
  else if (e.keyCode == 87 && vY[0] != 1) 
  {
    vY[0] = -1;
    vX[0] = 0;
  }
  //d键控制向右
  else if (e.keyCode == 68 && vX[0] != -1) 
  {
    vX[0] = 1;
    vY[0] = 0;
  }
  //s键控制向下
  else if (e.keyCode == 83 && vY[0] != -1) 
  {
    vY[0] = 1;
    vX[0] = 0;
  }
  else if (e.keyCode == 13 && gameOver == true)
  {
    gameOver = false;
    
    //游戏结束按回车键重新开始
    restart(); 
  }
}

//重新开始游戏
function restart()
{
    bodyX = [150+sqSize, 150, 150-sqSize];
    bodyY = [150, 150, 150];

    vX = [1, 1, 1];
    vY = [0, 0, 0];

    snakeLength = 3;

    score = 0;
    level  = 1;

    eaten = true;

    scoreDiv.innerHTML = "第" + level + "关 分数: " + score ;
    controlDiv.innerHTML = "游戏控制: W = 上; A = 左; S = 下; D = 右";

    intervalId = setTimeout(gameProcess, 1000/6);
}