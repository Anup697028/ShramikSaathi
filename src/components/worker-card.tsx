import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Wrench, Zap, Hammer, PaintRoller, Construction, HardHat } from 'lucide-react';
import type { Worker, WorkerSkill } from '@/lib/types';
import { BookingModal } from './booking-modal';
import { cn } from '@/lib/utils';

const skillIconMap: Record<WorkerSkill, React.ElementType> = {
  Plumber: Wrench,
  Electrician: Zap,
  Carpenter: Hammer,
  Painter: PaintRoller,
  Mason: Construction,
  'General Labor': HardHat,
};

export function WorkerCard({ worker }: { worker: Worker }) {
  const Icon = skillIconMap[worker.skill];

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 bg-card">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          <Image
            src={worker.avatar}
            alt={worker.name}
            fill
            className="object-cover"
            data-ai-hint={`${worker.skill} portrait`}
          />
        </div>
        <div className="p-4 pb-0">
          <CardTitle className="font-headline text-2xl">{worker.name}</CardTitle>
           <Badge variant="secondary" className="mt-2 inline-flex items-center gap-1.5 font-medium">
            <Icon className="h-3.5 w-3.5" />
            {worker.skill}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardDescription className="text-base font-body">{worker.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className='flex flex-col'>
          <p className="text-xl font-headline text-foreground">
            ₹{worker.rate}<span className="text-sm font-body text-muted-foreground">/day</span>
          </p>
          <div className="flex items-center gap-1 text-sm text-amber-500 mt-1">
             <Star className="w-4 h-4 fill-current" />
             <span className="font-bold">{worker.rating.toFixed(1)}</span>
             <span className="text-muted-foreground text-xs">({worker.jobsCompleted} jobs)</span>
          </div>
        </div>
        <BookingModal worker={worker}>
          <Button>Book Now</Button>
        </BookingModal>
      </CardFooter>
    </Card>
  );
}
