import React, { useState } from 'react'
import { render } from 'react-dom'
import { paidDummyData } from './dummy'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { LiveChatPaidMessage } from '../components/LiveChatPaidMessage'
import { useLiveChatMessageStyle } from '../styles/ChatList.style'
import { LiveChatTextMessage } from '../components/LiveChatTextMessage'
import { LiveChatMembershipItem } from '../components/LiveChatMembershipItem'
import { Container } from '@material-ui/core'
import { MySlider } from '../components/MySlider'
import { MyButton } from '../components/MyButton'
import { Done } from '@material-ui/icons'
import { MySwitch } from '../components/MySwitch'
import { ChatOverlay } from '../components/ChatOverlay'

const useStyles = makeStyles(theme => createStyles({
    container: {
        fontFamily: `'Noto Sans JP', sans-serif`,
        width: 350,
        height: 600,
        padding: 10,
        fontSize: (props: { fontSize: number }) => `${props.fontSize}px`
    },
}))



const App: React.FC = () => {
    const [fontSize, setFontSize] = useState<number>(16)
    const [checked, setCheck] = useState<boolean>(false)
    const data = paidDummyData as YTLiveChat.LiveAction[]
    const classes = useLiveChatMessageStyle({ fontSize: 16 })
    const containerClasses = useStyles({ fontSize })
    return (
        <>
            <button onClick={() => setFontSize(13)}>Font size:13</button>
            <button onClick={() => setFontSize(16)}>Font size:16</button>
            <button onClick={() => setFontSize(25)}>Font size:25</button>
            <div className={containerClasses.container}>
                {
                    data.map((action, i) => {
                        const { liveChatPaidMessageRenderer, liveChatTextMessageRenderer, liveChatMembershipItemRenderer } = action.addChatItemAction!.item
                        if (liveChatPaidMessageRenderer)
                            return <LiveChatPaidMessage key={i}
                                renderer={liveChatPaidMessageRenderer}
                                classes={classes} />
                        else if (liveChatTextMessageRenderer)
                            return <LiveChatTextMessage key={i}
                                renderer={liveChatTextMessageRenderer}
                                classes={classes} />
                        else if (liveChatMembershipItemRenderer)
                            return <LiveChatMembershipItem key={i}
                                renderer={liveChatMembershipItemRenderer}
                                classes={classes} />
                        else
                            return <React.Fragment key={i} />
                    })
                }
            </div>
            <Container maxWidth={"sm"}>
                <MySlider
                    min={8}
                    max={30}
                    defaultValue={16}
                    onChange={(event, value) => setFontSize(value as number)}
                    valueLabelDisplay={'auto'}>
                </MySlider>
            </Container>
            <MyButton
                startIcon={<Done />}
                variant='contained'
                color='primary'
                size='large'
            >Done</MyButton>
            <MySwitch checked={checked}
                onClick={() => setCheck(pre => !pre)} />
        </>
    )

}



render(<App />, document.getElementById('root'))
