import { useEffect } from "react";
import { useRouter } from "next/router";
const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/task");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
export default Index;
