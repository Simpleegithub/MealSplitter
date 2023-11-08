import { Friend } from "./Friend";

export function Friendlists({ friends, onselection, selectedfriend }) {
  return (
    <div>
      <ul>
        {friends.map((items) => (
          <Friend
            items={items}
            key={items.id}
            onselection={onselection}
            selectedfriend={selectedfriend}
          />
        ))}
      </ul>
    </div>
  );
}
