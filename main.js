const score = document.querySelector (".score"), 
      game = document.querySelector (".game"),
      start = document.querySelector (".start"),
      gameArea = document.querySelector (".game-area"),
      car = document.createElement('div');
car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};
const setting = {
  start: false,
  score: 0,
  speed: 3,
  trafic: 3
};
function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}

function startGame(){
  start.classList.add('hide');
  gameArea.innerHTML = '';

  for(i =0; i < getQuantityElements(100); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 75) + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  }
for(let i = 0; i < getQuantityElements(100 * setting.trafic); i++){
  const enemy = document.createElement('div');
  enemy.classList.add('enemy');
  enemy.y = -100 * setting.trafic * (i + 1);
  enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
  enemy.style.top = enemy.y + 'px';
  enemy.style.background = 'transparent url(./image/enemy2.png) center / cover no-repeat';
  enemy.style.transform = 'rotate(180deg)';
  gameArea.appendChild(enemy);
}
  setting.score = 0;
  setting.start = true;
  gameArea.appendChild(car);
  car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2 + 'px';
  car.style.top = 'auto';
  car.style.bottom = '100px'
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
}
function playGame() {
  if(setting.start){
    setting.score += setting.speed;
    score.innerHTML = 'SCORE<br>' + setting.score;
    moveRoad();
    moveEnemy();
    if(keys.ArrowLeft && setting.x > 0){
      setting.x -= setting.speed;
    }
    if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
      setting.x += setting.speed;
    }
    if(keys.ArrowUp && setting.y > 0){
    setting.y -= setting.speed;
    }
    if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
      setting.y += setting.speed;
    }
    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';

    requestAnimationFrame(playGame);
  }
}
function startRun(event) {
  event.preventDefault();
  keys[event.key] = true;
}

function stopRun(event) {
 event.preventDefault();
 keys[event.key] = false;
 
}
function moveRoad() {
 let lines = document.querySelectorAll('.line'); 
 lines.forEach(function(line) {
   line.y += setting.speed;
   line.style.top = line.y + 'px';
   if(line.y >= document.documentElement.clientHeight){
     line.y = -100;
   }
 });
}
function moveEnemy(){
  let enemy = document.querySelectorAll('.enemy');

  enemy.forEach(function(item){
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();

    if(carRect.top <= enemyRect.bottom && 
      carRect.right >= enemyRect.left && 
      carRect.left <= enemyRect.right && 
      carRect.bottom >= enemyRect.top){
        setting.start = false;
        start.classList.remove('hide');
        start.style.top = score.offsetHeight + 'px';
      }
    item.y += setting.speed;
    item.style.top = item.y + 'px';

  if(item.y >= document.documentElement.clientHeight){
     item.y = -100 * setting.trafic;
     item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
     
   }
  });  
 
}

