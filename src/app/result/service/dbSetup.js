import connectToDatabase from "../../../../mongo.conf";
import clientPromise from "../../../../mongo.conf";

const handleTimeStamp = (timestamp) => {
    const t = timestamp.getHighBits();
    const i = timestamp.getLowBits();
    const date = new Date(0)
    date.setUTCSeconds(t);
    return date.toLocaleDateString("it-IT",{year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
}

async function fetchCollectionData({dbname, collectionName}) {
    const client = await clientPromise;
    const collection = client.db(dbname).collection(collectionName);

    const data = await collection.find().toArray()

    //prepare data for
    if(collectionName === 'images') {
        //order by alphabet
        data.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            return 1;
        })
        //prepare data for table
        let responseImageList = [];
        // Remove ID field from every document
        data.forEach((item) => {
            delete item._id;
            delete item.userId;
            item.creationDate = handleTimeStamp(item.creationDate);
            responseImageList.push({
                type: item.type,
                title: item.title,
                creationDate: item.creationDate,
                image: item.urlImage,
            });

        })

        console.log(data);
        // Return the data or use it in your Next.js component
        return responseImageList;
    }

    // Return the data or use it in your Next.js component
    return data;
}

export default fetchCollectionData;