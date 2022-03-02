import React from 'react';
import Layout from '@/layouts/default';
import CalendarList from '@/components/calendar/CalendarList'
Calendar.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    );
};
export default function Calendar() {

    return (
        <CalendarList />
    );
}