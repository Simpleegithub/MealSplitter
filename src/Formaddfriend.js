import { useState } from "react";
import { Button } from "./Button";

export function Formaddfriend({ onaddfriend, setshowfriend }) {
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
