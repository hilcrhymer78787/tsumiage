import {useState} from "react";
export default function Test() {
  const [value, setValue] = useState(5);
  return (
    <>
      <div>サンプル</div>
      {value}
    </>
  );
}
