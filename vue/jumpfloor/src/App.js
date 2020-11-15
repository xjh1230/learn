import {ref,computed,defineComponent,h} from "@vue/runtime-core";

import {getPage} from "./router/index"


export default defineComponent({
    setup(){
        const currentPageName = ref("StartPage");
        const currentPage=computed(()=>{
           return getPage(currentPageName.value)
        });
        return{
            currentPage,
            currentPageName
        }
    },
    render(ctx){
        return h("Container",[
            h(ctx.currentPage,{
                onChangePage(page){
                    ctx.currentPageName = page;
                }
            })
        ])
    }
})