import { entries } from "./ordersinfo";

const entriesFactory = entries => {
  const addEntry = entry => {
    const display = document.getElementById("main-section");
    const t = document.getElementById("order-block-temp");
    const clone = document.importNode(t.content, true);
    clone.querySelector(".mb-container").classList.add(entry.blocktype);
    const header = clone.querySelector(".paragraph-header");
    header.innerHTML = entry.header;
    const description = clone.querySelector(".description p");
    description.innerHTML = entry.description;
    const image = clone.querySelector(".figure img");
    image.setAttribute("src", entry.image);
    //const caption = clone.querySelector(".figure small");
    const anchor = clone.querySelector(".figure a");
    anchor.setAttribute("href", entry.image);
    anchor.innerHTML = entry.caption;
    display.appendChild(clone);
  };

  const addEntries = () => {
    for (let i = 0; i < entries.length; i++) {
      addEntry(entries[i]);
    }
  };
  return { addEntries };
};
const doAll = entriesFactory(entries);
doAll.addEntries();
