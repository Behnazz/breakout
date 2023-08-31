const screenCenterX = window.innerWidth / 2;
const screenCenterY = window.innerHeight / 2;

const element = document.querySelector('.ball'); //this is the ball
const radius = parseInt(getComputedStyle(element).width) / 2;
const speed = 0.2; //pixel per millisec

//ToDo:normalise direction vector
const direction = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
element.style.left = screenCenterX + 'px';
element.style.top = screenCenterY + 'px';

const ball = {
  element,
  speed,
  direction,
  radius,
};

draw(ball, Date.now());

function draw(ball, previousTime) {
  const time = Date.now();
  const deltaTime = time - previousTime;
  const { left: x, top: y } = getComputedStyle(element); //this is position
  const left = parseInt(x) + ball.direction.x * (ball.speed * deltaTime); //horizental center of the ball(C)
  const top = parseInt(y) + ball.direction.y * (ball.speed * deltaTime); // vertical center of the ball (C)

  const distanceFromRightEdge = window.innerWidth - (left + ball.radius);
  const distanceFromLeftEdge = left - ball.radius;
  const distanceFromBottomEdge = window.innerHeight - (top + ball.radius);
  const distanceFromTopEdge = top - ball.radius;

  const hasHitRightEdge = distanceFromRightEdge <= 0;
  const hasHitLeftEdge = distanceFromLeftEdge <= 0;
  const hasHitBottomEdge = distanceFromBottomEdge <= 0;
  const hasHitTopEdge = distanceFromTopEdge <= 0;

  //the ball has hit the horizental edge
  if (hasHitRightEdge || hasHitLeftEdge) {
    ball.direction.x = ball.direction.x * -1;
  }
  //the ball has hit the vertical edge
  else if (hasHitBottomEdge || hasHitTopEdge) {
    ball.direction.y = ball.direction.y * -1;
  }
  //the ball is moving freely
  else {
    ball.element.style.left = left + 'px';
    ball.element.style.top = top + 'px';
  }

  //queue the next move
  requestAnimationFrame(() => draw(ball, time));
}
