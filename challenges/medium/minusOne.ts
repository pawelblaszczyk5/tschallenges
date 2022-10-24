/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math
  
  ### Question
  
  Given a number (always positive) as a type. Your type should return the number decreased by one.
  
  For example:
  
  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```
  
  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

type PreviousDigit = {
  "0": "9";
  "1": "0";
  "2": "1";
  "3": "2";
  "4": "3";
  "5": "4";
  "6": "5";
  "7": "6";
  "8": "7";
  "9": "8";
};

type Digit = keyof PreviousDigit;

type StringToNumber<StringToTransform extends string> =
  StringToTransform extends `${infer P extends number}` ? P : never;

type StripLeadingZeros<StringToTransform extends string> =
  StringToTransform extends `${0}${infer Tail}`
    ? Tail extends ""
      ? StringToTransform
      : StripLeadingZeros<Tail>
    : StringToTransform;

type LastTwoLetters<StringToPick extends string> =
  StringToPick extends `${infer FirstChar}${infer SecondChar}${infer ThirdChar}${infer Rest}`
    ? LastTwoLetters<`${SecondChar}${ThirdChar}${Rest}`>
    : StringToPick extends `${infer Head}${infer Tail1 extends Digit}${infer Tail2 extends Digit}`
    ? [Tail1, Tail2]
    : StringToPick extends `${infer Tail1 extends Digit}${infer Tail2 extends Digit}`
    ? [Tail1, Tail2]
    : StringToPick extends `${infer Tail2 extends Digit}`
    ? ["", Tail2]
    : never;

type MinusOnePrivate<
  N extends string,
  CarryOver extends boolean = true,
  CurrentResult extends string = "",
  LastTwo extends [string, string] = LastTwoLetters<N>
> = N extends `${infer Head}${LastTwo[0]}${LastTwo[1]}`
  ? MinusOnePrivate<
      Head,
      LastTwo[1] extends "0" ? (LastTwo[0] extends "0" ? true : false) : false,
      `${LastTwo[0] extends Digit
        ? CarryOver extends true
          ? LastTwo[1] extends "0"
            ? PreviousDigit[LastTwo[0]]
            : LastTwo[0]
          : LastTwo[0]
        : LastTwo[0]}${LastTwo[1] extends Digit
        ? CarryOver extends true
          ? PreviousDigit[LastTwo[1]]
          : LastTwo[1]
        : LastTwo[1]}${CurrentResult}`
    >
  : StripLeadingZeros<CurrentResult>;

type MinusOne<N extends number> = StringToNumber<MinusOnePrivate<`${N}`>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type ABSOLUTE_WIN = Expect<Equal<MinusOne<9007199254740991>, 9007199254740990>>;

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
