import { useState } from "react";
import { Friendlists } from "./Friendlists";
import { Button } from "./Button";
import { Formaddfriend } from "./Formaddfriend";
import { FormSplit } from "./FormSplit";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setfriends] = useState(initialFriends);
  const [showfriend, setshowfriend] = useState(false);
  const [selectedfriend, setselectedfriend] = useState(null);

  function handleclick() {
    setshowfriend((showfriend) => !showfriend);
  }
  function handleaddfriend(friend) {
    setfriends((previous) => [...previous, friend]);
  }

  function handleselection(friend) {
    setselectedfriend((selectedfriend) =>
      selectedfriend && selectedfriend.id === friend.id ? null : friend
    );
    setshowfriend(false);
  }

  function handlesplit(value) {
    console.log(value);

    setfriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedfriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setselectedfriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friendlists
          friends={friends}
          onselection={handleselection}
          selectedfriend={selectedfriend}
        />

        {showfriend && (
          <Formaddfriend
            onaddfriend={handleaddfriend}
            setshowfriend={setshowfriend}
          />
        )}

        <Button onClick={handleclick}>
          {showfriend ? "Close Friend" : "Add Friend"}
        </Button>
      </div>

      {selectedfriend && (
        <FormSplit
          selectedfriend={selectedfriend}
          handlesplit={handlesplit}
          key={selectedfriend.id}
        />
      )}
    </div>
  );
}
