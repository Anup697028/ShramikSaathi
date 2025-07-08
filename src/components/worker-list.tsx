'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { WorkerCard } from '@/components/worker-card';
import type { Worker } from '@/lib/types';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WorkerList({ workers }: { workers: Worker[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return workers;
    return workers.filter(worker =>
      worker.name.toLowerCase().includes(query) ||
      worker.skill.toLowerCase().includes(query)
    );
  }, [workers, searchQuery]);

  return (
    <div>
      <div className="relative mb-8 max-w-lg mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by skill or name (e.g., Plumber, Ramesh)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 w-full text-base py-6 rounded-full shadow-inner bg-background/70 focus:bg-background"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker, i) => (
              <motion.div
                key={worker.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <WorkerCard worker={worker} />
              </motion.div>
            ))
          ) : (
             <div className="text-center py-16 col-span-full">
                <h2 className="text-2xl font-headline">No Workers Found</h2>
                <p className="text-muted-foreground mt-2">Try adjusting your search.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
