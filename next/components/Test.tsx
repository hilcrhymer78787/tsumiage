import { useState } from "react";
const Test = () => {
  const [value, setValue] = useState(5);
  return (
    <>
      <div>サンプル</div>
      {value}
    </>
  );
};
export default Test;
