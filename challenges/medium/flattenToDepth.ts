/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array
  
  ### Question
  
  Recursively flatten array up to depth times.
  
  For example:
  
  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```
  
  If the depth is provided, it's guaranteed to be positive integer.
  
  > View on GitHub: https://tsch.js.org/3243
*/

/* _____________ Your Code Here _____________ */

type FlattenDepth<
  List extends Array<any>,
  RemainingFlattens extends number = 1,
  Result extends Array<any> = []
> = List extends [infer Head, ...infer Rest]
  ? Head extends Array<any>
    ? RemainingFlattens extends 0
      ? FlattenDepth<Rest, RemainingFlattens, [...Result, Head]>
      : FlattenDepth<
          Rest,
          RemainingFlattens,
          [...Result, ...FlattenDepth<Head, MinusOne<RemainingFlattens>>]
        >
    : FlattenDepth<Rest, RemainingFlattens, [...Result, Head]>
  : Result;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";
import type { MinusOne } from "./minusOne";

type w = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 1>;

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/
