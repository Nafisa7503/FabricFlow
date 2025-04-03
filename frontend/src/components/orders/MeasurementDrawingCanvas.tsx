
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Eraser, Download } from 'lucide-react';

interface MeasurementDrawingCanvasProps {
  onDrawingUpdate: (dataUrl: string) => void;
  initialImage?: string;
}

const MeasurementDrawingCanvas = ({ onDrawingUpdate, initialImage }: MeasurementDrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setContext(ctx);
    
    // Set canvas drawing style
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // Load initial image if provided
    if (initialImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = initialImage;
    }
  }, [initialImage]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    setIsDrawing(true);
    
    // Get position for mouse or touch event
    const position = getEventPosition(e);
    context.beginPath();
    context.moveTo(position.x, position.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    // Prevent scrolling on touch devices
    e.preventDefault();
    
    // Get position for mouse or touch event
    const position = getEventPosition(e);
    context.lineTo(position.x, position.y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing || !context) return;
    
    setIsDrawing(false);
    context.closePath();
    
    // Save drawing data
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      onDrawingUpdate(dataUrl);
    }
  };

  const getEventPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      // Touch event
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    onDrawingUpdate('');
  };

  const downloadDrawing = () => {
    if (!canvasRef.current) return;
    
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'measurement-drawing.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden">
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          className="bg-white touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={clearCanvas}
        >
          <Eraser className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={downloadDrawing}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default MeasurementDrawingCanvas;
