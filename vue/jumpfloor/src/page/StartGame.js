import {h,defineComponent} from '@vue/runtime-core';
import bgmImg from "../../assets/bgm.jpg";
import startBtn from "../../assets/startBtn.png";

export default defineComponent({
    setup(props,ctx){

        const handleClick=()=>{
            ctx.emit("changePage","GamePage")
        }
        return{
            handleClick
        }
    },
    
    render(ctx) {
        return h("Container",[
            h("Sprite",{texture:bgmImg}),
            h("Sprite",{
                texture:startBtn,
                x:250,
                y:650,
                interactive:true,
                onClick:ctx.handleClick
            }),
            h("Rect",{
                x:50,
                y:250,
                height:80,
                width:80
            }),
            h("Circle",{
                x:60,
                y:450,
                radius:40,
                color:"#ddd",
                height:180,
                width:180
            })

        ])
    }
})
