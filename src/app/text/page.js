import {handleClick} from "../../../utils/utils";
import {LoaderComponent} from "@/components/layout/loader";

/**
 * Call endpoints
 * @return {Promise<any>}
 */
const callEndPoints = async () => {
    const call = await fetch('https://pokeapi.co/api/v2/pokemon/ditto', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const response = await call.json();
    console.log(response);
    return response;
}
export default async function TextPage() {
    const data = await callEndPoints();

    return (
        <>
            <main className={`container mx-auto text-center w-100 p-2`}>
                Page on working...
                {data && (data?.abilities.map((item, index) => {
                    return (
                        <div key={index}>
                            {item.ability.name}
                        </div>
                    )
                }))}
            </main>
        </>
    )
}