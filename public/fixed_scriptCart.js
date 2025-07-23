import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, get, set, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {config} from './FirebaseConfig.js';
import { sectionShop, attachQtyListenersINSZ, removeItemsFromCartINSZ} from './fixed_script.js';
import { sectionFoodShop, sectionSweetShop, attachQtyListenersINFZ, removeItemsFromCartINFZ } from './fixed_scriptFoodZone.js';
const appSettings = {
    databaseURL: "https://auroravibemallfirebaseapp-default-rtdatabase.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(config);
const database = getDatabase(app);
const cartItemsRef = ref(database, 'cartItems');
const orderItemsRef = ref(database, 'orderItems');
let prevOrders = 0;
const itemsINSZref = ref(database, 'cartItemsInSZ');
const itemsINFZref = ref(database, 'cartItemsInFZ');
const totalAmountRef = ref(database, 'totalAmount');
 let existsForTA = false;

  const TAInSZ = document.getElementById('amountSZ');
  const TAInFZ = document.getElementById('amountFZ');
  const TA = document.getElementById('amount');
  const cartContainer = document.querySelector('.partOne');

  // let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  let totalSZ;
  let totalFZ;
  let totalAmount;

  function calculateTotals() {
  totalSZ = 0;
  totalFZ = 0;

    //   onValue(cartItemsRef, function(snapshot){
    // if(snapshot.exists()){
  get(cartItemsRef).then((snapshot) => {
    if (snapshot.exists()) {
      let itemsArray = Object.entries(snapshot.val());
      itemsArray.forEach(([key, item]) => {
        const cost = parseInt(item.cost.replace(/\D/g, '')) * item.qty;
        if (item.zone === 'SZ') totalSZ += cost;
        else if (item.zone === 'FZ') totalFZ += cost;
      });

      // ✅ Now update the DOM inside the `.then()` block
      TAInSZ.value = totalSZ;
      TAInFZ.value = totalFZ;
      TA.value = totalSZ + totalFZ;
      totalAmount = totalSZ + totalFZ;
      get(totalAmountRef).then((snapshot) => {
        if (snapshot.exists()) {
          update(totalAmountRef, totalAmount)
            .then(() => console.log("✅ Data updated successfully"))
            .catch((err) => console.error("❌ Update failed:", err));
        } else {
          set(totalAmountRef, totalAmount)
            .then(() => console.log("✅ Data created successfully"))
            .catch((err) => console.error("❌ Set failed:", err));
        }
      });
    } else {
      TAInSZ.value = 0;
      TAInFZ.value = 0;
      TA.value = 0;
    }
  }).catch((error) => {
    console.error("Error fetching cart items:", error);
  });
}


  // function calculateTotals() {
  //   totalSZ = 0;
  //   totalFZ = 0;
  // get(cartItemsRef).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     let itemsArray = Object.entries(snapshot.val());
  //     console.log(snapshot.val());
  //     itemsArray.forEach (([key,item]) => {
  //     const cost = parseInt(item.cost.replace(/\D/g, '')) * item.qty;
  //     if (item.zone === 'SZ') totalSZ += cost;
  //     else if (item.zone === 'FZ') totalFZ += cost;
  //   })
 

  //   TAInSZ.innerText = totalSZ;
  //   TAInFZ.innerText = totalFZ;
  //   TA.innerText = totalSZ + totalFZ;
  //   totalAmount = totalSZ + totalFZ;
  //    }})
  // }

async function renderCart() {
  // const cartContainer = document.querySelector('.partOne');
  cartContainer.innerHTML = '';

  async function buildZoneSection(refPath, zoneLabel) {
    let html = `<h4 class='mt-4'>${zoneLabel}</h4>`;

    const snapshot = await get(refPath);
    if (snapshot.exists()) {
      const itemsArray = Object.entries(snapshot.val());

      itemsArray.forEach(([key, item]) => {
        const costPerItem = parseInt(item.cost.replace(/\D/g, ''));
        const subtotal = costPerItem * item.qty;

        // optional: only push if not already present
        addItemOnce(item, cartItemsRef);

        html += `
          <div class="card m-2 p-2" style="height:120px;">
            <div class="row">
              <div class="col-md-4">
                <img src="${item.imgPath}" class="img-fluid" style="height:100px;border:2px solid black;" />
              </div>
              <div class="col-md-8">
                <h5>${item.itemname}</h5>
                <p>Price: ₹${costPerItem} × ${item.qty} = ₹${subtotal}</p>
              </div>
            </div>
          </div>`;
      });
    }

    return html;
  }

  // Await both zone sections before appending
  const szHTML = await buildZoneSection(itemsINSZref, "🛍️ Shopping Zone Items");
  const fzHTML = await buildZoneSection(itemsINFZref, "🍽️ Food Court Items");

  cartContainer.innerHTML = szHTML + fzHTML;
}

// function renderCart() {
//     cartContainer.innerHTML = '';

//     // const szItems = itemsINSZref.filter(item => item.zone === 'SZ');
//     // const fzItems = itemsINFZref.filter(item => item.zone === 'FZ');

//     const buildZoneSection = (item, zoneLabel)=>{
//       let html = document.createElement('div');
//       html = `<h4 class='mt-4'>${zoneLabel}</h4>`;
//     //   onValue(item, function(snapshot){
//     // if(snapshot.exists()){
//     get(item).then((snapshot) => {
//       if (snapshot.exists()) {
//       let itemsArray = Object.entries(snapshot.val());
//       itemsArray.forEach((itemData) => {
//         console.log(itemData[1]);
//         const costPerItem = parseInt(itemData[1].cost.replace(/\D/g, ''));
//         const subtotal = costPerItem * itemData[1].qty;
//         push(cartItemsRef, itemData[1]);
//         html += `
//           <div class="card m-2 p-2" style="height:120px;">
//             <div class="row">
//               <div class="col-md-4">
//                 <img src="${itemData[1].imgPath}" class="img-fluid" style="height:100px;border:2px solid black;" />
//               </div>
//               <div class="col-md-8">
//                 <h5>${itemData[1].itemname}</h5>
//                 <p>Price: ₹${costPerItem} × ${itemData[1].qty} = ₹${subtotal}</p>
//               </div>
//             </div>
//           </div>`;
//       })
//     }
//       });
//       return html;
//     };

//     cartContainer.innerHTML += buildZoneSection(itemsINSZref, "🛍️ Shopping Zone Items");
//     cartContainer.innerHTML += buildZoneSection(itemsINFZref, "🍽️ Food Court Items");
//     return cartContainer;

//   }

function addItemOnce(newItem, refGiven) {
  onValue(refGiven, (snapshot) => {
    let exists = false;

    snapshot.forEach((child) => {
        const key = child.key; // <- this is the ID
        const data = child.val();
      if (
          data.itemname === newItem.itemname &&
          data.shopid === newItem.shopid &&
          data.itemid === newItem.itemid
        ) {
        exists = true;
      }
    });

    if (!exists) {
      push(cartItemsRef, newItem);
      console.log("✅ Item pushed to Firebase");
    } else {
      console.log("⚠️ Item already exists, not pushing again");
    }
  })
  , {
    onlyOnce: true // prevent continuous listening
  }
}

  function clearCart() {
    // localStorage.removeItem('cartItems');
    // remove(cartItemsRef).then(() => console.log("Firebase cartItems cleared"));
    remove(cartItemsRef)
        .then(() => {
          console.log("Data removed successfully in cartItemsRef.");
        })
        .catch((error) => {
          console.error("Error removing data:", error);
        });
    cartContainer.innerHTML = '';
  }

  // function pushCartToOrders() {
  //   cartItems.forEach(item => {
  //     push(orderItemsRef, item);
  //   });
  // }

document.getElementById('purchaseItems').addEventListener('click', () => {
  let prevOrders = 1; // You can update this logic later to increment order ID
  let arrayOfItems = [];

  get(cartItemsRef).then((snapshot) => {
    if (snapshot.exists()) {
      let itemsArray = Object.entries(snapshot.val());

      itemsArray.forEach(([key, item]) => {
        addItemOnce(item, orderItemsRef);
        arrayOfItems.push(item);
      });

      const orderData = {
        orderId: prevOrders,
        orderItems: arrayOfItems
      };

      push(orderItemsRef, orderData)
        .then(() => console.log('✅ Order pushed:', orderData))
        .catch(err => console.error('❌ Push failed:', err));
    clearCart();
    } else {
      console.log("⚠️ No items in cart to order.");
    }

    clearCart();
    document.querySelector('.partOne').innerHTML = '<h5>Your cart is empty.</h5>';
  });
});


  // document.getElementById('purchaseItems').addEventListener('click', () => {
  //   let orderedPreviously = [];
  //   get(cartItemsRef).then((snapshot) => {
  //   let count = 0;
  //   if (snapshot.exists()) {
  //     let itemsArray = Object.entries(snapshot.val());
  //     itemsArray.forEach(([key, item]) => {
  //   prevOrders += 1;
  //   orderedPreviously[count] = {
  //     OrderId: prevOrders,
  //     OrderItem: item,
  //   };
  //   count +=1;
  // })
  //   push(orderItemsRef, orderedPreviously);
  //   console.log(orderedPreviously);
  // }})
    // clearCart();
    // document.querySelector('.partOne').innerHTML = '<h5>Your cart is empty.</h5>';
    // })
    // pushCartToOrders();
    // onValue(item, function(snapshot){
    // if(snapshot.exists()){
    //   for(let i=0;i<item.length;i++){
  // }}});

  document.getElementById('removeItems').addEventListener('click', () => {
    clearCart();
    
  remove(itemsINSZref)
        .then(() => {
          console.log("Data removed successfully in itemsINSZref.");
        })
        .catch((error) => {
          console.error("Error removing data:", error);
        });

  remove(itemsINFZref)
        .then(() => {
          console.log("Data removed successfully in itemsINFZref.");
        })
        .catch((error) => {
          console.error("Error removing data:", error);
        });

    remove(orderItemsRef)
        .then(() => {
          console.log("Data removed successfully in orderItemsRef.");
        })
        .catch((error) => {
          console.error("Error removing data:", error);
        });

    remove(totalAmountRef)
        .then(() => {
          console.log("Data removed successfully in totalAmountRef.");
        })
        .catch((error) => {
          console.error("Error removing data:", error);
        });
    document.querySelector('.partOne').innerHTML = '<h5>Your cart is empty.</h5>';
  });


document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  calculateTotals();

});
