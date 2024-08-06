import { cn } from "../lib/utils";
import Marquee, { MarqueeProps } from "../components/magicui/marquee";
import { Img } from "react-image";
import { marqueeCard } from "../lib/types";
import { Link } from "react-router-dom";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const Card = ({
  img,
  name,
  username,
  body,
  path,
}: marqueeCard & { path?: string }) => {
  //
  return (
    <Link
      to={path || ""}
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Img
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img || ""}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name || "name"}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">
            {username || "username"}
          </p>
        </div>
      </div>
      {body && <blockquote className="mt-2 text-sm">{body}</blockquote>}
    </Link>
  );
};

export function MarqueeDemo({
  _firstRow = firstRow,
  _secondRow = secondRow,
  options,
}: {
  _firstRow?: marqueeCard[];
  _secondRow?: marqueeCard[];
  options?: MarqueeProps & { duration?: number; path?: string };
}) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg py-3">
      <Marquee
        {...options}
        className={`[--duration:${options?.duration || 40}s]`}
      >
        {_firstRow.map((review, idx) => (
          <Card
            key={idx}
            {...review}
            {...{
              path:
                (options?.path || "") +
                review.username.replace(/\s+/g, "-").toLowerCase(),
            }}
          />
        ))}
      </Marquee>
      <Marquee
        {...options}
        reverse
        className={`[--duration:${options?.duration || 40}s]`}
      >
        {_secondRow.map((review, idx) => (
          <Card
            key={idx}
            {...review}
            {...{
              path:
                (options?.path || "") +
                review.username.replace(/\s+/g, "-").toLowerCase(),
            }}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
