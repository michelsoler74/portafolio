import { projects } from '@/data';

export default function ProyectoDetallePage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Proyecto no encontrado
        </h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        {project.name}
      </h1>
    </main>
  );
}
