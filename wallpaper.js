class WallPaper {
  // Static lookup tables for Bootstrap alignment classes.
  // Defined as static so the tables are shared across all instances.
  static verticalTable = {
    top: "align-items-start",
    center: "align-items-center",
    bottom: "align-items-end",
  };

  static horizontalTable = {
    left: "justify-content-start",
    center: "justify-content-center",
    right: "justify-content-end",
  };

  static TEXT_COLUMN_WIDTH = "col-8";

  constructor({ text, colorCode, imgUrl, vertical, horizontal }) {
    // Validate alignment values against the lookup tables.
    if (!WallPaper.verticalTable[vertical]) {
      throw new Error(`Invalid vertical alignment: ${vertical}. Must be one of: ${Object.keys(WallPaper.verticalTable).join(', ')}`);
    }
    if (!WallPaper.horizontalTable[horizontal]) {
      throw new Error(`Invalid horizontal alignment: ${horizontal}. Must be one of: ${Object.keys(WallPaper.horizontalTable).join(', ')}`);
    }

    // Validate color code format
    if (!/^([0-9A-Fa-f]{6})$/.test(colorCode)) {
      throw new Error(`Invalid color code: ${colorCode}. Must be a 6-digit hexadecimal value.`);
    }

    this.text = text;
    this.colorCode = colorCode;
    this.imgUrl = imgUrl;
    this.vertical = vertical;
    this.horizontal = horizontal;
  }

  // Generate wallpaper HTML and append it to the #target element.
  render() {
    const container = document.createElement("div");
    container.classList.add("container", "d-flex", "justify-content-center");

    container.innerHTML = `
      <div class="vh-75 d-flex p-md-5 p-3 my-5 col-md-8 col-12 imgBackground ${WallPaper.horizontalTable[this.horizontal]} ${WallPaper.verticalTable[this.vertical]}" style="background-image: url('${this.imgUrl}');">
        <div class="${WallPaper.TEXT_COLUMN_WIDTH}">
          <h3 class="paperText" style="color:#${this.colorCode};">
            ${this.text}
          </h3>
        </div>
      </div>
    `;

    const target = document.getElementById("target");
    if (!target) {
      throw new Error('Element with id="target" was not found in the document.');
    }
    target.append(container);
  }
}

class WallPaperHelper {
  static showAll(paperList) {
    // forEach is simpler to write than a for loop.
    paperList.forEach((paper) => {
      paper.render();
    });
  }
}

// Instantiate wallpapers using named parameters for clarity and order independence.
const wallPaperList = [
  new WallPaper({
    text: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. - Antoine de Saint",
    colorCode: "1B4F72",
    imgUrl: "https://cdn.pixabay.com/photo/2020/06/12/03/06/magnifying-glass-5288877__340.jpg",
    vertical: "top",
    horizontal: "right"
  }),
  new WallPaper({
    text: "The scientist discovers a new type of material or energy and the engineer discovers a new use for it. - Gordon Lindsay Glegg",
    colorCode: "007bff",
    imgUrl: "https://cdn.pixabay.com/photo/2018/02/23/04/38/laptop-3174729_1280.jpg",
    vertical: "center",
    horizontal: "left"
  }),
  new WallPaper({
    text: "Scientists study the world as it is, engineers create the world that never has been. - Theodore von Karman",
    colorCode: "ecf0f1",
    imgUrl: "https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg",
    vertical: "center",
    horizontal: "center"
  }),
];

WallPaperHelper.showAll(wallPaperList);
