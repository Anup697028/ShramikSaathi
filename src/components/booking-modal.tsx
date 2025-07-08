"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import type { Worker } from '@/lib/types';
import { CheckCircle } from 'lucide-react';

export function BookingModal({ worker, children }: { worker: Worker, children: React.ReactNode }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleBooking = () => {
    if (!date) {
        toast({
            title: "Uh oh! Something went wrong.",
            description: "Please select a date for the booking.",
            variant: "destructive",
        });
        return;
    }

    setIsOpen(false);

    toast({
        title: "Booking Confirmed!",
        description: `You have successfully booked ${worker.name} for ${date.toLocaleDateString()}.`,
        action: <div className="p-1"><CheckCircle className="text-green-500 h-6 w-6" /></div>,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-body">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Book {worker.name}</DialogTitle>
          <DialogDescription>
            Select a date to schedule {worker.skill} services. Daily rate: ₹{worker.rate}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 flex justify-center">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1))}
            />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={handleBooking}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
