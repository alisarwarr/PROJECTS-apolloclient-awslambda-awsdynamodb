import React from 'react';
import style from './oneLollypop.module.scss';
import classnames from 'classnames';
//COMPONENTS
import Head from '../components/Head';
import Message from '../components/Message';
//SVG-COMPONENT
import Lollypop from '../components/Lollypop';
//MATERIAL-UI
import Typography from '@material-ui/core/Typography';
//REACT-REVEAL
import Zoom from 'react-reveal/Zoom';
//APOLLO-GRAPHQL
import { gql, useQuery } from '@apollo/client';

const GET_LOLLYPOPBYPATH_QUERY = gql`
    query($pathId: String!) {
        getLollypopById(pathId: $pathId) {
            id
            topColor,
            middleColor,
            bottomColor,
            to,
            message,
            from
        }
    }
`

export default function({ location }) {                 //used to get 'url' from location.pathname
    var path = location.pathname.slice(13);           //slice 'path' from theres url 'D30GU-GbB'

    const { loading, error, data } = useQuery(GET_LOLLYPOPBYPATH_QUERY, {
        variables: {
            pathId: path                              //its used to query the particular Lollypop
        }
    })

    if(loading) return (
        <>
            <Head
                title="Loading"
            />

            <div className={style.box}>
                <Message
                    sentence="Loading"
                />
            </div>
        </>
    )

    if(error) return (
        <>
            <Head
                title="Error"
            />

            <div className={style.box}>
                <Message
                    sentence="Sorry, Error 404!"
                />
            </div>
        </>
    )

    const thatLollypop = data.getLollypopById;

    return (
        <div className={style.body}>
            <Head
                title="Lollypop"
            />

            <div className={style.root}>
                <Zoom>
                    <div className={style.lollypop}>
                        <Lollypop
                            topColor={thatLollypop?.topColor}
                            middleColor={thatLollypop?.middleColor}
                            bottomColor={thatLollypop?.bottomColor}
                        />
                    </div>

                    <div className={style.content}>
                        <div className={classnames(style.jumbotron, "jumbotron", "jumbotron-fluid")}>
                            <div className="container">
                                <Typography className={style.link}>
                                    <span> Your lolly is freezing. Share it with this link: </span>
                                    <p> {location.href} </p>
                                </Typography>

                                <table className="table table-borderless table-dark table-sm">
                                    <tbody>
                                        <tr>
                                            <th className={style.heading}> to </th>
                                            <th className={style.word}> {thatLollypop?.to} </th>
                                        </tr>
                                        <tr>
                                            <th className={style.heading}> message </th>
                                            <th className={style.word}> {thatLollypop?.message} </th>
                                        </tr>
                                        <tr>
                                            <th className={style.heading}> from </th>
                                            <th className={style.word}> {thatLollypop?.from} </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Zoom>
            </div>
        </div>
    )
}