'use client';

interface CardProps {
  title: string;
  description: string;
}

function Cards({ title, description }: CardProps) {
  return (
    <section className="w-full max-w-sm bg-violet-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 mx-auto sm:mx-0">
      <div className="flex flex-col gap-2 font-mono">
        <h2 className="text-black text-xl font-semibold">{title}</h2>
        <p className="text-gray-700 font-sans text-sm">{description}</p>
      </div>
    </section>
  );
}

export default Cards;
