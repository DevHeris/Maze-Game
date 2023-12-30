// Broiler plate code
const { Engine, Render, Runner, Bodies, World } = Matter;

// Create an engine
const engine = Engine.create();
const { world } = engine;

const width = 600;
const height = 600;

// Create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
    wireframes: true,
  },
});

// Run the renderer
Render.run(render);

// Create a runner and run the engine
Runner.run(Runner.create(), engine);

//Brolier plate code ends

// Walls

// Define an array of static walls using Bodies.rectangle
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }),
];
// These static walls will not move and will act as boundaries within the game.

// Add walls to the World object
World.add(world, walls);
