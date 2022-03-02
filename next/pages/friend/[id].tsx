import Router from 'next/router';
import Layout from '@/layouts/default';
import CalendarList from '@/components/calendar/CalendarList';
FriendId.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    );
};
export default function FriendId() {
    return (
        <CalendarList userId={Number(Router.router.query.id)}/>
    );
}