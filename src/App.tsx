import { ReactComponent as StarIcon } from "./assets/starIcon.svg";
import { ReactComponent as CircleIcon } from "./assets/circleIcon.svg";
import { ReactComponent as BatteryIcon } from "./assets/battery.svg";
import { ReactComponent as BellIcon } from "./assets/bell.svg";
import { ReactComponent as BoltIcon } from "./assets/bolt.svg";
import { Rating } from "./Rating";

function App() {
  return (
    <div className="flex flex-col">
      <div className="max-w-[150px] flex">
        <Rating
          scaling={{ from: "red", to: "green", gamma: 0.4 }}
          rating={4.7}
          icon={StarIcon}
          className="text-amber-300"
        />
        4.7
      </div>
      <div className="max-w-[150px] flex">
        <Rating
          scaling={{ from: "red", to: "green", gamma: 0.5 }}
          rating={5}
          icon={StarIcon}
          className="text-amber-300"
        />
        5
      </div>
      <div className="max-w-[350px] flex">
        Stepped
        <Rating
          scaling={{
            to: "#56ab2f",
            from: "#a8e063",
            gamma: 0.5,
            stepped: true,
          }}
          rating={4.2}
          icon={StarIcon}
        />
        4.2
      </div>
      <div className="max-w-[350px] flex">
        Stepped
        <Rating
          scaling={{ to: "#56ab2f", from: "#a8e063", gamma: 0.5 }}
          rating={3.6}
          icon={StarIcon}
          className="text-amber-300"
        />
        3.6
      </div>
      <div className="max-w-[120px] flex">
        <Rating rating={4.35} icon={StarIcon} className="text-amber-300" />
        4.35
      </div>
      <div className="max-w-[120px] flex">
        <Rating
          rating={2.35}
          icon={CircleIcon}
          className="text-amber-300 stroke-amber-300"
          strokeWidth={1}
        />
        2.35
      </div>
      <div className="max-w-[120px] flex">
        <Rating rating={4.35} icon={BatteryIcon} className="text-amber-300" />
        4.35
      </div>
      <div className="max-w-[360px] flex">
        <Rating
          rating={4.35}
          maxRating={9}
          icon={BoltIcon}
          className="text-amber-300 stroke-slate-100"
        />
        4.35
      </div>
      <div className="max-w-[360px] flex">
        <Rating
          rating={4.35}
          maxRating={9}
          icon={BellIcon}
          className="text-amber-300 stroke-slate-100 hover:text-red-300 hover:translate-y-1 transition-all ease-in-out duration-1000"
        />
        4.35
      </div>
    </div>
  );
}

export default App;
