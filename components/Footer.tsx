export function Footer() {
  return (
    <footer className="mx-auto w-[min(1120px,94%)] border-t border-black/10 py-8 text-sm text-neutral-600 dark:border-white/10 dark:text-neutral-300">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <p>NavUI - Open-source navigation component library.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Varun2024/navui.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://github.com/Varun2024/navui.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white"
          >
            Contribute
          </a>
          <a
            href="https://twitter.com/TheV_Stack"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
