// Broiler plate code
const { Engine, Render, Runner, Bodies, World, MouseConstraint, Mouse } =
  Matter;

// Create an engine
const engine = Engine.create();
const { world } = engine;

const width = 800;
const height = 600;

// Create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
    wireframes: false,
  },
});

// Run the renderer
Render.run(render);

// Create a runner and run the engine
Runner.run(Runner.create(), engine);

// Create a mouse constraint
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: Mouse.create(render.canvas),
});

World.add(world, mouseConstraint);

//Brolier plate code ends

// Walls

// Define an array of static walls using Bodies.rectangle
const walls = [
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true }),
];
// These static walls will not move and will act as boundaries within the game.

// Add walls to the World object
World.add(world, walls);

for (let i = 0; i < 50; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50)
    );
  } else {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 35, {
        render: {
          fillStyle: "red",
        },
      })
    );
  }
}
