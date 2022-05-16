import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObj}) => {

    const [nweet, setNweet] = useState();
    const [attachment, setAttachment] = useState("");
    
    const onChange = (event) => {
        const {target:{value}} = event; 
        setNweet(value);
    }

    // return Promise, so set Async & Await
    const onSubmit = async (event) => { 
        event.preventDefault();
        if (nweet === "") {
            return;
        }
        let attachmentURL = "";
        if(attachment !== "") {
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`); // 1. 파일에 대한 reference 갖기
            const response = await uploadString(fileRef, attachment, "data_url"); // 2. 해당 ref로 bucket에 저장하기
            
            // [return] promise | promise : 기다려달라, await: 기다리겠다 -> 값을 받을 때까지 기다림 
            // https://firebase.google.com/docs/reference/js/storage#getdownloadurl
            attachmentURL = await getDownloadURL(response.ref); // 3. 해당 ref의 URL 받기 (collection에 주소 저장) 
        }
        const nweetObj = {
            text:nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentURL,
        }
        await dbService.collection("nweets").add(nweetObj); // 4. collection에 저장.
        setNweet("");
        setAttachment("");
    }
    
    const onFileChange = (event) => {
        const {
          target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
          const {
            currentTarget: { result },
          } = finishedEvent;
          setAttachment(result);
        };
        reader.readAsDataURL(theFile);
      };

    const onClearAttachment = () => setAttachment("");

    return (
        <form onSubmit={onSubmit} className="factoryForm"> 
            <span style={{ color:"white", fontSize: 20, paddingBottom:10}}>{"안녕하세요?"}</span>
            <span style={{ color:"white", fontSize: 20, paddingBottom:10}}>{"방문 이력을 남겨주세요! 😍"}</span>
            <span style={{ color:"white", fontSize: 18, paddingBottom:10}}>{"모든 내용은 익명으로 전달됩니다"}</span>
            <span style={{ color:"darkgray", fontSize: 11, paddingBottom:5}}>*부적절한 내용은 관리자에 의해 삭제 조치될 수 있습니다. </span>
            <span style={{ color:"darkgray", fontSize: 11, paddingBottom:20}}>*배다롱이 제작에 참여한 HeyNana 어플도 많이 이용 부탁드려요! </span>
            <div className="factoryInput__container">
                <input
                className="factoryInput__input"
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="문구 입력..."
                maxLength={120}
                style={{"textAlign":"center"}}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
           
            <label htmlFor="attach-file" className="factoryInput__label">        
            <span>사진 업로드</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
            id="attach-file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{
            opacity: 0,
            }}
            />
            {attachment &&  (
            <div className="factoryForm__attachment">
            <img
            alt="attachment"
            src={attachment}
            style={{
            backgroundImage: attachment,
            }}
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
                <span>Remove</span>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            </div>
            )}
        </form>
    )
}

export default NweetFactory;