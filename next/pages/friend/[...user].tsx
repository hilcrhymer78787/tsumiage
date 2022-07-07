import Layout from "@/layouts/default";
import CalendarList from "@/components/calendar/CalendarList";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
export default function FriendId () {
  const router = useRouter();
  if (router.asPath === router.route) return null;
  if (!router.query.user) return null;
  return (
    <Layout>
      <Typography
        color="primary"
        variant="h5"
        sx={{
          textAlign: "center",
          m: "15px 0"
        }}>{router.query.user[1]}さんの部屋</Typography>
      <CalendarList readonly userId={Number(router.query.user[0])} />
    </Layout>
  );
}