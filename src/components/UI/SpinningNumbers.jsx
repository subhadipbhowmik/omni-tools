import "./SpinningNumbers.css";

// Removed type definition as it's not needed in JavaScript

function lerp(a, b, t) {
  return (b - a) * t + a;
}

function color(i, total) {
  const t = i / total;
  const hFrom = 240;
  const hTo = 290;
  const wFrom = 0;
  const wTo = 0;
  return `hwb(${lerp(hFrom, hTo, t)} ${lerp(wFrom, wTo, t)}% 0%)`;
}

function createWheel(i, total) {
  const distance = i + 3;
  const charWidth = 0.85;
  const speed = 1;
  const circum = distance * 2 * Math.PI;
  const numbers = Math.floor(circum / charWidth);
  const time = speed * numbers;
  const t = i / total;

  return {
    time,
    numbers,
    distance,
    color: color(i, total),
    scale: lerp(1, 0.25, t * t * 0.5),
  };
}

function SpinningWheel({ time, numbers, distance, color, scale }) {
  const angleDiff = (Math.PI * 2) / numbers;
  const divs = [];
  for (let i = 0; i < numbers; i++) {
    divs.push(angleDiff * i);
  }
  return (
    <div
      className="wheel"
      style={{
        color,
        "--l": `${distance}em`,
        "--m": numbers,
        "--t": `${time}s`,
        "--r1": Math.random() < 0.5 ? "reverse" : "normal",
        "--s": scale,
      }}
    >
      {divs.map((angle, i) =>
        Math.sqrt(Math.random()) < scale ? (
          <div
            key={i}
            className="number"
            style={{
              "--a": `${(angle * 180) / Math.PI}deg`,
              "--i": i,
              "--r": Math.random() < 0.5 ? "reverse" : "normal",
            }}
          >
            {/* {Math.round(Math.random())} */}
          </div>
        ) : null
      )}
    </div>
  );
}

export default function SpinningNumbers() {
  const total = 13;
  const wheels = Array.from({ length: total }, (_, i) => createWheel(i, total));
  return (
    <div className="spinning-number">
      {wheels.map((w, i) => (
        <SpinningWheel {...w} key={i} />
      ))}
    </div>
  );
}
