import { getPercentageStats } from "../utils";

describe("getPercentageStats", () => {
  it("count percentage and isDown correctly", () => {
    expect(getPercentageStats(10, 5)).toStrictEqual({
      isDown: false,
      percentage: 100
    });
    expect(getPercentageStats(5, 10)).toStrictEqual({
      isDown: true,
      percentage: 50
    });
    expect(getPercentageStats(3, 3)).toStrictEqual({
      isDown: false,
      percentage: 0
    });
    expect(getPercentageStats(2, 1)).toStrictEqual({
      isDown: false,
      percentage: 100
    });
    expect(getPercentageStats(20, 5)).toStrictEqual({
      isDown: false,
      percentage: 300
    });
    expect(getPercentageStats(5, 20)).toStrictEqual({
      isDown: true,
      percentage: 75
    });
    expect(getPercentageStats(3, 2)).toStrictEqual({
      isDown: false,
      percentage: 50
    });
    expect(getPercentageStats(2, 3)).toStrictEqual({
      isDown: true,
      percentage: 33
    });
    expect(getPercentageStats(4, 3)).toStrictEqual({
      isDown: false,
      percentage: 33
    });
    expect(getPercentageStats(3, 4)).toStrictEqual({
      isDown: true,
      percentage: 25
    });
    expect(getPercentageStats(0, 0)).toStrictEqual({
      isDown: false,
      percentage: 0
    });
    expect(getPercentageStats(5, 0)).toStrictEqual({
      isDown: false,
      percentage: 0
    });
    expect(getPercentageStats(0, 5)).toStrictEqual({
      isDown: true,
      percentage: 0
    });
  });
});
