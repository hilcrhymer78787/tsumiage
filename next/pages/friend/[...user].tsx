import Router from 'next/router';
import Layout from '@/layouts/default';
import CalendarList from '@/components/calendar/CalendarList';
import Typography from '@mui/material/Typography';
FriendId.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    );
};
export default function FriendId() {
    return (
        <div>
            <Typography
                color="primary"
                variant="h5"
                sx={{
                    textAlign: 'center',
                    m: '15px 0'
                }}>{Router.router.query.user[1]}さんの部屋</Typography>
            <CalendarList readonly userId={Number(Router.router.query.user[0])} />
        </div>
    );
}