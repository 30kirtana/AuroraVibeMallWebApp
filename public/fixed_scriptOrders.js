// ✅ scriptOrders.js (For YourOrders.html)
// Loads orders from Firebase and displays them on page load

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {config} from './FirebaseConfig.js';
const appSettings = {
    databaseURL: "https://auroravibemallfirebaseapp-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(config);
const database = getDatabase(app);
const orderItemsRef = ref(database, 'orderItems');

document.addEventListener('DOMContentLoaded', () => {
  const ordersContainer = document.querySelector('.mainClassInYO');

  function renderOrders(snapshot) {
    ordersContainer.innerHTML = '';
    let total = 0;

    if (!snapshot.exists()) {
      ordersContainer.innerHTML = '<h5>No orders found.</h5>';
      return;
    }

    const orders = snapshot.val();
    Object.values(orders).forEach(order => {
    // for(const i = 0; i <orders[0].length)
      console.log(order.orderItems[1]);
      for(let i=0;i<order.orderItems.length;i++){
      const cost = parseInt(order.orderItems[i].cost.replace(/\D/g, ''));
      const subtotal = cost * order.orderItems[i].qty;
      total += subtotal;

      const orderCard = `
        <div class="card m-2 p-2" style="height:120px;">
          <div class="row">
            <div class="col-md-4">
              <img src="${order.orderItems[i].imgPath}" class="img-fluid" style="height:100px; border:2px solid black;"/>
            </div>
            <div class="col-md-8">
              <h5>${order.orderItems[i].itemname}</h5>
              <p>Price: ₹${cost} X${order.orderItems[i].qty} = ₹${subtotal}</p>
            </div>
          </div>
        </div>
      `;
      ordersContainer.innerHTML += orderCard;
    }});

    ordersContainer.innerHTML += `
      <hr/>
      <h4>Total Order Cost: ₹${total}</h4>
      <hr/>
    `;
  }

  // Listen for realtime updates after a small delay to capture new push
  setTimeout(() => {
    onValue(orderItemsRef, renderOrders);
  }, 500);
});
