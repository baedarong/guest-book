import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc  } from "firebase/firestore";
import React, { useState } from "react";
import { deleteObject, ref } from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) => { 
    const [editing, setEditing] = useState(false); // True And False
    const [newNweet, setNewNweet] = useState(nweetObj.text); // Update Text of Edit Input 

    // DELETE 
    const onDeleteClick = async() => {
        const deleteClicked = window.confirm("진짜 삭제하시게요? 😱");
        if(deleteClicked) {
            await deleteDoc(doc(dbService, "nweets", nweetObj.id));
            await deleteObject(ref(storageService, nweetObj.attachmentURL));
        }
    }
 
    // UPDATE
    const toggleEditing = () => {
        setEditing((prev) => !prev);
    }

    const onChange = (event) => {
        const {target:{value}} = event;
        setNewNweet(value);
    }

    const onUpdateClick = async(event) => {
        event.preventDefault();
        toggleEditing();

        const nweetRef = doc(dbService, "nweets", nweetObj.id);
        await updateDoc(nweetRef, {
            text: newNweet,
            createdAt: Date.now()
        });
    }

    return (
        <div className="nweet">
            { editing ? 
            <form className="container nweetEdit" onSubmit={onUpdateClick}>
                <input 
                className="formInput"
                type="text"
                placeholder="문구 수정하기"
                value={newNweet} 
                required 
                autoFocus
                onChange={onChange}
                style={{"textAlign":"center"}}>
                </input>
                <input className="formBtn" type="submit" value="수정하기"></input> 
                <span onClick={toggleEditing} className="formBtn cancelBtn">
                    취소하기
                </span>
            </form>
            : <h4 key={nweetObj.id}> {nweetObj.text} </h4>  
            }
            {nweetObj.attachmentURL && <img src={nweetObj.attachmentURL} alt="attachmentURL"/> }
            {isOwner && 
            <div className="nweet__actions">
               <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
            }
        </div>
    )
}

export default Nweet; 