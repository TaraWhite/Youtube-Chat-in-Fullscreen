import React, { useEffect, useMemo, useRef, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

interface Distance {
    x: number,
    y: number
}

type Point = Distance


export function useMovable(ref: React.RefObject<HTMLElement>, onEnded: () => any) {

    const [id] = useState<string>(`A${uuidV4()}`)
    const trigger_id = useMemo(() => id, [id])

    const [movable, setMovable] = useState<boolean>(false)
    const [initPoint, setInitPoint] = useState<Point>({ x: 0, y: 0 })

    const movableRef = useRef<boolean>(movable)
    movableRef.current = movable
    const initPointRef = useRef<Point>(initPoint)
    initPointRef.current = initPoint

    const moving = ({ pageX: mouseX, pageY: mouseY }: MouseEvent) => {
        if (!movableRef.current || !ref.current) return
        const el = ref.current
        requestAnimationFrame(() => {
            el.style.transform = `translate(${mouseX - initPointRef.current.x}px,${mouseY - initPointRef.current.y}px)`
        })
    }


    const Trigger = ({ pageX: mouseX, pageY: mouseY, target }: MouseEvent) => {
        if (!ref.current || !(target as HTMLElement).closest(`#${id}`)) return
        setMovable(true)
        setInitPoint({ x: mouseX, y: mouseY })
    }

    const deactive = () => {
        setMovable(false)
        if (ref.current) {
            const el = ref.current
            const rect = el.getBoundingClientRect()
            requestAnimationFrame(() => {
                el.style.top = rect.top + 'px'
                el.style.left = rect.left + 'px'
                el.style.bottom = 'auto'
                el.style.right = 'auto'
                el.style.transform = `translate(0px,0px)`
                onEnded()
            })
        }
    }


    useEffect(() => {
        if (!movable || !ref.current) return
        document.body.addEventListener('mouseup', deactive, { once: true })
        return () => document.body.removeEventListener('mouseup', deactive)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movable])

    useEffect(() => {
        if (!ref.current) return
        const el = ref.current
        el.addEventListener('mousedown', Trigger)
        document.body.addEventListener('mousemove', moving)

        return () => {
            el.removeEventListener('mousedown', Trigger)
            document.body.removeEventListener('mousemove', moving)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref])

    return { id: trigger_id, movable }

}

