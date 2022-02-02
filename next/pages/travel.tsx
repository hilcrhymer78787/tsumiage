import styles from '../styles/Travel.module.scss'
import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import MuiPagination from '@material-ui/lab/Pagination';
import HotelDetail from "../components/HotelDetail";
import { ApiResType, ApiErrType } from "../types/res"
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import axios from 'axios';
import Layout from '../layouts/default'
Travel.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}
export default function Travel() {
    const [isLoading, setIsLoading] = useState(false as boolean)
    const [focusHotel, setFocusHotel] = useState(null)
    const [keyword, setKeyword] = useState("東京" as string)
    const [error, seterror] = useState("" as string)
    const [data, setdata] = useState(null as ApiResType | null)
    const getdata = async (toPage: number) => {
        seterror("")
        setIsLoading(true)
        var applicationId = process.env.NEXT_PUBLIC_APPLICATION_ID
        const requestConfig: AxiosRequestConfig = {
            url: `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?format=json&keyword=${encodeURIComponent(keyword)}&applicationId=${applicationId}&page=${toPage}&hits=10`,
            method: "GET",
        };
        await axios(requestConfig)
            .then((res: AxiosResponse<ApiResType>) => {
                setdata(res.data)
            })
            .catch((err: AxiosError<ApiErrType>) => {
                setdata(null)
                switch (err.response.data.error) {
                    case 'not_found':
                        seterror("検索結果はありませんでした")
                        break;
                    case 'wrong_parameter':
                        seterror("有効なキーワードを指定してください")
                        break;
                    case 'too_many_requests':
                        seterror("リクエストが多いため一時的に通信が制限されました")
                        break;
                    default:
                        seterror(err.response.data.error_description)
                }
            })
            .finally(() => {
                setIsLoading(false)
            });
    }
    const onClickSearch = () => {
        getdata(1)
    }
    const onClickList = (e: React.MouseEvent<HTMLElement>) => {
        var clickedIndex = e.currentTarget.dataset.index
        setFocusHotel(data.hotels[clickedIndex].hotel[0].hotelBasicInfo)
    }
    const keywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }
    useEffect(() => {
        getdata(1)
    }, [])

    return (
        <div>
            <p>楽天APIでホテル検索</p>
            <TextField value={keyword} onChange={keywordChange} id="outlined-basic" variant="outlined" color="primary" />
            <Button className={styles.search_btn} onClick={onClickSearch} variant="contained" color="primary">検索</Button>
            {error &&
                <div className={styles.error}>{error}</div>
            }
            {data && <>
                {data.pagingInfo && data.pagingInfo.pageCount &&
                    <MuiPagination
                        count={data.pagingInfo.pageCount}
                        color="primary"
                        onChange={(e, toPage) => getdata(toPage)}
                        page={data.pagingInfo.page}
                    />
                }
                {data.hotels && !isLoading &&
                    <>
                        <List>
                            {data.hotels.map((hotel, index) => (
                                <ListItem onClick={onClickList} data-index={index} key={index.toString()}>
                                    <ListItemAvatar>
                                        <Avatar src={hotel.hotel[0].hotelBasicInfo.hotelThumbnailUrl} />
                                    </ListItemAvatar>
                                    {hotel.hotel &&
                                        <ListItemText>{hotel.hotel[0].hotelBasicInfo.hotelName}</ListItemText>
                                    }
                                </ListItem>
                            ))}
                        </List>
                    </>
                }
            </>}
            <Dialog open={Boolean(focusHotel)} onClose={() => { setFocusHotel(null) }}>
                {focusHotel &&
                    <HotelDetail onCloseMyself={() => { setFocusHotel(null) }} focusHotel={focusHotel} />
                }
            </Dialog>
        </div>
    )
}