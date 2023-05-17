export const Title = ({title, subTitle}) => {
    return (
        <>
            <h1 className="text-[3rem] mb-5">{title}<span className="text-xs">{subTitle}</span></h1>
        </>
    )
}