import { ref, computed, defineComponent, h, watch } from "@vue/runtime-core";

export default defineComponent({
    props: ["x", "y", "color", "width", "height"],
    setup(props) {
        const x = ref(props.x);
        const y = ref(props.y);

        watch(props, (newProps) => {
            x.value = newProps.x;
            y.value = newProps.y;
        });
        return {
            x,
            y,
            width: props.width,
            height: props.height,
            color: props.color
        };
    },
    render(ctx) {
        return h("Rect", {
            x: ctx.x,
            y: ctx.y,
            height: ctx.height,
            width: ctx.width,
            rectstyle: {
                color: ctx.color, //颜色
                alpha: 1,
            }
        });
    }
})