const { Engine, Render, Runner, Bodies, World } = Matter;
const engine = Engine.create();
const { world } = engine;

const cells = 15;
const width = 750;
const height = 750;
const unitLength = width / cells;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
    wireframes: false,
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

// This isn't the best way of going about the grid generation
// const grid = [];
// for (let i = 0; i < 3; i++) {
//   grid.push([]);
//   for (let j = 0; j < 3; j++) {
//     grid[i].push(false);
//   }
// }

// This is better
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
  // If i have visited the cell at [row,column],then return
  if (grid[row][column]) return;

  // Mark this cell as being visited
  grid[row][column] = true;

  // Assemble randomly-ordered list of neighbors
  const neighbours = shuffle([
    [row - 1, column, "up"],
    [row, column + 1, "right"],
    [row + 1, column, "down"],
    [row, column - 1, "left"],
  ]);

  // For each neighbors....
  for (const neighbor of neighbours) {
    const [nextRow, nextColumn, direction] = neighbor;

    // See if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      continue;
    }

    // If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    // Remove a wall from either horizontals or verticals
    if (direction === "left") {
      verticals[row][column - 1] = true;
    } else if (direction === "right") {
      verticals[row][column] = true;
    } else if (direction === "up") {
      horizontals[row - 1][column] = true;
    } else if (direction === "down") {
      horizontals[row][column] = true;
    }
    // Visit that next cell
    stepThroughCell(nextRow, nextColumn);
  }
};

stepThroughCell(startRow, startColumn);

// Drawing walls with matter.js

// Horizontal walls
horizontals.forEach((row, rowIndex) => {
  row.forEach((openSegment, columnIndex) => {
    // Open passage way so no wall needed
    if (openSegment) return;

    // Otherwise
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength / 2,
      rowIndex * unitLength + unitLength,
      unitLength,
      5,
      {
        render: { fillStyle: "red" },
        isStatic: true,
      }
    );

    World.add(world, wall);
  });
});

// Vertical walls
verticals.forEach((row, rowIndex) => {
  row.forEach((openSegment, columnIndex) => {
    if (openSegment) return;

    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength,
      rowIndex * unitLength + unitLength / 2,
      5,
      unitLength,
      {
        render: { fillStyle: "red" },
        isStatic: true,
      }
    );

    World.add(world, wall);
  });
});
