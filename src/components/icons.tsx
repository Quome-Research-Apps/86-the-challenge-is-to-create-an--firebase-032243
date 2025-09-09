import { BrainCircuit } from 'lucide-react';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center gap-2 text-primary" {...props}>
      <BrainCircuit className="h-8 w-8" />
      <span className="text-2xl font-headline font-bold text-foreground">
        MetaLearn
      </span>
    </div>
  );
}
