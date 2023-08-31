import { useEffect, useState } from "react";

export default function DropDown({ list, selected = [] }) {
  const [items, setItems] = useState(
    list.filter((el) => !selected.includes(el))
  );

  const [autoIndex, setAutoIndex] = useState(0);
  const [showItems, setShowItems] = useState(
    items.map((item, index) => {
      return { item, index };
    })
  );
  const [selectedItems, setSelectedItems] = useState(selected);
  const [state, setState] = useState("");
  const [word, setWord] = useState("");

  const addToList = (item, list, setList) => {
    const temp = [...list];
    temp.push(item);
    setList(temp);
  };

  const removeFromList = (index, list, setList) => {
    const temp = [...list];
    temp.splice(index, 1);
    setList(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showItems.length === 0) return;

    const { index } = showItems[autoIndex];
    removeFromList(index, items, setItems);
    addToList(items[index], selectedItems, setSelectedItems);
    setAutoIndex(0);
    setState("");
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();

    if (word.split(" ").length > 1) return alert("Please enter a word!");

    if (word === "") return;
    console.log(items.concat(selectedItems));
    if (items.concat(selectedItems).find((el) => el === word))
      return alert(`${word} is already in your dictionary!`);
    addToList(word, items, setItems);
    setWord("");
  };

  const handleKeyDown = (e) => {
    const len = showItems.length;
    if (e.code === "ArrowUp") {
      setAutoIndex((autoIndex - 1 + len) % len);
    }
    if (e.code === "ArrowDown") {
      setAutoIndex((autoIndex + 1) % len);
    }
    if (e.code === "Backspace" && state === "") {
      const n = selectedItems.length;
      if (n > 0) {
        removeFromList(n - 1, selectedItems, setSelectedItems);
        addToList(selectedItems[n - 1], items, setItems);
      }
    }
  };

  useEffect(() => {
    const prefixMatch = (item) => {
      for (let i = 0; i < state.length; i++) {
        if (item[i] !== state[i]) return 0;
      }
      return 1;
    };

    setShowItems(
      items
        .sort()
        .map((item, index) => {
          return { item, index };
        })
        .filter(({ item }) => prefixMatch(item))
    );
  }, [state, items]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit1}>
        <input
          className="add-word"
          type="text"
          value={word}
          placeholder="Add a word"
          onChange={(e) => setWord(e.target.value)}
        />
      </form>
      <div className="search">
        <div className="selected-items">
          {selectedItems.map((item, index) => (
            <div key={index} className="selected-item">
              <div
                className="content"
                onClick={() => {
                  removeFromList(index, selectedItems, setSelectedItems);
                  addToList(selectedItems[index], items, setItems);
                }}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="search-input"
            type="text"
            value={state}
            placeholder="Search"
            onKeyDown={handleKeyDown}
            onChange={(e) => setState(e.target.value)}
          />
        </form>
      </div>
      <div className="drop-items">
        {showItems.length ? (
          showItems.map((element, ind) => {
            const { index, item } = element;
            return (
              <div
                className={`item ${ind === autoIndex && "to-be-selected"}`}
                key={index}
                onMouseEnter={() => setAutoIndex(ind)}
                onMouseOut={() => setAutoIndex(0)}
                onClick={() => {
                  removeFromList(index, items, setItems);
                  addToList(items[index], selectedItems, setSelectedItems);
                }}
              >
                {item}
              </div>
            );
          })
        ) : (
          <div className="item">No matching word</div>
        )}
      </div>
    </div>
  );
}
