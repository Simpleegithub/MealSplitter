import { useState } from "react";
import { Button } from "./Button";

export function FormSplit({ selectedfriend, handlesplit }) {
  function handlesplitform(e) {
    e.preventDefault();

    if (!bill || !paidbyuser) return;

    handlesplit(whoispaying === "user" ? paidbyfriend : -paidbyuser);
  }
  const [bill, setbill] = useState("");
  const [paidbyuser, setpaidbyuser] = useState("");
  const paidbyfriend = bill ? bill - paidbyuser : "";
  const [whoispaying, setwhoispaying] = useState("user");
  return (
    <form className="form-split-bill" onSubmit={handlesplitform}>
      <h2>Split a bill with {selectedfriend.name}</h2>
      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setbill(Number(e.target.value))}
      />

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
      <input type="text" disabled value={paidbyfriend} />

      <label>🤑 Who is paying the bill ?</label>
      <select
        value={whoispaying}
        onChange={(e) => setwhoispaying(e.target.value)}
      >
        <option>You</option>
        <option>{selectedfriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
