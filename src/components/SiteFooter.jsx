import Logo from "./Logo";
export const SiteFooter = () => {
  return (
    <footer className="border-top py-4">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div className="d-flex flex-column flex-md-row align-items-center gap-2 px-3 px-md-0">
          <Logo />
          <p className="mb-0 text-center text-muted small text-md-start">
            Built by @ Easy Learning 2025
          </p>
        </div>
      </div>
    </footer>
  );
};
