import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { useEffect } from "react";
const NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <section className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-5xl font-semibold text-amber-400">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to={"/"}>
            <Button type="button" className="bg-amber-400 hover:scale-[1.1]">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
