import Image from "next/image";
import Zoom from "react-medium-image-zoom";

export const CardList = ({ data }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      {data.map((item) => {
        return (
          <div key={item.id} className="card bg-neutral shadow-xl">
            <figure>
              <Zoom>
                <Image
                  key={item.id}
                  alt={"openai-card"}
                  width={450}
                  height={450}
                  priority={true}
                  src={item.image}
                />
              </Zoom>
            </figure>
            <div className="card-body text-center m-auto">
              <h2 className={`text-xl text-secondary`}>
                {capitalizeFirstLetter(item.type)}
              </h2>
              <small>{item.creationDate}</small>
              <p className={`h-12 overflow-auto`}>
                {item.title ? capitalizeFirstLetter(item.title) : "no desc"}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
