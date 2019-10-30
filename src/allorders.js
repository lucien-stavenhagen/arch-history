import { entries } from "./allordersinfo";

const entriesFactory = entries => {
  const addPreface = preface => {
    document.getElementById("preface").innerHTML = preface;
  };
  const addWelcome = welcome => {
    const display = document.getElementById("welcome");
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }
    const t = document.getElementById("order-headers-temp");
    const clone = document.importNode(t.content, true);
    const drop = clone.getElementById("dropcap");
    drop.innerHTML = welcome.trim()[0];
    const par = clone.querySelector("p");
    par.appendChild(document.createTextNode(welcome.trim().slice(1)));
    display.appendChild(clone);
  };
  const addEntry = entry => {
    const display = document.getElementById("main-section");
    const t = document.getElementById("order-block-temp");
    const clone = document.importNode(t.content, true);
    clone.querySelector(".mb-container").classList.add(entry.blocktype);
    const header = clone.querySelector(".paragraph-header");
    header.innerHTML = entry.header;
    const description = clone.querySelector(".description p");
    description.innerHTML = entry.description;
    if (entry.images.length >= 1) {
      let anchor = clone.querySelector(".figure a");
      anchor.setAttribute("href", entry.images[0].image);
      let image = clone.querySelector(".figure img");
      image.setAttribute("src", entry.images[0].image);
      let caption = clone.querySelector(".figure small");
      caption.innerHTML = entry.images[0].caption;

      let figcontainer = clone.querySelector(".figure");
      for (let i = 1; i < entry.images.length; i++) {
        let newfig = figcontainer.querySelector("figure").cloneNode(true);
        anchor = newfig.querySelector("figure a");
        anchor.setAttribute("href", entry.images[i].image);
        image = newfig.querySelector("figure img");
        image.setAttribute("src", entry.images[i].image);
        caption = newfig.querySelector("figure small");
        caption.innerHTML = entry.images[i].caption;
        figcontainer.appendChild(newfig);
      }
    } else {
      let caption = clone.querySelector(".figure small");
      caption.innerHTML = "No images found for this entry.";
    }
    if (entry.switch) {
      clone.querySelector(".description").classList.add("right");
      clone.querySelector(".figure").classList.add("left");
    }
    display.appendChild(clone);
  };

  const addEntries = (entrylist, clear) => {
    if (clear) {
      const display = document.getElementById("main-section");
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
    }
    addPreface(entrylist.preface);
    addWelcome(entrylist.welcome);
    for (let i = 0; i < entrylist.elist.length; i++) {
      addEntry(entrylist.elist[i]);
    }
  };
  const addDoricEntries = () => {
    addEntries(entries.doric, true);
  };
  const addIonicEntries = () => {
    addEntries(entries.ionic, true);
  };
  const addCorinthianEntries = () => {
    addEntries(entries.corinthian, true);
  };
  return { addDoricEntries, addCorinthianEntries, addIonicEntries };
};
const doAll = entriesFactory(entries);
const doricButton = document.getElementById("doric-button");
doricButton.addEventListener("click", doAll.addDoricEntries);
const ionicButton = document.getElementById("ionic-button");
ionicButton.addEventListener("click", doAll.addIonicEntries);
const corinthianButton = document.getElementById("corinthian-button");
corinthianButton.addEventListener("click", doAll.addCorinthianEntries);

doAll.addDoricEntries();
//        doAll.addCorinthianEntries()
