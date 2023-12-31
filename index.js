const { Engine, Render, Runner, Bodies, World } = Matter;
const engine = Engine.create();
const { world } = engine;
const width = 600;
const height = 600;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
    wireframes: true,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }),
];
World.add(world, walls);

// Grid generation

// This isn't the best way of going about this
// const grid = [];
// for (let i = 0; i < 3; i++) {
//   grid.push([]);
//   for (let j = 0; j < 3; j++) {
//     grid[i].push(false);
//   }
// }

// This is better
const grid = Array(3)
  .fill(null)
  .map(() => Array(3).fill(false));

const verticals = Array(3)
  .fill(null)
  .map(() => Array(2).fill(false));

const horizontals = Array(2)
  .fill(null)
  .map(() => Array(3).fill(false));

console.log(horizontals);
