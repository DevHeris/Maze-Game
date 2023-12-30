// Broiler plate code
const { Engine, Render, Runner, Bodies, World } = Matter;

// Create an engine
const engine = Engine.create();
const { world } = engine;

// Create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
  },
});

// Run the renderer
Render.run(render);

// Create a runner and run the engine
Runner.run(Runner.create(), engine);

//Brolier plate code ends

// Walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true }),
];

// Add new shape to the World object
World.add(world, walls);
