import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => { 
        // DB 실시간 감지 -> onSnapShot
        dbService.collection("nweets").onSnapshot((snapshop)=> {
            const nweetArray = snapshop.docs.map((doc) => ({
                id:doc.id, 
                ...doc.data()
            }))
            
        const sortedArray = nweetArray.sort((first, second) =>  second.createdAt - first.createdAt  )  
        setNweets(sortedArray)
        })
    }, []);


    return (
        <div className="container">
            <NweetFactory userObj={userObj}></NweetFactory>
            <div style={{ marginTop: 30 }}>
                {nweets.map(nweet =>
                    <Nweet 
                    key={nweet.id} 
                    nweetObj={nweet}
                    isOwner={nweet.creatorId === userObj.uid} 
                    />
                )}
            </div>
        </div>
    )
};
export default Home;