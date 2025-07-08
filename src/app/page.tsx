import { Header } from '@/components/header';
import { WorkerList } from '@/components/worker-list';
import { workers } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8 md:py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-headline text-primary tracking-tight">Find Your Helping Hand</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Reliable daily wage workers at your fingertips. Browse, schedule, and book skilled labor for any task, big or small.
          </p>
        </section>
        <WorkerList workers={workers} />
      </main>
      <footer className="text-center py-6 border-t border-border/40 text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ShramikSaathi. All rights reserved.</p>
      </footer>
    </div>
  );
}
