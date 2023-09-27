
import { useState } from "react";

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

  function handleselection(friend){
  setselectedfriend((selectedfriend)=> selectedfriend && selectedfriend.id===friend.id ? null :friend);
  setshowfriend(false);

  }

  function handlesplit(value){
   console.log(value);

   setfriends((friends)=>friends.map((friend)=>(
    friend.id===selectedfriend.id ? {...friend,balance:friend.balance+value}:friend
   )))
   setselectedfriend(null);

  }


  return (
    <div className="app">
      <div className="sidebar">
        <Friendlists friends={friends} onselection={handleselection} selectedfriend={selectedfriend} />


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



     { selectedfriend &&  <FormSplit  selectedfriend={selectedfriend}  handlesplit={handlesplit} key={selectedfriend.id} />}
    </div>
  );
}

function Friendlists({ friends,onselection,selectedfriend }) {
  return (
    <div>
      <ul>
        {friends.map((items) => (
          <Friend items={items} key={items.id} onselection={onselection} selectedfriend={selectedfriend} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ items,onselection,selectedfriend }) {
  const isselected = selectedfriend && selectedfriend.id === items.id;


  return (
    <li className={isselected ? 'selected':''}>
      <img src={items.image} alt={items.name} />
      <h3>{items.name}</h3>
      {items.balance < 0 && (
        <p className="red">
          You Owe {items.name} {Math.abs(items.balance)}$
        </p>
      )}
      {items.balance > 0 && (
        <p className="green">
          {" "}
          {items.name} Owes you {Math.abs(items.balance)}$
        </p>
      )}
      {items.balance === 0 && <p>You and {items.name} are equal </p>}
      <Button onClick={()=> onselection(items)}>{isselected ? 'Close':"Open"}</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Formaddfriend({ onaddfriend, setshowfriend }) {
  const [name, setname] = useState("");
  const [image, setimage] = useState("https://i.pravatar.cc/48");

  function handlesubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    if (!name || !image) return;

    const newfriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id: crypto.randomUUID(),
    };
    console.log(newfriend);
    onaddfriend(newfriend);
    setname("");
    setimage("https://i.pravatar.cc/48");

    setshowfriend(false);
  }
  return (
    <form className="form-add-friend" onSubmit={handlesubmit}>
      <label id="problem">👫Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />

      <label>🌄 Img URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setimage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplit({selectedfriend,handlesplit}) {
  function handlesplitform(e){
  e.preventDefault();

  if(!bill || !paidbyuser) return;

  handlesplit(whoispaying==='user' ? paidbyfriend : -paidbyuser)


  }
  const[bill,setbill]=useState('');
  const[paidbyuser,setpaidbyuser]=useState('');
  const paidbyfriend = bill ? bill-paidbyuser : "";
  const[whoispaying,setwhoispaying]=useState('user');
  return (
    <form className="form-split-bill" onSubmit={handlesplitform}>
      <h2>Split a bill with {selectedfriend.name}</h2>
      <label >💰 Bill Value</label>
      <input type="text"  value={bill} onChange={(e)=>setbill(Number(e.target.value))}/>


      <label>🚶🏾‍♂️ Your expense</label>
      <input
  type="text"
  value={paidbyuser}
  onChange={(e) =>
    setpaidbyuser(
      Number(e.target.value) > bill ? paidbyuser : Number(e.target.value)
    )
  }
/>



      <label>👫 {selectedfriend.name} expense</label>
      <input type="text" disabled  value={paidbyfriend} />

      <label >🤑 Who is paying the bill ?</label>
      <select value={whoispaying} onChange={(e)=>setwhoispaying(e.target.value)}>
        <option>You</option>
        <option>{selectedfriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
