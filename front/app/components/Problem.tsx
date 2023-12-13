import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useStopwatch, useTime } from "react-timer-hook";

interface Problem {
  id: string;
  title: string;
  tags: string[];
}

const SearchBar = ({
  problem,
  setProblem,
}: {
  problem: Problem;
  setProblem: React.Dispatch<React.SetStateAction<Problem>>;
}) => {
  const problems: Problem[] = [
    {
      id: "1",
      title: "A. Watermelon",
      tags: ["brute force", "math", "*800"],
    },
    {
      id: "2",
      title: "G. Lights",
      tags: [
        "brute force",
        "constructive",
        "algorithms",
        "dfs and similar",
        "graphs",
        "greedy",
        "implementation",
        "*2200",
      ],
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setProblem(e.target.value);
    const newProblem: Problem | undefined = problems.find(
      (problem: Problem) => problem.id == e.target.value
    );
    if (newProblem) setProblem(newProblem);
  };

  return (
    <div>
      <select
        id="problemSelect"
        className="w-96"
        onChange={handleChange}
        defaultValue={problem.id}
      >
        {problems.map((curProblem) => {
          const { title, id } = curProblem;
          return (
            <option key={title} value={id}>
              {title}
            </option>
          );
        })}
      </select>
      {/* <div className="tags flex">
        {problem.tags.map((tag: string) => {
          return (
            <div key={tag} className="tag mx-5">
              {tag}
            </div>
          );
        })}
      </div> */}
      {/* <h2 className="text-center">{title}</h2>
      <div className="tags flex">
        {tags.map((tag: string) => {
          return (
            <div key={tag} className="tag mx-5">
              {tag}
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

const Clock = () => {
  const [play, setPlay] = useState(true);
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true });

  const formatTime = ({
    days,
    hours,
    minutes,
    seconds,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    const format = (time: number) => {
      return time < 10 ? "0" + time : time;
    };

    return (
      (days > 0 ? format(days) + ":" : "") +
      (hours > 0 ? format(hours) + ":" : "") +
      (format(minutes) + ":") +
      format(seconds)
    );
  };

  return (
    <div className="text-center">
      <div className="text-8xl leading-loose h-96 w-96 border-4 border-slate-400 flex items-center justify-center mb-8">
        <span>{formatTime({ days, hours, minutes, seconds })}</span>
      </div>
      <button
        className="border-solid border-4"
        onClick={() => {
          play ? pause() : start();
          setPlay(!play);
        }}
      >
        {play ? "Pause" : "Start"}
      </button>
    </div>
  );
};

const Note = ({ title }: { title: string }) => {
  return (
    <div className="">
      <h3>{title}</h3>
      <textarea className="h-32 w-80" placeholder="take your note here..." />
    </div>
  );
};

const Notes = () => {
  const noteTitles = ["Take aways", "Meta cognition", "Analysis"];
  return (
    <div>
      {noteTitles.map((title: string) => (
        <Note key={title} title={title} />
      ))}
    </div>
  );
};

const Problem = () => {
  const [problem, setProblem] = useState<Problem>({
    title: "bobo",
    tags: ["brute force", "math", "*800"],
    id: "2",
  });

  return (
    <div className="h-screen w-screen flex px-40 justify-between">
      <div className="flex flex-col justify-center items-center space-y-16">
        <SearchBar problem={problem} setProblem={setProblem} />
        <Clock />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Notes />
      </div>
    </div>
  );
};

export default Problem;
