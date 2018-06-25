# Hi!

## How do I run this nonsense?
Part 1: `tsc src/NameFileGenerator.ts; node src/NameFileGenerator.js` (or `src/NameFileGenerator.ts` if you have it installed)
Part 2: `tsc src/index.js; node src/index.js` and visit `http://localhost:3000/name-count?name=Oliver` as you would expect.

## What should I look for when going through this code?
I've used commit messages as a sort of diary of progress. Definitely worth going through the Git history to see how it was shaped over time.

I've noted any technical/architecture decisions with `TECH TALK` to make it a bit easier to find points of interest.

## What did you use to make this?
I came up with the solution design myself. Normally if given a task like this the first thing you do is Google it to see if there's a library or method that already works. "Don't reinvent the goddamn wheel and don't waste time testing proofs on a thing that's already proven to work", in other words.

But the last time I did that in an interview they called me out on it. >:|

As mentioned in the Git commit history I now think this was the wrong move, but the damage is done. It's probably possible to use async threads to process the lines with multiple workers or batch the lines by paragraph instead of line, but I'm out of time.