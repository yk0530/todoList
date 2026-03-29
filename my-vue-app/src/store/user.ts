import { defineStore } from "pinia";
import { getUserInfo } from "@/api/user";

export const useUserStore = defineStore('user',{
    state: ()=>({
        userInfo: null as any,
    }),
    actions: {
        async fetchUserInfo(){
            const res = await getUserInfo();
            this.userInfo = res.data.username;
        }
    }
})