'use client';

export default function Error({ error, reset }) {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <p className="mt-2 text-red-500">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
