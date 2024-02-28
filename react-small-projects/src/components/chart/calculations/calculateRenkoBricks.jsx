export const calculateRenkoBricks = (data, brickSize) => {
  let bricks = [];
  if (data.length === 0) return bricks;

  let lastBrickPrice = parseFloat(data[0].price);
  let lastBrickTime = Math.floor(data[0].transact_time / 1000); // Convert to seconds

  bricks.push({
    price: lastBrickPrice,
    type: "first",
    time: lastBrickTime
  });

  for (let i = 1; i < data.length; i++) {
    const priceMove = parseFloat(data[i].price) - lastBrickPrice;
    const numBricks = Math.floor(Math.abs(priceMove) / brickSize);

    if (numBricks >= 1) {
      const brickType = priceMove > 0 ? "up" : "down";

      for (let j = 0; j < numBricks; j++) {
        lastBrickPrice += brickType === "up" ? brickSize : -brickSize;
        // Ensure each brick has a unique time by adding a small increment
        lastBrickTime += 1; // Increment by 1 second for each brick
        bricks.push({
          price: lastBrickPrice,
          type: brickType,
          time: lastBrickTime
        });
      }
    }
  }

  // Sort bricks by time to ensure ascending order
  bricks.sort((a, b) => a.time - b.time);

  return bricks;
};
// calculateRenkoBricks.jsx
