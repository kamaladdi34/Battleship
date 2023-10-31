const DOMmanager = require("../src/DOMmanager");

describe("Tests for DOMmanager and it's functions", () => {
  test("DOMmanager exists", () => {
    expect(DOMmanager).toBeDefined();
  });

  test("DOMmanager has createBoardDOM() function", () => {
    expect(DOMmanager.createBoardDOM).toBeDefined();
  });
});
