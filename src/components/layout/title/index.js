import {usePathname, useRouter} from "next/navigation";

const listBackButtonView = ['/result'];
export const Title = ({title, subTitle}) => {
    const pathName = usePathname();
    const router = useRouter();
    return (
        <>
            <div className={`absolute mt-5`}>
                {listBackButtonView.includes(pathName) && (
                    <button onClick={router.back} className={`btn btn-circle tooltip`} data-tip="Back To Lab"><i className="bi bi-arrow-left"></i></button>
                )}
            </div>
            <h1 className="text-[3rem] mb-1">{title}<span className="text-xs">{subTitle}</span></h1>
        </>
    )
}