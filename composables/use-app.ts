import type { KeyValue } from "~/types"

export const useApp = () => {
    const title = useState('app-title', ()=> 'Dashboard')

    // setting app
    const setting = useState<KeyValue>('app-setting', ()=> ({}))

    return {
        title,
        setting
    }
}