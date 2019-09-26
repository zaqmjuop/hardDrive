const keyCodeMap = {
  w: 87,
  s: 83,
  a: 65,
  d: 68
};
const state = document.querySelector("#container .state");
const rotate = { x: 0, y: 0, z: 0 };
const translate = { x: 0, y: 0, z: -5000 };
const rotate3d = event => {
  console.log("transform3d", event.key);
  const transform = `transform:transform3d(${translate.x}px,${translate.y}px,${translate.z}px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) rotateZ(${rotate.z}deg)`;
  state.style.transform = transform;
  // document.removeEventListener("keyup", rotate3d);
};
const gene = () => {
  return rotate3d;
};
const keyHolding = [];
const func1 = event => {
  if (event.key && !keyHolding.includes(event.key)) {
    keyHolding.push(event.key);
  }
  console.log(event.key, keyHolding);
};
document.addEventListener("keydown", func1);
document.addEventListener("keyup", event => {
  const keyIndex = keyHolding.findIndex(key => key === event.key);
  if (keyIndex > -1) {
    keyHolding.splice(keyIndex, 1);
  }
  console.log(event);
  if (keyHolding.length > -1) {
    document.dispatchEvent(new Event("keydown"));
  }
});
