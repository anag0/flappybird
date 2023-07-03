interface IObjectKeys {
    [key: string]: any;
}
interface LayerArgs extends IObjectKeys {
    ctx: CanvasRenderingContext2D|null;
    image: CanvasImageSource;
    x: number;
    y: number;
    sx: number;
    sy: number;
    width: number;
    height: number;
    scale: number;
    speed: number;
}

export class Layer {
    props: LayerArgs;

    constructor(args: LayerArgs) {
        this.props = {...args};
    }

    update( frameAdjustment: number ) {
        const props = this.props;

        props.x = props.x <= -(props.width * props.scale) ? 0 : props.x
        props.x -= props.speed * frameAdjustment;
    }

    draw() {
        const props = this.props;

        props.ctx?.drawImage(
            props.image,
            props.sx,
            props.sy,
            props.width,
            props.height,
            props.x,
            props.y,
            props.width * props.scale,
            props.height * props.scale,
        );
        props.ctx?.drawImage(
            props.image,
            props.sx,
            props.sy,
            props.width,
            props.height,
            props.x + (props.width * props.scale) - 1,
            props.y,
            props.width * props.scale,
            props.height * props.scale,
        );
    }
}