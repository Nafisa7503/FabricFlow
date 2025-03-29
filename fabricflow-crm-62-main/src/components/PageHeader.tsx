
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: ReactNode;
}

const PageHeader = ({ 
  title, 
  description, 
  actionLabel, 
  onAction, 
  actionIcon 
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-tailoring-950">{title}</h1>
        <p className="text-tailoring-600 mt-1">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button 
          className="flex items-center gap-2"
          onClick={onAction}
        >
          {actionIcon}
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
