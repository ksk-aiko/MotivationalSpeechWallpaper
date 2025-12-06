class WallPaper {
  // Static tables for alignment classes
  // This way, no memory is wasted when creating objects.
  static verticalTable = {
    top: "align-items-start",
    center: "align-items-center",
    bottom: "align-items-end",
  };

  // Static tables for alignment classes
  // This way, no memory is wasted when creating objects.
  static horizontalTable = {
    left: "justify-content-start",
    center: "justify-content-center",
    right: "justify-content-end",
  };

  static TEXT_COLUMN_WIDTH = "col-8";

  constructor({ text, colorCode, imgUrl, vertical, horizontal }) {
    // This way, we validate the input when creating the object
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

  generateWallPaper() {
    /** remove variable domObj for better reusability */
    // let domObj = document.getElementById("target");

    // use const keyword for variables that won't be reassigned
    const container = document.createElement("div");
    container.classList.add("container", "d-flex", "justify-content-center");

    // change keyword 'this' to 'WallPaper' for static properties
    // in this way, we can access static properties inside instance methods
    container.innerHTML = `
            <div class="vh-75 d-flex p-md-5 p-3 my-5 col-md-8 col-12 imgBackground ${
              WallPaper.horizontalTable[this.horizontal]
            } ${
      WallPaper.verticalTable[this.vertical]
    }" style="background-image: url('${this.imgUrl}');">
                <div class="${WallPaper.TEXT_COLUMN_WIDTH}">
                    <h3 class="paperText" style="color:#${this.colorCode};">
                    ${this.text}
                    </h3>
                </div>
            </div>
        `;

    // Changed to add directly to DOM without return
    // This way, we don't need to call another function to add it to DOM
    document.getElementById("target").append(container);
  }
}

class WallPaperHelper {
  static showAll(paperList) {
    // forEach is simpler to write than a for loop.
    paperList.forEach((paper) => {
      paper.generateWallPaper();
    });
  }
}

// Create wallpaper list directly without intermediate variables
// This reduces unnecessary variable declarations
// Use split assignment during instance creation to improve readability and scalability, and to be independent of argument ordering
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
