import React, { useState, useEffect } from 'react';
import TaskList from '@/components/task/TaskList';
import Layout from '@/layouts/default';
import moment from 'moment';
Task.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    );
};
export default function Task() {
    return (
        <TaskList date={moment().format("YYYY-MM-DD")} />
    );
}