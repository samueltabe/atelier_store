export function Newsletter() {
  return (
    <section className="section-edit bg-ink text-paper">
      <div className="container-edit flex flex-col items-center text-center">
        <p className="label-luxe text-paper/70">Stay Informed</p>
        <h2 className="mt-4 max-w-md text-h2">
          Sign up for early access to new arrivals
        </h2>
        <form className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="Email address"
            className="label-luxe w-full border border-paper/30 bg-transparent px-5 py-3.5 text-paper placeholder:text-paper/50 focus:border-paper focus:outline-none"
          />
          <button
            type="submit"
            className="btn border border-paper bg-paper text-ink hover:bg-transparent hover:text-paper"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
