const mainContainer = {
  element: null,
  width: 320,
  height: 480,
};

const screenContainer = {
  element: null,
  width: mainContainer.width * 0.9,
  height: mainContainer.height * 0.75,
};

const controllerContainer = {
  element: null,
  width: mainContainer.width * 0.9,
  height: mainContainer.height * 0.15,
  pressedButtonNum: 0,
  buttonList: ["◀", "▶"],
  status: {
    leftButtonPressed: false,
    rightButtonPressed: false,
  },
  changeStatus: (buttonText, isPressed) => {
    switch (buttonText) {
      case "◀":
        controllerContainer.status.leftButtonPressed = isPressed;
        break;
      case "▶":
        controllerContainer.status.rightButtonPressed = isPressed;
        break;
      default:
        // empty
        break;
    }
  },
  resetStatus: () => {
    controllerContainer.status.leftButtonPressed = false;
    controllerContainer.status.rightButtonPressed = false;
  },
};

const ball = {
  element: null,
  radius: 5,
  x: screenContainer.width / 2,
  y: screenContainer.height / 2,
  dx: 0,
  dy: 2,
  color: "yellow",
  init: () => {
    ball.element = document.createElement("div");
    ball.element.style.position = "absolute";
    ball.element.style.width = ball.radius * 2 + "px";
    ball.element.style.height = ball.radius * 2 + "px";
    ball.element.style.left = ball.x - ball.radius + "px";
    ball.element.style.top = ball.y - ball.radius + "px";
    ball.element.style.borderRadius = ball.radius + "px";
    ball.element.style.backgroundColor = ball.color;
    screenContainer.element.appendChild(ball.element);
  },
  update: () => {
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.x < ball.radius) {
      ball.x = ball.radius;
      ball.dx *= -1;
    }
    if (ball.x > screenContainer.width - ball.radius) {
      ball.x = screenContainer.width - ball.radius;
      ball.dx *= -1;
    }
    if (ball.y < ball.radius) {
      ball.y = ball.radius;
      ball.dy *= -1;
    }
    if (ball.y > screenContainer.height - ball.radius) {
      isGameOver = true;
      ball.element.style.display = "none";
    }
    if (
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width &&
      ball.y > paddle.y - paddle.height
    ) {
      ball.y = paddle.y - paddle.height;
      ball.dy *= -1;
    }

    ball.element.style.left = ball.x - ball.radius + "px";
    ball.element.style.top = ball.y - ball.radius + "px";
  },
};

const block = {
  element: null,
  width: 70,
  height: 30,
  x: 0,
  y: 0,
  color: "blue",
  init: () => {
    block.element = document.createElement("div");
    block.element.style.position = "absolute";
    block.element.style.width = block.width + "px";
    block.element.style.height = block.height + "px";
    block.element.style.left = block.x + "px";
    block.element.style.top = block.y + "px";
    block.element.style.backgroundColor = block.color;
    screenContainer.element.appendChild(block.element);
  },
  update: () => {
    block.element.style.left = block.x + "px";
    block.element.style.top = block.y + "px";
  },
};

const paddle = {
  element: null,
  width: 70,
  height: 10,
  x: screenContainer.width / 2,
  y: screenContainer.height * 0.85,
  movingDistance: 5,
  color: "white",
  init: () => {
    paddle.element = document.createElement("div");
    paddle.element.style.position = "absolute";
    paddle.element.style.width = paddle.width + "px";
    paddle.element.style.height = paddle.height + "px";
    paddle.element.style.left = paddle.x + "px";
    paddle.element.style.top = paddle.y + "px";
    paddle.element.style.backgroundColor = paddle.color;
    screenContainer.element.appendChild(paddle.element);
  },
  update: () => {
    paddle.element.style.left = paddle.x + "px";
    paddle.element.style.top = paddle.y + "px";
  },
  moveLeft: () => {
    paddle.x -= paddle.movingDistance;
    if (paddle.x < 0) {
      paddle.x = 0;
    }
  },
  moveRight: () => {
    paddle.x += paddle.movingDistance;
    if (paddle.x > screenContainer.width - paddle.width) {
      paddle.x = screenContainer.width - paddle.width;
    }
  },
};

let debugElement = null;

let isGameOver = false;

const init = () => {
  mainContainer.element = document.getElementById("main-container");
  mainContainer.element.style.position = "relative";
  mainContainer.element.style.width = mainContainer.width + "px";
  mainContainer.element.style.height = mainContainer.height + "px";
  mainContainer.element.style.margin = "5px";
  mainContainer.element.style.fontFamily =
    "'Helvetica Neue',Arial, 'Hiragino Kaku Gothic ProN','Hiragino Sans', Meiryo, sans-serif";
  mainContainer.element.style.backgroundColor = "#f5deb3";
  mainContainer.element.style.border = "2px solid #deb887";
  mainContainer.element.style.boxSizing = "border-box";
  mainContainer.element.style.borderRadius = "5px";
  mainContainer.element.style.display = "flex";
  mainContainer.element.style.alignItems = "center";
  mainContainer.element.style.justifyContent = "center";
  mainContainer.element.style.flexDirection = "column";
  mainContainer.element.style.overflow = "hidden";
  mainContainer.element.style.userSelect = "none";
  mainContainer.element.style.webkitUserSelect = "none";

  screenContainer.element = document.createElement("div");
  screenContainer.element.style.position = "relative";
  screenContainer.element.style.width = screenContainer.width + "px";
  screenContainer.element.style.height = screenContainer.height + "px";
  screenContainer.element.style.margin = "1px";
  screenContainer.element.style.display = "flex";
  screenContainer.element.style.alignItems = "center";
  screenContainer.element.style.justifyContent = "center";
  screenContainer.element.style.backgroundColor = "black";
  mainContainer.element.appendChild(screenContainer.element);

  controllerContainer.element = document.createElement("div");
  controllerContainer.element.style.position = "relative";
  controllerContainer.element.style.width = controllerContainer.width + "px";
  controllerContainer.element.style.height = controllerContainer.height + "px";
  controllerContainer.element.style.margin = "0px";
  controllerContainer.element.style.fontSize = "32px";
  controllerContainer.element.style.boxSizing = "border-box";
  controllerContainer.element.style.display = "flex";
  controllerContainer.element.style.alignItems = "center";
  controllerContainer.element.style.justifyContent = "center";
  mainContainer.element.appendChild(controllerContainer.element);
  initController();

  ball.init();
  paddle.init();
  block.init();
  tick();
};

const initController = () => {
  controllerContainer.buttonList.forEach((name) => {
    let buttonElement = document.createElement("div");
    buttonElement.style.position = "relative";
    buttonElement.style.width = controllerContainer.width * 0.35 + "px";
    buttonElement.style.height = controllerContainer.height * 0.5 + "px";
    buttonElement.style.margin = "15px";
    buttonElement.style.fontSize = controllerContainer.width * 0.1 + "px";
    buttonElement.style.backgroundColor = "orange";
    buttonElement.style.borderBottom = "5px solid #b84c00";
    buttonElement.style.borderRadius = "7px";
    buttonElement.style.boxSizing = "border-box";
    buttonElement.style.cursor = "pointer";
    buttonElement.style.display = "flex";
    buttonElement.style.alignItems = "center";
    buttonElement.style.justifyContent = "center";
    buttonElement.textContent = name;
    controllerContainer.element.appendChild(buttonElement);

    const handleButtonDown = (e) => {
      e.preventDefault();
      controllerContainer.pressedButtonNum++;
      if (controllerContainer.pressedButtonNum >= 2) {
        return;
      }
      e.target.style.borderBottom = "1px solid #b84c00";
      e.target.style.backgroundColor = "#b84c00";
      controllerContainer.changeStatus(e.target.textContent, true);
    };

    const handleButtonUp = (e) => {
      e.preventDefault();
      controllerContainer.pressedButtonNum--;
      e.target.style.borderBottom = "5px solid #b84c00";
      e.target.style.backgroundColor = "orange";
      controllerContainer.changeStatus(e.target.textContent, false);
    };

    if (window.ontouchstart === null) {
      buttonElement.ontouchstart = handleButtonDown;
      buttonElement.ontouchend = handleButtonUp;
    } else {
      buttonElement.onpointerdown = handleButtonDown;
      buttonElement.onpointerup = handleButtonUp;
    }
  });

  document.onkeydown = (e) => {
    e.preventDefault();
    switch (e.key) {
      case "ArrowLeft":
        controllerContainer.changeStatus("◀", true);
        break;
      case "ArrowRight":
        controllerContainer.changeStatus("▶", true);
        break;
      default:
        // empty
        break;
    }
  };
  document.onkeyup = (e) => {
    controllerContainer.resetStatus();
    e.preventDefault();
  };
};

const getTargetCell = (x, y) => {};

const moveBlock = (dx, dy, dr) => {};

const removeBlock = (type, x, y, rotation = 0) => {};

const showGameOverMessage = () => {
  let messageElement = document.createElement("div");
  messageElement.style.position = "relative";
  messageElement.style.zIndex = "1";
  messageElement.style.width = screenContainer.width + "px";
  messageElement.style.height = screenContainer.height * 0.9 + "px";
  messageElement.style.display = "flex";
  messageElement.style.alignItems = "center";
  messageElement.style.justifyContent = "center";
  messageElement.style.color = "red";
  messageElement.style.fontSize = "32px";
  messageElement.textContent = "Game Over";
  screenContainer.element.appendChild(messageElement);
};

const tick = () => {
  debugElement.textContent = controllerContainer.status.leftButtonPressed;
  if (controllerContainer.status.leftButtonPressed) {
    paddle.moveLeft();
  }
  if (controllerContainer.status.rightButtonPressed) {
    paddle.moveRight();
  }
  ball.update();
  paddle.update();
  block.update();

  if (isGameOver) {
    showGameOverMessage();
    return;
  }

  requestAnimationFrame(tick);
};

window.onload = () => {
  debugElement = document.getElementById("debug-message");
  debugElement.textContent = "debug";
  init();
};