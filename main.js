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
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  speed: 4,
  color: "yellow",
  init: () => {
    ball.x = screenContainer.width / 2;
    ball.y = screenContainer.height * 0.7;
    ball.dx = Math.random() < 0.5 ? -0.1 : 0.1;
    ball.dy = ball.speed;
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
      ball.x + ball.radius > paddle.x &&
      ball.x - ball.radius < paddle.x + paddle.width &&
      ball.y > paddle.y - ball.radius &&
      ball.y < paddle.y + paddle.height
    ) {
      ball.y = paddle.y - ball.radius;
      ball.dy *= -1;
      const ratio = ((ball.x - paddle.x) / paddle.width) * 2 - 1;
      const angle = 60 * ratio;
      debugElement.textContent = angle;
      ball.dx = Math.sin((angle * Math.PI) / 180) * ball.speed;
      ball.dy = -Math.cos((angle * Math.PI) / 180) * ball.speed;
    }

    ball.element.style.left = ball.x - ball.radius + "px";
    ball.element.style.top = ball.y - ball.radius + "px";
  },
};

const blocks = Array.from({ length: 8 }).map((_, index) => ({
  element: null,
  width: 50,
  height: 15,
  x: 0,
  y: 0,
  dx: 0,
  isActve: true,
  color: "blue",
  init() {
    this.x = Math.random() * (screenContainer.width - this.width);
    this.y = index * (this.height + 10);
    this.dx = Math.random() < 0.5 ? 1 : -1;
    this.color = `hsl(${(index * 360) / 8}, 100%, 50%)`;
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.backgroundColor = this.color;
    screenContainer.element.appendChild(this.element);
  },
  update() {
    if (this.isActve === false) {
      return;
    }
    this.x += this.dx;
    if (this.x < 0) {
      this.x = 0;
      this.dx *= -1;
    }
    if (this.x > screenContainer.width - this.width) {
      this.x = screenContainer.width - this.width;
      this.dx *= -1;
    }

    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";

    if (
      ball.x + ball.radius > this.x &&
      ball.x - ball.radius < this.x + this.width &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y + this.height
    ) {
      ball.dy *= -1;
      this.isActve = false;
      this.element.style.display = "none";
    }
  },
}));

const paddle = {
  element: null,
  width: 70,
  height: 7,
  x: 0,
  y: 0,
  spped: 5,
  color: "white",
  init: () => {
    paddle.x = screenContainer.width / 2 - paddle.width / 2;
    paddle.y = screenContainer.height * 0.85;
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
    paddle.x -= paddle.spped;
    if (paddle.x < 0) {
      paddle.x = 0;
    }
  },
  moveRight: () => {
    paddle.x += paddle.spped;
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
  blocks.forEach((block) => {
    block.init();
  });
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

const showGameClearMessage = () => {
  let messageElement = document.createElement("div");
  messageElement.style.position = "relative";
  messageElement.style.zIndex = "1";
  messageElement.style.width = screenContainer.width + "px";
  messageElement.style.height = screenContainer.height * 0.9 + "px";
  messageElement.style.display = "flex";
  messageElement.style.alignItems = "center";
  messageElement.style.justifyContent = "center";
  messageElement.style.color = "blue";
  messageElement.style.fontSize = "32px";
  messageElement.textContent = "Game Clear !!";
  screenContainer.element.appendChild(messageElement);
};

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
  if (controllerContainer.status.leftButtonPressed) {
    paddle.moveLeft();
  }
  if (controllerContainer.status.rightButtonPressed) {
    paddle.moveRight();
  }

  ball.update();
  paddle.update();
  blocks.forEach((block) => block.update());

  if (blocks.every((block) => block.isActve === false)) {
    showGameClearMessage();
    return;
  }

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
