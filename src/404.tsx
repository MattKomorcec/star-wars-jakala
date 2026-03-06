function PageNotFound() {
  return (
    <div className="flex flex-col items-center h-screen mt-14">
      <h1>404</h1>
      <p className="mb-8">Page Not Found</p>
      <img src="/404.jpg" alt="404 - Page not found" />
      <a href="/" className="text-blue inline-block underline hover:text-gold mt-8">
        ← Go back to Home
      </a>
    </div>
  );
}

export { PageNotFound };