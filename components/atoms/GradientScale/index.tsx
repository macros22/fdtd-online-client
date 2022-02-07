import React from 'react';

type GradientScaleProps = {
  width?: number;
  height?: number;
};

const defaultGradient: { [key: string]: string } = {
  0: 'blue',
  0.4: 'cyan',
  0.5: 'lime',
  0.6: 'yellow',
  1.0: 'red',
};

const GradientScale: React.FC<GradientScaleProps> = ({
  width = 400,
  height = 400,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const init = () => {
    if (canvasRef.current) {
      let canvas = canvasRef.current;

      canvas.width = width;
      canvas.height = height;

      let ctx: CanvasRenderingContext2D | null =
        canvas.getContext('2d') || null;

      // Создание линейного градиента
      // Точка начала линии градиента: x=20, y=0
      // Точка конца линии градиента: x=220, y=0
      if (ctx) {
        // let gradient = ctx.createLinearGradient(70, 0, 220, 0);
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);

        // Добавление трёх контрольных точек
        const grad = defaultGradient;
        for (let i in grad) {
          gradient.addColorStop(+i, grad[i]);
        }

        // Установка стиля заливки и отрисовка прямоугольника градиента
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <React.Fragment>
      <canvas ref={canvasRef} />
    </React.Fragment>
  );
};

export default GradientScale;
