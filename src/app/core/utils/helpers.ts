import { EActionQueryParamKey, EShowTableActions } from "../enums";

export const helpers = {
    deleteItemInList(list: any[], index: number) {
        const LIST = [...list];
        LIST.splice(index, 1);
        return LIST
    },
    numericEnumKeysArray(enumValue: any) {
        const keys = Object.keys(enumValue)
        return keys.splice((keys.length / 2), keys.length) as string[];
    },
    numericEnumValuesArray(enumValue: any) {
        const keys = Object.keys(enumValue)
        return keys.splice(0, keys.length / 2) as string[];
    },
    routeQueryParam(id: string, action: EShowTableActions) {
        return {
            [EActionQueryParamKey.mode]: action,
            [EActionQueryParamKey.id]: id,
        }
    },
    objToFormData(obj:any): any{
        const FORM_DATA = new FormData();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                FORM_DATA.append(key, obj[key]);
            }
        }
        return FORM_DATA
    },
    async convertImageToBase64(file:File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
}