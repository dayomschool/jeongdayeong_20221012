let needreset = true;
let maze = [];
let mazeStr =[
  "######################",
  "#.........##.........#",
  "#.###.###.##.###.###.#",
  "#....................#",
  "#.###.##.####.##.###.#",
  "......##......##......", 
  "#.###.##########.###.#",
  "#....................#",
  "#.###.##.####.##.###.#",
  "#.........##.........#",
  "#.........##.........#",
  "######################"
]
let pacX, pacY;//팩맨 위치
let paxDx, pacDy;//팩맨 이동 방향
let pacStun, moving;//팩맨이 멈춰있는지, 움직이는지
let ghosts = [];//유령 배열
let score,energy,beansLeft,state;


function setup() {
  createCanvas(2816,1536);
}

function draw() {

  if (needreset === true) {
    maze = [];
    beansLeft = 0;
    for(let r = 0; r<12; r++){
      let row = [];
      for(let c = 0; c<22; c++){
        row.push(mazeStr[r][c]);
        if(mazeStr[r][c] === '.')beansLeft++;
        }
      maze.push(row);
    }

    pacX = 128*1.5;
    pacY = 128*1.5;
    paxDx = 0;
    pacDy = 0;
    pacStun = 0;
    moving = false;

    if (maze[1][1] === '.') { maze[1][1] = ' '; beansLeft--; }
  
    score = 0; energy = 3; state = "play";

    ghosts = [];
    while (ghosts.length < 5) {
      let r = floor(random(12)), c = floor(random(22));
      let gx = c*128 + 64, gy = r*128 + 64;
      if (maze[r][c] === ' ' && dist(gx, gy, pacX, pacY) > 512) {
        ghosts.push({x: gx, y: gy, dx: random([-1,1]), dy: 0,color: color(random(100,255), 200,200)});
      }
    }

    needreset = false;
  }

  background(0);

  //미로 콩 그리는 부분

  for(let r = 0; r<12; r++){
    for(let c = 0; c<22; c++){
      if(maze[r][c] === '#'){
        stroke(50,100,255);strokeWeight(6);fill(10,10,40);
        rect(c*128+8, r*128+8, 128-16, 128-16, 20);
      } else if (maze[r][c] === '.') {
        noStroke();
        fill(255,255,0);
        ellipse(c*128 + 64, r*128 + 64, 20, 20);
      }
    }
  }

  // 게임 구성
  if (state === "play") {
    //팩맨 이동
    if(pacStun > 0){
      pacStun--;
      moving = false;
    } else {
      let nDx = 0, nDy = 0;
      if (keyIsDown(LEFT_ARROW)) { nDx = -1; }
      if (keyIsDown(RIGHT_ARROW)) { nDx = 1; }
      if (keyIsDown(UP_ARROW)) { nDy = -1; }
      if (keyIsDown(DOWN_ARROW)) { nDy = 1; }

      moving = false;
      if (nDx !== 0 || nDy !== 0) {
        moving = true; paxDx = nDx; pacDy = nDy;
        let nextX = pacX + paxDx * 10;
        let nextY = pacY + pacDy * 10;

        let hit = false;
        let pts = [[-35, -35], [35, -35], [-35, 35], [35, 35]];
        for (let p of pts) {
          let c = floor((nextX + p[0]) / 128);
          let r = floor((nextY + p[1]) / 128);
          if(r===5&&(c<0||c>+=22))
            
          


}
