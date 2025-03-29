
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface OrderStatusCardProps {
  title: string;
  count: number;
  total?: number;
  icon: ReactNode;
  className?: string;
}

const OrderStatusCard = ({ title, count, total = 0, icon, className }: OrderStatusCardProps) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  
  return (
    <Card className={`${className} hover:shadow-md transition-all`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between mb-2">
          <div className="text-2xl font-bold">{count}</div>
          {total > 0 && <div className="text-sm text-muted-foreground">of {total} orders</div>}
        </div>
        {total > 0 && (
          <>
            <Progress value={percentage} className="h-2" />
            <div className="text-xs text-muted-foreground mt-2 text-right">{percentage}%</div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderStatusCard;
