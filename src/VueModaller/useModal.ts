import type {  Component, Ref } from 'vue';
import { ref } from 'vue';
import { ModalConfig, modalSlot } from './types/global';
import { markRaw, toRaw } from 'vue';

export interface modalOptionsType extends ModalConfig {
    open: boolean,
    anim: boolean
}

export const modalOpen = ref(false)
// export const compRef = ref<Component[]>([])
export const compRef: Ref<Component[]> = ref<Component[]>([])
export const onClosedFunctions = ref<Function[]>([])
export const modalTitle = ref("")
export const modalOptions = ref<modalOptionsType[]>([])
export const modalProps = ref<
    {
        [key: string] : any
    }[]
>([])

export const modalSlots = ref<modalSlot[]>([])

export const useModal = (comp: Component, options?: {
    title?: string,
    config: ModalConfig,
    props?: {
        [key: string] : any
    },
    slots?: modalSlot
}) => {
    return new Promise((resolve) => {

    modalOpen.value = true 

    const rawComp = markRaw(toRaw(comp));
    if (compRef.value.length > 0) {
        compRef.value.push(rawComp)
    } else {
        compRef.value = [rawComp]
    }
    modalTitle.value = options?.title || ""
    const configToBeUsed = {
        width: options?.config.width || 450,
        background: options?.config.background || "white",
        padding: options?.config.padding || "20px",
        closeable: options?.config.closeable ?? true,
        blur: options?.config.blur ?? true,
        corner: options?.config.corner || "10px",
        type: options?.config.type || "modal",
        open: true,
        anim: true,
        title: options?.config.title || "",
        margin: options?.config.margin || 0,
        height: options?.config.height || 0,
        mobileType: options?.config.mobileType,
        draggableConfig: {
            shadow: options?.config.draggableConfig?.shadow || '0 -4px 12px rgba(0, 0, 0, 0.25)',
            initialPosition: options?.config.draggableConfig?.initialPosition || "half",
            hideHandle: options?.config.draggableConfig?.hideHandle || false,
            handle: {
                color: options?.config.draggableConfig?.handle?.color || "#ccc",
                height: options?.config.draggableConfig?.handle?.height || "5px",
                width: options?.config.draggableConfig?.handle?.width || "45px",
                radius: options?.config.draggableConfig?.handle?.radius || "4px",
                marginTop: options?.config.draggableConfig?.handle?.marginTop || "10px",
                marginBottom: options?.config.draggableConfig?.handle?.marginBottom || "10px",
                hoverColor: options?.config.draggableConfig?.handle?.hoverColor || "#999",
                activeColor: options?.config.draggableConfig?.handle?.activeColor || "#666"
            }
        }
    }
    console.log(configToBeUsed)
    modalOptions.value.push(configToBeUsed)
    modalProps.value.push({
        ...options?.props,
        onClose: (value: any) => {
            resolve(value);
            closeModal(
                value,
                 modalOptions.value.length - 1
            );
        }
    });
    
    // Handle slots
    modalSlots.value.push(options?.slots || {});
    
    if(options?.config.onClosed) {
        onClosedFunctions.value.push(options.config.onClosed)
    }else{
        onClosedFunctions.value.push(() => {})
    }
}
)
}
export const closeModal = (data: any, modalIndexNum: number) => {
    // set a delay for animation to work 
    // Only set animation to false for the specific modal being closed
    const {type, mobileType} = modalOptions.value[modalIndexNum];
    if (modalOptions.value[modalIndexNum]) {
        modalOptions.value[modalIndexNum].anim = false;
    }else{
                   modalOptions.value[modalOptions.value.length - 1].anim = false
    }
    
    setTimeout(() => {
        // Check if we're closing the last modal (top of stack)
        if (modalIndexNum === modalOptions.value.length - 1) {
            // Closing the topmost modal - normal behavior
            const lastModal = modalOptions.value[modalOptions.value.length - 1];
            if (!lastModal) {
                modalOptions.value = []
                compRef.value = []
                modalProps.value = []
                modalSlots.value = []
            } else {
                lastModal.open = false;
                compRef.value.pop()
                modalOptions.value.pop()
                modalProps.value.pop()
                modalSlots.value.pop()
            }
        } else {
            // Closing a modal that's not at the top - remove from specific index
            if (modalOptions.value[modalIndexNum]) {
                modalOptions.value[modalIndexNum].open = false;
                compRef.value.splice(modalIndexNum, 1);
                modalOptions.value.splice(modalIndexNum, 1);
                modalProps.value.splice(modalIndexNum, 1);
                modalSlots.value.splice(modalIndexNum, 1);
            }
        }
        
        try {
            if (onClosedFunctions.value[modalIndexNum] && typeof onClosedFunctions.value[modalIndexNum] === "function") {
                onClosedFunctions.value[modalIndexNum](data);
                onClosedFunctions.value.splice(modalIndexNum, 1);
            }
        } catch (e) {
            console.log(e);
            throw new Error("Error in your onClosed function");
        }
    }, type !== 'draggable' && (mobileType !== 'draggable') ? 500 : 0);
    return data;
};

export const closeAllModal = (data?: any) => {
    setTimeout(() => {
        modalOpen.value = false
        compRef.value = []
        modalTitle.value = ""
        modalOptions.value = []
        modalProps.value = []
        modalSlots.value = []
        return data
    }, 300)
}