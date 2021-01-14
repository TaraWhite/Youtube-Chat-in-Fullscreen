import React, { useContext, useMemo, useEffect, useState, useCallback } from 'react'
import { Done, Replay } from '@material-ui/icons'
import { Paper, Typography, Box, Dialog, DialogActions, FormControl } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { MySlider } from '@components/MySlider'
import { MyButton } from '@components/MyButton'
import { MyInputLabel } from '@components/MyInputLabel'
import { MySelect } from '@components/MySelect'
import { MyMenuItem } from '@components/MyMenuItem'
import { StorageContext } from '@contexts/StorageContext'
import { useFullscreenState } from '@hooks/useFullscreenState'
import { RgbColorPicker } from 'react-colorful'
import 'react-colorful/dist/index.css'
import '@css/colorful.css'
import { Color } from '@models/Storage'

interface SettingsModelProps {
    show: boolean
    onClose: () => void
}

const useStyles = makeStyles((theme) => createStyles({
    paper: {
        background: 'transparent'
    },
    container: {
        padding: 30,
        background: 'rgba(20, 20, 20, 0.8)',
        borderRadius: 20,
        width: '700px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr auto',
        gridGap: '20px',
        fontSize: '16px !important'
    },
    actions: {
        gridColumnStart: 1,
        gridColumnEnd: 3
    },
    btn: {
        marginTop: theme.spacing(2),
    },
}))

export const SettingsModal: React.FC<SettingsModelProps> = ({ show, onClose }) => {

    const { isFullscreen } = useFullscreenState()
    const { storage: { fontSize, opacity, blur, show: showOverlay_Storage, opacitySC, backgroundColor, color: fontColor }, storageDispatch, } = useContext(StorageContext);
    const showApp = useMemo(() => showOverlay_Storage && isFullscreen, [isFullscreen, showOverlay_Storage]);
    const [menuValue, setMenuValue] = useState<number>(0)


    const colorMode: ('Background' | 'Font') = useMemo(() => (menuValue === 0) ? 'Background' : 'Font', [menuValue])
    const color = useMemo(() => colorMode === 'Background' ? backgroundColor : fontColor, [colorMode, backgroundColor, fontColor])
    const setColor = useCallback((c: Color) => colorMode === 'Background'
        ? storageDispatch({ type: 'changeBackgroundColor', backgroundColor: c })
        : storageDispatch({ type: 'changeFontColor', color: c })
        , [colorMode, storageDispatch])

    const classes = useStyles()

    const maxFontSize = 28,
        minFontSize = 8;

    const FontValueOnChange = (_: any, newValue: number | number[]) => {
        storageDispatch({
            type: 'changeFontSize',
            fontSize: newValue as number,
        });
    };

    const OpacityValueOnChange = (_: any, newValue: number | number[]) => {
        storageDispatch({ type: 'changeOpacity', opacity: newValue as number });
    };

    const OpacitySCValueOnChange = (_: any, newValue: number | number[]) => {
        storageDispatch({ type: 'changeOpacitySC', opacitySC: newValue as number });
    };

    const BlurValueOnChange = (_: any, newValue: number | number[]) => {
        storageDispatch({
            type: 'changeBackgroundBlur',
            blur: newValue as number,
        });
    };

    const setDefault = () => storageDispatch({ type: 'setSettingsPanelDefault' })

    useEffect(() => {
        if (!showApp) onClose()
    }, [showApp, onClose])


    return (
        <Dialog
            classes={{
                paper: classes.paper
            }}
            hideBackdrop={true}
            maxWidth='lg'
            onClose={onClose}
            open={showApp && show}>
            {/* <Paper className={classes.settings}> */}
            <Paper className={classes.container}>
                <Box>
                    <Typography gutterBottom
                        color="textPrimary"
                        variant="h5">
                        Font Size
                    </Typography>
                    <MySlider
                        min={minFontSize}
                        max={maxFontSize}
                        step={1}
                        value={fontSize}
                        valueLabelDisplay="auto"
                        onChange={FontValueOnChange}
                    />
                    <Typography gutterBottom
                        color="textPrimary"
                        variant="h5">
                        Opacity
                    </Typography>
                    <MySlider
                        min={0}
                        max={1}
                        step={0.01}
                        value={opacity}
                        valueLabelDisplay="auto"
                        onChange={OpacityValueOnChange}
                    />
                    <Typography gutterBottom
                        color="textPrimary"
                        variant="h5">
                        Opacity for Super Chat
                    </Typography>
                    <MySlider
                        min={0}
                        max={1}
                        step={0.01}
                        value={opacitySC}
                        valueLabelDisplay="auto"
                        onChange={OpacitySCValueOnChange}
                    />
                    <Typography gutterBottom
                        color="textPrimary"
                        variant="h5">
                        Blur
                    </Typography>
                    <MySlider
                        min={0}
                        max={30}
                        step={1}
                        value={blur}
                        valueLabelDisplay="auto"
                        onChange={BlurValueOnChange}
                    />
                    <br />
                    <Typography
                        gutterBottom
                        variant='h6'>
                        Use <code>Ctrl+Alt+c</code> to toggle overlay
                    </Typography>
                    <Typography
                        gutterBottom
                        variant='h6'>
                        Press <code>Ctrl+Alt</code> then drag to move overlay
                    </Typography>
                </Box>
                <Box minHeight={300}>
                    <Box mb={1.5}>
                        <FormControl>
                            <MyInputLabel
                                color='primary'
                                id='change-color-label'
                            >
                                Change color of
                            </MyInputLabel>
                            <MySelect
                                labelId='change-color-label'
                                value={menuValue}
                            >
                                <MyMenuItem
                                    value={0}
                                    onClick={() => setMenuValue(0)}
                                >
                                    Background
                                </MyMenuItem>
                                <MyMenuItem
                                    value={1}
                                    onClick={() => setMenuValue(1)}
                                >
                                    Font
                                </MyMenuItem>
                            </MySelect>
                        </FormControl>
                    </Box>
                    <Box mb={1}>
                        <Typography gutterBottom
                            color="textSecondary"
                            variant='h5'>
                            Current Color: {`rgb(${color.r}, ${color.g}, ${color.b})`}
                        </Typography>
                    </Box>
                    <RgbColorPicker
                        color={color}
                        onChange={setColor}
                    />
                </Box>
                <DialogActions
                    className={classes.actions}
                >
                    <MyButton
                        className={classes.btn}
                        startIcon={<Replay />}
                        color='primary'
                        variant='outlined'
                        size='large'
                        onClick={setDefault}
                    >
                        Set Default
                    </MyButton>
                    <MyButton
                        className={classes.btn}
                        startIcon={<Done />}
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={onClose}
                    >
                        Done
                    </MyButton>
                </DialogActions>
            </Paper>
        </Dialog>
    )
}

