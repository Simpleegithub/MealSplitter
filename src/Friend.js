import { Button } from "./Button";

export function Friend({ items, onselection, selectedfriend }) {
  const isselected = selectedfriend && selectedfriend.id === items.id;

  return (
    <li className={isselected ? "selected" : ""}>
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
      <Button onClick={() => onselection(items)}>
        {isselected ? "Close" : "Open"}
      </Button>
    </li>
  );
}
