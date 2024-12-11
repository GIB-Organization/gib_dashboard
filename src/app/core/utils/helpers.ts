export const helpers = {
    deleteItemInList(list:any[], index:number){
        const LIST = [...list];
        LIST.splice(index, 1);
        return LIST
    },
    numericEnumKeysArray(enumValue:any){
        const keys = Object.keys(enumValue)
        return keys.splice((keys.length/2), keys.length) as string[];
    },
    numericEnumValuesArray(enumValue:any){
        const keys = Object.keys(enumValue)
        return keys.splice(0, keys.length/2) as string[];
    },
}