/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object
  
  ### Question
  
  Get an `Object` that is the difference between `O` & `O1`
  
  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

// Copied from some previous excercise
type Merge<
  FirstObject extends Record<string, any>,
  SecondObject extends Record<string, any>
> = {
  [Key in
    | keyof FirstObject
    | keyof SecondObject]: Key extends keyof SecondObject
    ? SecondObject[Key]
    : Key extends keyof FirstObject
    ? FirstObject[Key]
    : never;
};

type Diff<
  FirstObject extends Record<string, any>,
  SecondObject extends Record<string, any>
> = Merge<
  {
    [Key in Exclude<keyof SecondObject, keyof FirstObject>]: SecondObject[Key];
  },
  {
    [Key in Exclude<keyof FirstObject, keyof SecondObject>]: FirstObject[Key];
  }
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
