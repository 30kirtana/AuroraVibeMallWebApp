import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { config } from "./FirebaseConfig.js";
const appSettings = {
  databaseURL:
    "https://auroravibemallfirebaseapp-default-rtdatabase.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(config);
const database = getDatabase(app);
const itemsINSZ = ref(database, "cartItemsInSZ");

let shops = [
  {
    sectionId: "DécorDen",
    shopid: "1",
    shopname: "DécorDen",
    decription:
      "Discover elegant and contemporary home decor pieces that transform your living space into a haven of style.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/DD1.jpg",
        itemname: "Flower Wall Hanging type 1",
        cost: "400 Rs",
      },
      {
        itemid: "2",
        imgPath: "./assets/DD2.jpg",
        itemname: "Dish Hanging type 1",
        cost: "500 Rs",
      },
      {
        itemid: "3",
        imgPath: "./assets/DD3.jpg",
        itemname: "Flower Wall Hanging type 2",
        cost: "600 Rs",
      },
    ],
  },
  {
    sectionId: "VogueVista",
    shopid: "2",
    shopname: "VogueVista",
    decription:
      "Redefine your wardrobe with trendsetting clothing that blends timeless design with modern flair.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/VV1.jpg",
        itemname: "Red Checked Shirt",
        cost: "200 Rs",
      },
      {
        itemid: "2",
        imgPath: "./assets/VV2.webp",
        itemname: "Blue Top",
        cost: "150 Rs",
      },
      {
        itemid: "3",
        imgPath: "./assets/VV3.webp",
        itemname: "Light Blue Jeans",
        cost: "300 Rs",
      },
    ],
  },
  {
    sectionId: "Glow&Gold",
    shopid: "3",
    shopname: "Glow & Gold",
    decription:
      "Indulge in luxury with radiant cosmetics and dazzling jewellery that add sparkle to every moment.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/GG1.webp",
        itemname: "Pendent Type 1",
        cost: "700 Rs",
      },
      {
        itemid: "2",
        imgPath: "./assets/GG2.webp",
        itemname: "Pendent Type 2",
        cost: "500 Rs",
      },
      {
        itemid: "3",
        imgPath: "./assets/GG3.webp",
        itemname: "Lovely Lipstick",
        cost: "300 Rs",
      },
    ],
  },
  {
    sectionId: "ModuNest",
    shopid: "4",
    shopname: "ModuNest",
    decription:
      "From designer furniture to fashion-forward bags, find all things bold, export functional, and beautiful.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/MN1.jpg",
        itemname: "Elegant Sofa",
        cost: "1000 Rs",
      },
      {
        itemid: "2",
        imgPath: "./assets/MN2.webp",
        itemname: "Beautiful Sofa",
        cost: "1500 Rs",
      },
      {
        itemid: "3",
        imgPath: "./assets/MN3.jpg",
        itemname: "Sober Table",
        cost: "1300 Rs",
      },
    ],
  },
  {
    sectionId: "FreshBasketMart",
    shopid: "5",
    shopname: "Fresh Basket Mart",
    decription:
      "Your one-stop superstore for fresh groceries, pantry essentials, and daily household needs.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/FM1.webp",
        itemname: "Oranges",
        cost: "100Rs/kg",
      },
      {
        itemid: "2",
        imgPath: "./assets/FM2.jpg",
        itemname: "Apples",
        cost: "200Rs/kg",
      },
      {
        itemid: "3",
        imgPath: "./assets/FM3.webp",
        itemname: "Kiwi",
        cost: "150Rs/kg",
      },
    ],
  },
  {
    sectionId: "TinyTrendz",
    shopid: "6",
    shopname: "TinyTrendz",
    decription:
      "A fun and colorful world of kids' clothing, toys, and essentials designed to delight every little one.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/KC1.webp",
        itemname: "SpongeBob Shirt",
        cost: "200 Rs",
      },
      {
        itemid: "2",
        imgPath: "./assets/KC2.jpg",
        itemname: "Cute Lion Shirt",
        cost: "150 Rs",
      },
      {
        itemid: "3",
        imgPath: "./assets/KC3.webp",
        itemname: "Little Bird Shirt",
        cost: "350 Rs",
      },
    ],
  },
];

// Display in AllShopPage.html
export function sectionShop() {
  const divCreate = document.getElementById("mainClass");
  // divCreate.innerHTML = "";
  shops.forEach((shop) => {
    let itemCards = "";
    shop.item.forEach((item) => {
      itemCards += `
        <div class="col">
          <div class="card shadow-sm colClassSZ">
            <img src="${item.imgPath}" alt="${item.itemname}" />
            <div class="card-body">
              <h4 class="card-title headerItem" id="${item.itemid}">${item.itemname}</h4>
              <h4 class="card-title costItem">Cost: ${item.cost}</h4>
              <div class="d-flex justify-content-flex-start py-2">
                <div class="btn-group"> 
                  <button type="button" class="btn btn-sm btn-success addBtn">+</button>
                  <button type="button" class="btn btn-sm btn-dark inputId">
                    <input type="number" class="inputQty" name="${shop.shopid}" value="0" min="0"/>
                  </button>
                  <button type="button" class="btn btn-sm btn-danger subBtn">-</button>
                </div> 
              </div>
            </div>
          </div>
        </div>`;
    });

    const sectionHTML = `
      <section id="${shop.sectionId}" class="sectionClass">
        <section class="py-2 text-center container">
          <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto" id="paraInShopPg">
              <h1 class="fw-light headerTitle">${shop.shopname}</h1>
              <p class="lead text-body-dark paraTitle">${shop.decription}</p>
              <a href="ShoppingZone.html"> 
                <button type="button" class="btn btn-sm btn-dark fs-5">Go Back</button>
              </a>
            </div>
          </div>
        </section>
        <div class="album py-5 bg-body-tertiary" id="containerInSZ">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 cardShop">
              ${itemCards}
            </div>
          </div>
        </div>
      </section>`;

    // divCreate.innerHTML += sectionHTML;
    // divCreate.append(sectionHTML);
    if (divCreate) {
      divCreate.innerHTML += sectionHTML;
      console.log("divCreate is added with sectionHtml.");
    }
  });
}

// right
// Now add event listeners AFTER DOM is created
let totalAmountInSZ = 0;

export function attachQtyListenersINSZ() {
  document.querySelectorAll(".addBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.closest(".btn-group").querySelector(".inputQty");
      input.value = parseInt(input.value) + 1;

      // Update total amount if needed (parsing cost from DOM)
      const costText = btn
        .closest(".card-body")
        .querySelector(".costItem").innerText;
      const cost = parseInt(costText.replace(/\D/g, "")); // Extract number from "Cost: 500 Rs"
      totalAmountInSZ += cost; // if tracking amount

      // Add to cart
      const itemData = {
        shopid: btn.closest(".sectionClass").id,
        itemid: btn.closest(".card-body").querySelector(".headerItem").id,
        itemname: btn.closest(".card-body").querySelector(".headerItem")
          .innerText,
        cost: costText,
        imgPath: btn.closest(".card").querySelector("img").src,
        zone: "SZ",
        qty: input.value,
      };
      addToCart(itemData);
    });
  });

  document.querySelectorAll(".subBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.closest(".btn-group").querySelector(".inputQty");
      const current = parseInt(input.value);
      if (current > 0) {
        input.value = current - 1;

        const costText = btn
          .closest(".card-body")
          .querySelector(".costItem").innerText;
        const cost = parseInt(costText.replace(/\D/g, ""));
        totalAmountInSZ -= cost; // if tracking amount
      }
      if (input.value == 0) {
        // remove item in itemsInSZ
        const itemData = {
          shopid: btn.closest(".sectionClass").id,
          itemid: btn.closest(".card-body").querySelector(".headerItem").id,
          itemname: btn.closest(".card-body").querySelector(".headerItem")
            .innerText,
          // cost: costText,
          imgPath: btn.closest(".card").querySelector("img").src,
          zone: "SZ",
          qty: input.value,
        };
        removeFromCartINSZ(itemData);
      }
    });
  });
}

export function addToCart(itemInCart) {
  // onValue(itemsINSZ, export function(snapshot){
  // if(snapshot.exists()){
  // Used once to search for value only once
  get(itemsINSZ).then((snapshot) => {
    if (snapshot.exists()) {
      let itemsArray = Object.entries(snapshot.val());
      let itemInCartExist = 0;
      snapshot.forEach((child) => {
        const key = child.key; // <- this is the ID
        const data = child.val();
        const quantity = itemInCart.qty;

        if (
          data.itemname === itemInCart.itemname &&
          data.shopid === itemInCart.shopid &&
          data.itemid === itemInCart.itemid
        ) {
          const updateRef = ref(database, `cartItemsInSZ/${key}`);
          update(updateRef, { qty: quantity });
          itemInCartExist = 1;
        }
      });
      while (itemInCartExist == 0) {
        push(itemsINSZ, itemInCart);
        itemInCartExist = 1;
      }
      console.log(itemsArray);
      console.log(itemsArray[0][1].itemname); // itemname of item
      console.log(itemsArray[0][0]); // id of item
    } else {
      push(itemsINSZ, itemInCart);
    }
  });
}

export function removeFromCartINSZ(itemInCart) {
  // itemsINSZ.once('value').then(snapshot => {
  // onValue(itemsINSZ, export function(snapshot){
  get(itemsINSZ).then((snapshot) => {
    if (snapshot.exists()) {
      let itemsArray = Object.entries(snapshot.val());
      console.log(snapshot.val());
      snapshot.forEach((child) => {
        const key = child.key; // <- this is the ID
        const data = child.val();

        if (
          data.itemname === itemInCart.itemname &&
          data.shopid === itemInCart.shopid &&
          data.itemid === itemInCart.itemid
        ) {
          const removeRef = ref(database, `cartItemsInSZ/${key}`);
          remove(removeRef)
            .then(() => {
              console.log("Data key and id removed successfully.");
            })
            .catch((error) => {
              console.error("Error removing data:", error);
            });
        }
      });
    }
  });
}

export function removeItemsFromCartINSZ() {
  // Remove data at the reference
  remove(itemsINSZ)
    .then(() => {
      console.log("Data removed successfully.");
    })
    .catch((error) => {
      console.error("Error removing data:", error);
    });
}

// const itemsINSZ = ref(database, 'cartItemsInSZ');

// // Call section builders first
// sectionShop();

// // Then attach event listeners AFTER DOM is populated
// attachQtyListeners();

// export * from './fixed_script.js';

document.addEventListener("DOMContentLoaded", () => {
  sectionShop();
  // removeItemsFromCartINSZ();
  attachQtyListenersINSZ();
});
