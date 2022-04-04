import * as U from "./utils";

test("delay", async () => {
  const duration = 500;
  const epsilon = 0.1 * duration;
  const t1 = new Date();
  await U.delay(500);
  const t2 = new Date();
  const dt = t2.getTime() - t1.getTime();
  console.log({ dt });
  expect(dt).toBeLessThan(duration + epsilon);
  expect(dt).toBeGreaterThan(duration - epsilon);
});
