export const helpers = {
    deleteItemInList(list:any[], index:number){
        const LIST = [...list];
        LIST.splice(index, 1);
        return LIST
    }
}