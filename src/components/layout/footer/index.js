"use client";
import { ScrollToTop } from "@/components/commons/scrollToTop";

export const Footer = () => {
  return (
    <>
      {
        <footer className="sticky top-[100vh]">
          <ScrollToTop />
          <div className="text-center m-auto w-52 pb-5">
            <p className="text-[0.8rem]">
              <a href="https://albz.dev">
                🥷 albz | {new Date().getFullYear()}
              </a>
              {" ~ "}
              <a
                target={"_blank"}
                href="https://www.paypal.com/donate/?hosted_button_id=G8VY4KPVXMMHG"
              >
                <i>Offer me a 🍺</i>
              </a>{" "}
            </p>
          </div>
        </footer>
      }
    </>
  );
};
