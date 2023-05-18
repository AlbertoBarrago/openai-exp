import Image from "next/image";
import {downloadImage} from "../../../../utils/utils";

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
                    <button className="mt-3 m-auto btn btn-wide"
                            onClick={() => {
                                setImageEdited('')
                                setValue('createDescription', '')
                                }
                            }>
                            Delete image
                    </button>
                    {/*<button className="mt-3 m-auto btn btn-wide"*/}
                    {/*        onClick={() => downloadImage(imageEdited, 'random-albz-ai.png')}>*/}
                    {/*    Download image*/}
                    {/*</button>*/}
                </div>
            </>
        )
}