import React from 'react';
import { defaultGradient as dGradient } from 'utils/default-gradient';
import { ColorBarProps } from './ColorBar.props';

const defaultGradient: { [key: string]: string } = dGradient || {
  0: 'blue',
  0.4: 'cyan',
  0.5: 'lime',
  0.6: 'yellow',
  1.0: 'red',
};

const ColorBar: React.FC<ColorBarProps> = ({
  gradientWidth,
  gradientHeight,
  maxVal = 0.4,
  minVal = -0.4,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const init = () => {
    if (canvasRef.current) {
      let canvas = canvasRef.current;
      

      const numberSpaceWidth = gradientWidth * 4.2;
      const width = gradientWidth + numberSpaceWidth;
      const height = gradientHeight;

      const scaleCoeff = (maxVal - minVal) / gradientHeight;

      canvas.width = width;
      canvas.height = height;

      let ctx: CanvasRenderingContext2D | null =
        canvas.getContext('2d') || null;

      // Создание линейного градиента
      // Точка начала линии градиента: x=20, y=0
      // Точка конца линии градиента: x=220, y=0
      if (ctx) {
        // let gradient = ctx.createLinearGradient(70, 0, 220, 0);
        let gradient = ctx.createLinearGradient(0, 0, 0, height);

        // Добавление трёх контрольных точек
        const grad = defaultGradient;
        for (let i in grad) {
          gradient.addColorStop(+i, grad[i]);
        }

        // Установка стиля заливки и отрисовка прямоугольника градиента
        ctx.fillStyle = gradient;
        ctx.fillRect(numberSpaceWidth, 0, gradientWidth, gradientHeight);

        // Draw Oy tick marks numbers.
        const INTERVAL_Y = height / 20;
        ctx.textAlign = 'right';
        ctx.font = '12pt Roboto bold';
        ctx.fillStyle = '#4a4a4a';
        // ctx.textBaseline = 'middle';
        const tY = (y: number) => height - y;
        for (let y = 0; y <= height; y += INTERVAL_Y) {
          const label = (y * scaleCoeff + minVal).toFixed(2) + '';
          ctx.save();
          ctx.translate(width*0.65, tY(y));
          ctx.fillText(label, 0, 0);
          ctx.restore();
        }
      }
    }
  };

  React.useEffect(() => {
    init();
  }, [gradientWidth, gradientHeight]);

  return (
    <React.Fragment>
      <canvas ref={canvasRef} />
    </React.Fragment>
  );
};

export default ColorBar;
