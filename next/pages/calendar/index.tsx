import Layout from "@/layouts/default";
import CalendarMain from "@/components/calendar/CalendarMain";

const Calendar = () => {
  return (
    <Layout pcMaxWidth={false} spP="0 !important" pcP="0 !important">
      <CalendarMain />
    </Layout>
  );
};
export default Calendar;
