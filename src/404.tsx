import { Link } from "react-router";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center h-screen mt-14">
      <h1>404</h1>
      <p className="mb-8">Page Not Found</p>
      <img src="/404.jpg" alt="404 - Page not found" />
      <Link to="/" className="text-blue inline-block underline hover:text-gold mt-8">
        ← Go back to Home
      </Link>
    </div>
  );
}

export { PageNotFound };