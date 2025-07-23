import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, get, onValue, remove, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { config } from "./FirebaseConfig.js";
const appSettings = {
  databaseURL:
    "https://auroravibemallfirebaseapp-default-rtdatabase.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(config);
const database = getDatabase(app);
const itemsINFZ = ref(database, "cartItemsInFZ");

// Display Food Court Items
let FoodShop = [
  {
    shopid: "1",
    shopname: "BurgerCraft",
    decription:
      "Handcrafted burgers and loaded subs made with passion and premium ingredients.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/FZ_BC1.jpeg",
        itemname: "Vegetable Patties Burger",
        cost: "200 Rs",
      },
      {
        itemid: "2",
        imgPath: "./assets/FZ_BC2.webp",
        itemname: "Vegetable Sub",
        cost: "300 Rs",
      },
      {
        itemid: "3",
        imgPath: "./assets/FZ_BC3.png",
        itemname: "Vegetable Sandwich",
        cost: "350 Rs",
      },
    ],
  },
  {
    shopid: "2",
    shopname: "Dum & Dine",
    decription:
      "Slow-cooked, richly spiced biryanis that bring Hyderabad and Lucknow to your plate.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/FZ_DD1.jpeg",
        itemname: "Paneer Biryani",
        cost: "400 Rs",
      },
      {
        itemid: "2",
        imgPath: "./assets/FZ_DD2.webp",
        itemname: "Paneer Tikka",
        cost: "300 Rs",
      },
      {
        itemid: "3",
        imgPath: "./assets/FZ_DD3.jpeg",
        itemname: "Vegetable Biryani",
        cost: "350 Rs",
      },
    ],
  },
  {
    shopid: "3",
    shopname: "Amritsari Zaika",
    decription:
      "Indulge in the rich and hearty taste of Punjab with every bite of our classic dishes.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/FZ_AZ1.jpg",
        itemname: "Chole Bature",
        cost: "150 Rs",
      },
      {
        itemid: "2",
        imgPath: "./assets/FZ_AZ2.webp",
        itemname: "Aloo Parantha",
        cost: "100 Rs",
      },
      {
        itemid: "3",
        imgPath: "./assets/FZ_AZ3.gif",
        itemname: "Dal Makhani",
        cost: "250 Rs",
      },
    ],
  },
  {
    shopid: "4",
    shopname: "Filter & Flavors",
    decription:
      "A perfect blend of South Indian meals and authentic filter coffee in one place.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/FZ_FF1.jpg",
        itemname: "Idli Sambar",
        cost: "100 Rs",
      },
      {
        itemid: "2",
        imgPath: "./assets/FZ_FF2.webp",
        itemname: "Filter Coffee (Our Speciality)",
        cost: "50 Rs",
      },
      {
        itemid: "3",
        imgPath: "./assets/FZ_FF3.jpg",
        itemname: "Masala Dosa",
        cost: "150 Rs",
      },
    ],
  },
];

// Display Sweet Junction Items
let SweetShop = [
  {
    shopid: "1",
    shopname: "Velvet Scoop - Ice Cream Parlour",
    decription:
      "Indulge in artisanal ice creams spun from rich cream and exotic ingredients, served with elegance.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/SJ_VS_IS1.jpg",
        itemname: "Chocolate Vanilla Icecream Scoops Combination",
        cost: "100 Rs",
      },
      {
        itemid: "2",
        imgPath: "./assets/SJ_VS_IS2.jpeg",
        itemname: "Black Current Sundae",
        cost: "120 Rs",
      },
      {
        itemid: "3",
        imgPath: "./assets/SJ_VS_IS3.webp",
        itemname: "Tutty Fruity Sundae",
        cost: "130 Rs",
      },
    ],
  },
  {
    shopid: "2",
    shopname: "Chocolate Factory - Chocolate Boutique",
    decription:
      "A luxurious haven of handcrafted truffles, pralines, and cocoa creations fit for royalty.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/SJ_CF_CB1.webp",
        itemname: "Ferro-Rocher Chocolate Box",
        cost: "250 Rs",
      },
      {
        itemid: "2",
        imgPath: "./assets/SJ_CF_CB2.webp",
        itemname: "Sweet & Sugar Chocolate Box",
        cost: "140 Rs",
      },
      {
        itemid: "3",
        imgPath: "./assets/SJ_CF_CB3.jpeg",
        itemname: "Assorted Chocolate Box",
        cost: "150 Rs",
      },
    ],
  },
  {
    shopid: "3",
    shopname: "Saffron & Silver - Indian Mithai Gallery",
    decription:
      "Celebrate tradition with a gourmet twist on classic Indian sweets, wrapped in gold and nostalgia.",
    item: [
      {
        itemid: "1",
        imgPath: "./assets/SJ_SS_IM1.webp",
        itemname: "Gulab Jamun Sweet",
        cost: "300Rs/kg",
      },
      {
        itemid: "2",
        imgPath: "./assets/SJ_SS_IM2.jpg",
        itemname: "Rasmalai Sweet",
        cost: "400Rs/kg",
      },
      {
        itemid: "3",
        imgPath: "./assets/SJ_SS_IM3.jpg",
        itemname: "Petha Sweet",
        cost: "350Rs/kg",
      },
    ],
  },
];

export function sectionFoodShop() {
  const divCreate = document.getElementById("mainClassOne");
  // divCreate.innerHTML = "";
  FoodShop.forEach((shop) => {
    let itemCards = "";
    shop.item.forEach((item, i) => {
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

    // Build shop section dynamically
    const sectionHTML = `
        <section class="py-2 text-center container">
          <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto" id="paraInShopPg">
              <h1 class="fw-light headerTitle">${shop.shopname}</h1>
              <p class="lead text-body-dark paraTitle">${shop.decription}</p>
              <a href="FoodZone.html"> <button type="button"
              class="btn btn-sm btn-dark fs-5">Go Back</button></a>
            </div>
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
        `;

    // Append section to main div
    // divCreate.innerHTML += sectionHTML;
    // divCreate.append(sectionHTML);
    if (divCreate) {
      divCreate.innerHTML += sectionHTML;
      console.log("divCreate is added with sectionHtml.");
    }
  });
}

export function sectionSweetShop() {
  const divCreate = document.getElementById("mainClassTwo");
  // divCreate.innerHTML = "";
  SweetShop.forEach((shop) => {
    let itemCards = "";
    shop.item.forEach((item, i) => {
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

    // Build shop section dynamically
    const sectionHTML = `
        <section class="py-2 text-center container">
          <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto" id="paraInShopPg">
              <h1 class="fw-light headerTitle">${shop.shopname}</h1>
              <p class="lead text-body-dark paraTitle">${shop.decription}</p>
              <a href="FoodZone.html"> <button type="button"
              class="btn btn-sm btn-dark fs-5">Go Back</button></a>
            </div>
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
        `;

    // Append section to main div
    // divCreate.innerHTML += sectionHTML;
    if (divCreate) {
      divCreate.innerHTML += sectionHTML;
      console.log("divCreate is added with sectionHtml.");
    }
  });
}

let totalAmountInFZ = 0;

export function attachQtyListenersINFZ() {
  document.querySelectorAll(".addBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.closest(".btn-group").querySelector(".inputQty");
      input.value = parseInt(input.value) + 1;

      // Update total amount if needed (parsing cost from DOM)
      const costText = btn
        .closest(".card-body")
        .querySelector(".costItem").innerText;
      const cost = parseInt(costText.replace(/\D/g, "")); // Extract number from "Cost: 500 Rs"
      totalAmountInFZ += cost; // if tracking amount

      // Add to cart
      const itemData = {
        shopid: btn.closest(".sectionClass").id,
        itemid: btn.closest(".card-body").querySelector(".headerItem").id,
        itemname: btn.closest(".card-body").querySelector(".headerItem")
          .innerText,
        cost: costText,
        imgPath: btn.closest(".card").querySelector("img").src,
        zone: "FZ",
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
        totalAmountInFZ -= cost; // if tracking amount
      }
      if (input.value == 0) {
        // remove item in itemsInFZ
        const itemData = {
          shopid: btn.closest(".sectionClass").id,
          itemid: btn.closest(".card-body").querySelector(".headerItem").id,
          itemname: btn.closest(".card-body").querySelector(".headerItem")
            .innerText,
          // cost: costText,
          imgPath: btn.closest(".card").querySelector("img").src,
          zone: "FZ",
          qty: input.value,
        };
        removeFromCartInFZ(itemData);
      }
    });
  });
}

export function addToCart(itemInCart) {
  // onValue(itemsInFZ, export function(snapshot){
  // if(snapshot.exists()){
  // Used once to search for value only once
  get(itemsINFZ).then((snapshot) => {
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
          const updateRef = ref(database, `cartItemsInFZ/${key}`);
          update(updateRef, { qty: quantity });
          itemInCartExist = 1;
        }
      });
      while (itemInCartExist == 0) {
        push(itemsINFZ, itemInCart);
        itemInCartExist = 1;
      }
      console.log(itemsArray);
      console.log(itemsArray[0][1].itemname); // itemname of item
      console.log(itemsArray[0][0]); // id of item
    } else {
      push(itemsINFZ, itemInCart);
    }
  });
}

export function removeFromCartInFZ(itemInCart) {
  // itemsInFZ.once('value').then(snapshot => {
  // onValue(itemsInFZ, export function(snapshot){
  get(itemsINFZ).then((snapshot) => {
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
          const removeRef = ref(database, `cartItemsInFZ/${key}`);
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

export function removeItemsFromCartINFZ() {
  // Remove data at the reference
  remove(itemsINFZ)
    .then(() => {
      console.log("Data removed successfully.");
    })
    .catch((error) => {
      console.error("Error removing data:", error);
    });
}
// // Call both section builders first
// sectionFoodShop();
// sectionSweetShop();

// // Then attach event listeners AFTER DOM is populated
// attachQtyListeners();

// export * from './fixed_scriptFoodZone.js';

document.addEventListener("DOMContentLoaded", () => {
  sectionFoodShop();
  sectionSweetShop();
  // removeItemsFromCartINFZ();
  attachQtyListenersINFZ();
});
