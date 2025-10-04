import Link from 'next/link';
import { projects } from '@/data';

export default function ProyectosPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-10">
        Galería de Proyectos
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/proyectos/${project.slug}`}>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold">{project.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
