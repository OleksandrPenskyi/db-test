import { userListRef } from './refs';

function changeBackgroundColor() {
  userListRef.children.forEach(item => {
    item.style.border = `1px solid rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
  });
}

function randomNumber() {
  return Math.floor(Math.random() * Math.floor(255));
}

export default changeBackgroundColor;
