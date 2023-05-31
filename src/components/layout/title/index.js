import { usePathname, useRouter } from "next/navigation";

const listBackButtonView = ["/textResult"];
export const Title = ({ title, subTitle }) => {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <>
      <div className={`absolute ml-5 mt-5`}>
        {listBackButtonView.includes(pathName) && (
          <button
            onClick={router.back}
            className={`btn btn-circle tooltip`}
            data-tip={`Back to previous page`}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
        )}
      </div>
      <h1 className="text-[3rem] mb-1">
        {title}
        <span className="text-xs">{subTitle}</span>
      </h1>
    </>
  );
};
