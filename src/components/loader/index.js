export const LoaderComponent = ({icon}) => {
    return (
        <div className={`grid grid-cols-1 w-100 text-center m-auto`}>
         <p className="text-[2rem] animate-spin">{icon}</p>
        </div>
    )
}