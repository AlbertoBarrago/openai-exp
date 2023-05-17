export const Title = ({title, subTitle}) => {
    return (
        <>
            <h1 className="text-[3rem] mb-10">{title}<span className="text-xs">{subTitle}</span></h1>
        </>
    )
}