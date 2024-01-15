import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onChildAdded, onValue, push, ref, set } from "firebase/database";

function ChatBox() {
  const inputValue = useRef(null);
  const [userProfileImage, setuserProfileImage] = useState();
  const [userDetails, setuserDetails] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await new Promise((resolve) => {
          onAuthStateChanged(auth, resolve);
        });

        if (user) {
          setuserProfileImage(user.photoURL);
          setuserDetails(user);

          const dataRef = ref(db, `messages/${user.uid}`);

          // Use onValue for initial data fetching
          onValue(dataRef, (snapshot) => {
            const initialData = [];
            snapshot.forEach((childSnapshot) => {
              initialData.push(childSnapshot.val());
            });

            setData(initialData);
            setLoading(false);
          });

          // Use onChildAdded for real-time updates
          const unsubscribe = onChildAdded(dataRef, (snapshot) => {
            const newData = snapshot.val();

            // Check if the message already exists in the data array
            const messageExists = data.some(
              (obj) => obj.message === newData.message
            );

            if (!messageExists) {
              setData((prevData) => [...prevData, newData]);
            }
          });

          return () => {
            unsubscribe();
          };
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once during component mount

  function handleSend() {
    let message = inputValue.current;
    console.log(message.value);

    const dbRef = ref(db, "chats/");
    const uniquedbRef = push(dbRef);
    const uniqueKey = uniquedbRef.key;

    set(ref(db, `messages/${userDetails.uid}/${uniqueKey}`), {
      profile: userDetails.photoURL,
      message: message.value,
    });
    message.value = "";
  }

  return (
    <div className="w-full h-screen bg-zinc-700 flex items-center justify-center fixed">
      <div className="max-w-lg mx-auto p-4">
        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[40rem] max-h-[50rem] w-[30rem] relative">
          {/* Chat Header */}
          <div className="flex items-center mb-4">
            <div className="ml-3">
              <p className="text-xl font-medium mb-5">
                {userDetails ? userDetails.displayName : "Loading"}
              </p>
            </div>
          </div>
          {/* Chat Messages */}
          <div className="space-y-4">
            {/* Received Message */}
            <div className="flex items-center">
              <div className="ml-3 bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-800">
                  Hello! How can I help you today?
                </p>
              </div>
            </div>
            {/* Sent Message */}
            {loading ? (
              <p className="text-right">Loading</p>
            ) : (
              data.map((obj, index) => (
                <div key={index} className="flex items-end justify-end">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <p className="text-sm text-white">{obj.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Chat Input */}
          <div className="mt-4 flex items-center p-5 absolute w-full bottom-0 left-0">
            <input
              ref={inputValue}
              type="text"
              placeholder="Type your message..."
              className="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
