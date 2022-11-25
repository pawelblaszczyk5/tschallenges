/*
  16259 - ToPrimitive
  -------
  by 前端子鱼 (@mwc) #medium 
  
  ### Question
  
  Convert a property of type literal (label type) to a primitive type.
  
  For example
  
  ```typescript
  type X = {
    name: 'Tom',
    age: 30,
    married: false,
    addr: {
      home: '123456',
      phone: '13111111111'
    }
  }
  
  type Expected = {
    name: string,
    age: number,
    married: boolean,
    addr: {
      home: string,
      phone: string
    }
  }
  type Todo = ToPrimitive<X> // should be same as `Expected`
  ```
  
  > View on GitHub: https://tsch.js.org/16259
*/

/* _____________ Your Code Here _____________ */

type ArrayToPrimitive<Elements extends Array<any>> = {
  [Index in keyof Elements]: ValueToPrimitive<Elements[Index]>;
};

type ValueToPrimitive<Value extends any> = Value extends string
  ? string
  : Value extends boolean
  ? boolean
  : Value extends number
  ? number
  : Value extends Array<any>
  ? ArrayToPrimitive<Value>
  : Value;

type ToPrimitive<ObjectToTransform extends Record<string, unknown>> = {
  [Key in keyof ObjectToTransform]: ObjectToTransform[Key] extends Record<
    string,
    unknown
  >
    ? ToPrimitive<ObjectToTransform[Key]>
    : ValueToPrimitive<ObjectToTransform[Key]>;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type PersonInfo = {
  name: "Tom";
  age: 30;
  married: false;
  addr: {
    home: "123456";
    phone: "13111111111";
  };
  hobbies: ["sing", "dance"];
};

type ExpectedResult = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
  hobbies: [string, string];
};

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/16259/answer
  > View solutions: https://tsch.js.org/16259/solutions
  > More Challenges: https://tsch.js.org
*/
