import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Layout from '../layouts/default'
import styles from '../styles/Calendar.module.scss'
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
        count: state.count,
        post: state.post
    };
};
About.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}
function About({ dispatch, count, post, loginInfo }) {
    return (
        <div className='card'>
            <div className="card_header">
                <span className="card_header_ttl">カレンダー</span>
            </div>
            <div className="card_body">
                <ul className="content">
                    {/* <li v-for="n in firstDay" :key="n" className="content_item blank"></li>
                <li v-for="(calendar, index) in displayCalendars" :key="calendar.date" v-ripple className="content_item main">
                    <div @click="$router.push(`/calendar?year=${year}&month=${month}&day=${index + 1}`)" className="content_item_inner">
                        <CalendarDayIcon :day="index + 1" />
                        <v-responsive className="pa-1 pie_graph" aspect-ratio="1">
                            <div v-if="calendar.minute">
                                <div className="pie_graph_cover">{{calendar.minute}}</div>
                                <PieGraphWrap mode="days" :propsDatas="calendar.users" />
                            </div>
                        </v-responsive>
                    </div>
                </li>
                <li v-for="n in lastDayCount" :key="n + 100" className="content_item blank"></li> */}
                        {/* {tasks.map((task, index) => (
                            <CardActionArea onClick={onFocusTask} data-index={index} key={index.toString()}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src="https://i.picsum.photos/id/30/500/300.jpg?hmac=p1-iOhnRmBgus54WChFXINxaQuqvFO-q0wegbZjjLo0" />
                                    </ListItemAvatar>
                                    <ListItemText>{task.name}</ListItemText>
                                </ListItem>
                            </CardActionArea>
                        ))} */}
                </ul >
            </div >
        </div >
    );
}

export default connect(mapStateToProps)(About);