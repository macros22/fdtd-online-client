import { useCanvas } from "components/plot-line/useCanvas";
import { ICanvasProps } from "./Canvas.props";

export const Canvas = ({ draw, width, height, ...props }: ICanvasProps): JSX.Element => {
    const canvasRef = useCanvas(draw, width, height);

    return (
        <canvas ref={canvasRef} {...props} />
    );
};