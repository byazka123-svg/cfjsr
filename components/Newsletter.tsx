
import React from 'react';

export const Newsletter: React.FC = () => {
  return (
    <section className="my-24 bg-[#F5F4F0] rounded-[3rem] p-16 text-center">
      <h2 className="text-4xl font-extrabold text-stone-900 mb-4">
        Bergabung dengan Komunitas <br /> Sehat Cafe JSR
      </h2>
      <p className="text-stone-500 max-w-xl mx-auto mb-10 font-medium">
        Dapatkan tips kesehatan harian dan penawaran eksklusif langsung di email Anda.
      </p>
      
      <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="email" 
          placeholder="Alamat email Anda" 
          className="flex-1 bg-stone-200/50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-forest outline-none font-medium"
        />
        <button className="bg-stone-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/20">
          Daftar
        </button>
      </form>
    </section>
  );
};
