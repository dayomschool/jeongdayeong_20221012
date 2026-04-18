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
        if(mazeStr[r][c] === '.'){
          beansLeft++;
        }
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
      let gr


  }
}
