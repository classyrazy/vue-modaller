import { Component } from "vue";

type modalType = "modal" | "panel" | "side" | "draggable";
export interface DraggableConfig {
        initialPosition?: "full" | "half",
        hideHandle?: boolean,
        shadow?: string,
        handle?: {
            color?: string,
            height?: string,
            width?: string,
            radius?: string | number,
            marginTop?: string | number,
            marginBottom?: string | number,
            hoverColor?: string,
            activeColor?: string
        }
    }
export interface ModalConfig {
    width?: number,
    background?: string,
    padding?: string,
    closeable?: boolean,
    blur?: boolean,
    corner?: string,
    type?: modalType,
    mobileType?:modalType, 
    title?: string,
    margin?: number,
    height?: number | string,
    onClosed?: Function,
    draggableConfig?: DraggableConfig
}
export interface modalSlot {
        [slotName: string]: {
            props: {
                [key: string] : any
            },
            component: Component
        }
}