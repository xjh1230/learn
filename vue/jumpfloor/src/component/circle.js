import { ref, computed, defineComponent, h, watch } from "@vue/runtime-core";

export default defineComponent({
    props: ["x", "y", "radius", "color", "linewidth", "key"],
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
            radius: props.radius,
            color: props.color,
            linewidth: props.linewidth
        };
    },
    render(ctx) {
        return h("Circle", {
            x: ctx.x,
            y: ctx.y,
            circlestyle: {
                linewidth: ctx.linewidth, //线条宽度
                color: ctx.color, //颜色
                alpha: 1,
                radius: ctx.radius, //半径
            },
        });
    }
})