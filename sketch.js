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
];

let pacX, pacY;//팩맨 위치
let pacDx, pacDy;//팩맨 이동 방향
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
        let nx = pacX + paxDx * 10;
        let ny = pacY + pacDy * 10;

        let hit = false;
        let pts = [[-35, -35], [35, -35], [-35, 35], [35, 35]];
        for (let p of pts) {
          let c = floor((nx + p[0]) / 128);
          let r = floor((ny + p[1]) / 128);
          if(r===5&&(c<0||c>=22)) continue;
          if(r<0||r>=12||c<0||c>=22||maze[r][c] === '#') hit = true;
        }
        
        if (!hit) {pacX = nx; pacY = ny;}
      }
    }

    if (pacX<-45) pacX = width + 45;
    if (pacX>width+45) pacX = -45;

    //콩 먹는 부분
    let pc = floor(pacX / 128), pr = floor(pacY / 128);
    if (pr>=0 && pr<12 && pc>=0 && pc<22 && maze[pr][pc] === '.') {
      maze[pr][pc] = ' ';
      score += 10;
      beansLeft--;
      if(score >0 && score % 100 === 0) {
        let r =floor(random(12)), c = floor(random(22));
        if(maze[r][c] !== '#' && dist(c*128+64, r*128+64, pacX, pacY) > 512){
          ghosts.push({x: c*128+64, y: r*128+64, dx: random([-1,1]), dy: 0,color: color(200)});
        }
      }

      if (beansLeft <=0) state = "win";
    }

    //유령 이동
    for (let i = ghosts.length - 1; i>=0; i--) {
      let g = ghosts[i];
      let nx = g.x + g.dx * 6; ny = g.y + g.dy * 6;
      
      let hit = false;
      let pts = [[-30, -30], [30, -30], [-30, 30], [30, 30]];
      for (let p of pts) {
        let c = floor((nx + p[0]) / 128);
        let r = floor((ny + p[1]) / 128);
        if(r===5&&(c<0||c>=22)) continue;
        if(r<0||r>=12||c<0||c>=22||maze[r][c] === '#') hit = true;
      }

      if (hit) {
        let d = random([[1,0], [-1,0], [0,1], [0,-1]]);
        g.dx = d[0]; g.dy = d[1];
      } else {
        g.x = nx; g.y = ny;
      }
      if (g.x<-40) g.x = width + 40;
      if (g.x>width+40) g.x = -40;

      if (pacStun === 0 && dist(g.x, g.y, pacX, pacY) < 75) {
        energy--;
        pacStun = 30; ghosts.splice(i, 1);
        if (energy <= 0) state = "lose";
      }
    }
  }
//그리기
  for (let g of ghosts) {
    fill(g.color); noStroke();ellipse(g.x, g.y, 80, 80);
    fill(255); ellipse(g.x - 12, g.y -8,14,14); ellipse(g.x + 12, g.y -8,14,14);
    fill(0); ellipse(g.x - 12, g.y -8,6,6); ellipse(g.x + 12, g.y -8,6,6);
  }

  push();
  translate(pacX, pacY);
  if(paxDx === -1) rotate(PI);
  if(paxDy === 1) rotate(HALF_PI);
  if(paxDy === -1) rotate(-HALF_PI);
  fill(pacStun > 0 ? 'red' : 'yellow'); noStroke();
  if (moving) {
    let open = sin(frameCount*0.3)*0.5 + 0.5;
    arc(0, 0, 90, 90, open*0.6, TWO_PI - open*0.6, PIE);
  } else {
    ellipse(0, 0, 90, 90);
  }
  pop();

  fill(0);noStroke(); 
  let ex = pacX, ey = pacY - 15;
  if (pacDx === 1) ex += 5;
  if (pacDx === -1) ex -= 5;
  if (pacDy === -1 || pacDy === 1) ex += 12;
  ellipse(ex, ey, 12, 12);

  fill(255); textSize(60); textAlign(LEFT, TOP);
  text("Score: " + score, 60, 30);
  textAlign(RIGHT, TOP);
  text("Energy: " + energy, width - 60, 30);

  if (state === "play") {
    fill(0,180); rect(0,0,width,height);
    textAlign(CENTER, CENTER); textSize(180);
    fill(state === "win" ? color(255,230,0) : color(255,60,60));
    text(state === "win" ? "You Win!" : "Game Over", width/2, height/2-50);
    fill(255); textSize(60);
    text("Press 'R' to Restart", width/2, height/2 + 120);
  }

} // draw 끝

function keyPressed() {
  if (key == "r" || key == "R"|| keyCode === 'ㄱ') {
    needreset = true;
  }
}
