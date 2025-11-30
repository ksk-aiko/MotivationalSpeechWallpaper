/**
 * WallPaper class for creating motivational quote wallpaper elements
 * Uses Bootstrap classes for responsive layout and alignment
 */
class WallPaper {
  /**
   * Mapping of vertical alignment options to Bootstrap CSS classes
   * Using static property to share across all instances and save memory
   */
  static VERTICAL_ALIGNMENT = Object.freeze({
    top: "align-items-start",
    center: "align-items-center",
    bottom: "align-items-end",
  });

  /**
   * Mapping of horizontal alignment options to Bootstrap CSS classes
   * Using static property to share across all instances and save memory
   */
  static HORIZONTAL_ALIGNMENT = Object.freeze({
    left: "justify-content-start",
    center: "justify-content-center",
    right: "justify-content-end",
  });

  /** Bootstrap column class for text container width */
  static TEXT_COLUMN_WIDTH = "col-8";

  /** Default target element ID for rendering wallpapers */
  static TARGET_ELEMENT_ID = "target";

  /**
   * Sanitizes text to prevent XSS attacks
   * @param {string} text - The text to sanitize
   * @returns {string} - Sanitized text safe for HTML insertion
   */
  static sanitizeText(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Validates the alignment value against available options
   * @param {string} value - The alignment value to validate
   * @param {Object} alignmentTable - The alignment options table
   * @param {string} alignmentType - Type of alignment for error message
   * @throws {Error} If alignment value is invalid
   */
  static validateAlignment(value, alignmentTable, alignmentType) {
    if (!alignmentTable[value]) {
      const validOptions = Object.keys(alignmentTable).join(", ");
      throw new Error(
        `Invalid ${alignmentType} alignment: ${value}. Must be one of: ${validOptions}`
      );
    }
  }

  /**
   * Validates color code format
   * @param {string} colorCode - The color code to validate (6-digit hex without #)
   * @throws {Error} If color code format is invalid
   */
  static validateColorCode(colorCode) {
    if (!/^[0-9A-Fa-f]{6}$/.test(colorCode)) {
      throw new Error(
        `Invalid color code: ${colorCode}. Must be a 6-digit hexadecimal value.`
      );
    }
  }

  /**
   * Validates and sanitizes image URL
   * Only allows http, https protocols to prevent javascript: and data: XSS attacks
   * @param {string} url - The URL to validate
   * @throws {Error} If URL is invalid or uses unsafe protocol
   */
  static validateImageUrl(url) {
    try {
      const parsedUrl = new URL(url);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error(
          `Invalid URL protocol: ${parsedUrl.protocol}. Only http and https are allowed.`
        );
      }
    } catch (e) {
      if (e.message.includes("Invalid URL protocol")) {
        throw e;
      }
      throw new Error(`Invalid image URL: ${url}`);
    }
  }

  /**
   * Sanitizes URL for safe insertion into HTML attributes
   * @param {string} url - The URL to sanitize
   * @returns {string} - CSS-escaped URL safe for style attribute
   */
  static sanitizeUrl(url) {
    return CSS.escape(url);
  }

  /**
   * Creates a new WallPaper instance
   * @param {string} text - The motivational quote text
   * @param {string} colorCode - Text color in 6-digit hex format (without #)
   * @param {string} imgUrl - URL of the background image
   * @param {string} vertical - Vertical alignment: 'top', 'center', or 'bottom'
   * @param {string} horizontal - Horizontal alignment: 'left', 'center', or 'right'
   * @throws {Error} If any parameter is invalid
   */
  constructor(text, colorCode, imgUrl, vertical, horizontal) {
    WallPaper.validateAlignment(
      vertical,
      WallPaper.VERTICAL_ALIGNMENT,
      "vertical"
    );
    WallPaper.validateAlignment(
      horizontal,
      WallPaper.HORIZONTAL_ALIGNMENT,
      "horizontal"
    );
    WallPaper.validateColorCode(colorCode);
    WallPaper.validateImageUrl(imgUrl);

    this.text = text;
    this.colorCode = colorCode;
    this.imgUrl = imgUrl;
    this.vertical = vertical;
    this.horizontal = horizontal;
  }

  /**
   * Gets the Bootstrap class for vertical alignment
   * @returns {string} Bootstrap alignment class
   */
  getVerticalClass() {
    return WallPaper.VERTICAL_ALIGNMENT[this.vertical];
  }

  /**
   * Gets the Bootstrap class for horizontal alignment
   * @returns {string} Bootstrap alignment class
   */
  getHorizontalClass() {
    return WallPaper.HORIZONTAL_ALIGNMENT[this.horizontal];
  }

  /**
   * Creates the wallpaper DOM element
   * @returns {HTMLElement} The container element with wallpaper content
   */
  createWallPaperElement() {
    const container = document.createElement("div");
    container.classList.add("container", "d-flex", "justify-content-center");

    const sanitizedText = WallPaper.sanitizeText(this.text);
    const sanitizedUrl = WallPaper.sanitizeUrl(this.imgUrl);
    // Color code is already validated in constructor to be hex-only,
    // providing defense in depth against XSS
    const safeColorCode = this.colorCode.replace(/[^0-9A-Fa-f]/g, "");

    container.innerHTML = `
      <div class="vh-75 d-flex p-md-5 p-3 my-5 col-md-8 col-12 imgBackground ${this.getHorizontalClass()} ${this.getVerticalClass()}" 
           style="background-image: url('${sanitizedUrl}');">
        <div class="${WallPaper.TEXT_COLUMN_WIDTH}">
          <h3 class="paperText" style="color:#${safeColorCode};">
            ${sanitizedText}
          </h3>
        </div>
      </div>
    `;

    return container;
  }

  /**
   * Generates the wallpaper and appends it to the target element in DOM
   * @param {string} [targetId] - Optional target element ID (defaults to TARGET_ELEMENT_ID)
   */
  generateWallPaper(targetId = WallPaper.TARGET_ELEMENT_ID) {
    const container = this.createWallPaperElement();
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      throw new Error(`Target element with ID '${targetId}' not found.`);
    }

    targetElement.append(container);
  }
}

/**
 * Helper class for batch operations on WallPaper instances
 */
class WallPaperHelper {
  /**
   * Renders all wallpapers in the provided list to the DOM
   * @param {WallPaper[]} paperList - Array of WallPaper instances to render
   * @param {string} [targetId] - Optional target element ID for rendering
   */
  static showAll(paperList, targetId) {
    paperList.forEach((paper) => {
      paper.generateWallPaper(targetId);
    });
  }
}

// Use const for variables that are not reassigned
const wallPaper1 = new WallPaper(
  "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. - Antoine de Saint",
  "1B4F72",
  "https://cdn.pixabay.com/photo/2020/06/12/03/06/magnifying-glass-5288877__340.jpg",
  "top",
  "right"
);

const wallPaper2 = new WallPaper(
  "The scientist discovers a new type of material or energy and the engineer discovers a new use for it. - Gordon Lindsay Glegg",
  "007bff",
  "https://cdn.pixabay.com/photo/2018/02/23/04/38/laptop-3174729_1280.jpg",
  "center",
  "left"
);

const wallPaper3 = new WallPaper(
  "Scientists study the world as it is, engineers create the world that never has been. - Theodore von Karman",
  "ecf0f1",
  "https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg",
  "center",
  "center"
);
const wallPaperList = [wallPaper1, wallPaper2, wallPaper3];

WallPaperHelper.showAll(wallPaperList);
