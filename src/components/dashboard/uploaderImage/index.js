import Image from "next/image";

export const UploaderImage = ({imageEdited, setImageEdited, setValue, isLoading}) => {
        return (
            <>
                <div className="w-100 m-auto text-center mt-5">
                    {imageEdited !== '' && (
                        <Image className="shadow border-2 border-accent-focus mx-auto"
                               src={imageEdited}
                               loader={isLoading}
                               width={300}
                               height={300} alt="AI"/>)}
                    <div className={`grid grid-cols-1`}></div>
                    <div>
                        <button className="mt-3 mb-5 m-auto btn btn-wide"
                                onClick={() => {
                                    setImageEdited('')
                                    setValue('createDescription', '')
                                }
                                }>
                            Delete image
                        </button>
                    </div>
                </div>
            </>
        )
}