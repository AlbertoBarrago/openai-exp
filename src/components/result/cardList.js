import Image from "next/image";

export const CardList = ({data}) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            {data.map((item) => {
                return (
                    <div key={item.id} className="card w-auto bg-neutral shadow-xl">
                        <figure>
                            <Image
                                key={item.id}
                                alt={'openai-card'}
                                width={350}
                                height={350}
                                src={item.image}/>
                        </figure>
                        <div className="card-body text-center m-auto">
                            <h2 className="card-title">{capitalizeFirstLetter(item.type)}</h2>
                            <p>{item.title ? item.title : "no desc"}</p>
                            {/*<div className="card-actions m-auto">*/}
                            {/*    <button className="btn btn-primary">Zoom</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                )
            })}
        </>
    )
}