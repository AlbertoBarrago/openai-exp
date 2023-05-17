import Image from "next/image";

export const UploaderImageComponent = ({imageEdited, setImageEdited}) => {
        return (
            <>
                <div className="w-100 m-auto text-center">
                    {imageEdited !== '' && (
                        <Image className="shadow border-2 border-accent-focus"
                               src={imageEdited}
                               width={300}
                               height={300} alt="AI"/>)}
                    <button className="mt-3 m-auto btn btn-wide"
                            onClick={() => setImageEdited('')}>
                            Delete image
                    </button>
                </div>
            </>
        )
}