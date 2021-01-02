import { makeStyles, createStyles } from '@material-ui/core/styles'

export type LiveChatMessageStyleType = ReturnType<typeof useChatListItemStyle>

interface StyleProps {
    opacitySC: number
}

export const useChatListItemStyle = makeStyles(() => createStyles({
    textMessage: {
        padding: '5px 10px',
        display: 'grid',
        gridTemplateColumns: '1.5em 1fr',
        gridGap: '1.25em'
    },
    card: {
        borderRadius: 4,
        overflow: 'hidden',
        margin: '10px 0px',
        opacity: (props: StyleProps) => props.opacitySC ? props.opacitySC : '1'
    },
    cardHeader: {
        display: 'grid',
        gridTemplateColumns: '3.5em 1fr',
        padding: '0.8em 0.8em',
        gridGap: '0.6em'
    },
    cardHeaderAuthorName: {
        fontSize: '1em',
        marginBottom: '0.23em'
    },
    cardHeaderHighlight: {
        fontSize: '1.05em',
    },
    cardHeaderImageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardHeaderImage: {
        width: '3em !important',
    },
    cardMessage: {
        padding: '0.8em 0.8em',
    },
    bold: {
        fontWeight: 600
    },
    authorImage: {
        borderRadius: '50%',
        width: '1.6em',
    },
    authorName: {
        fontWeight: 800,
        display: 'inline-block',
        wordBreak: 'break-all',
        marginRight: '0.6em'
    },
    autherNameInner: {
        display: 'flex',
        flexFlow: 'row nowrap'
    },
    isMember: {
        color: 'green'
    },
    isMod: {
        // color: 'black',
        // backgroundColor: 'rgb(94,132,241)',
        // padding: '0.15em 0.4em',
        // borderRadius: '0.4em'
        color: 'rgb(94,132,241)',
    },
    isAuthor: {
        color: 'black',
        backgroundColor: 'rgb(255,200,0)',
        padding: '0.15em 0.4em',
        borderRadius: '0.4em'
    },
    authorBadge: {
        width: '1.3em',
        marginRight: 5,
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    emoji: {
        // width: props => theme.spacing(props.fontSize + 1.75),
        width: '1.8em',
        marginRight: 5,
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    message: {
        wordBreak: 'break-word'
    },
}))
