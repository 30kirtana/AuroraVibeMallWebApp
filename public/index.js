
let shops = [ {
    sectionId: "#DécorDen",
    shopid: "1",
    shopname: "DécorDen", 
    decription: "Discover elegant and contemporary home decor pieces that transform your living space into a haven of style.",
    item: [{
        itemid: "1",
        imgPath: "./assets/DD1.jpg",
        itemname: "Flower Wall Hanging type 1",
        cost: "400 Rs"
    },
    {
        itemid: "2",
        imgPath: "./assets/DD2.jpg",
        itemname: "Dish Hanging type 1",
        cost: "500 Rs"
    },
    {
        itemid: "3",
        imgPath: "./assets/DD3.jpg",
        itemname: "Flower Wall Hanging type 2",
        cost: "600 Rs"
    }],
},
{
    sectionId: "#VogueVista",
    shopid: "2",
    shopname: "VogueVista", 
    decription: "Redefine your wardrobe with trendsetting clothing that blends timeless design with modern flair.",
    item: [{
        itemid: "1",
        imgPath: "./asset/VV1.jpg",
        itemname: "Red Checked Shirt",
        cost: "200 Rs"
    },
    {
        itemid: "2",
        imgPath: "./assets/VV2.webp",
        itemname: "Blue Top",
        cost: "150 Rs"
    },
    {
        itemid: "3",
        imgPath: "./assets/VV3.webp",
        itemname: "Light Blue Jeans",
        cost: "300 Rs"
    }],
},
{   sectionId: "#Glow&Gold",
    shopid: "3",
    shopname: "Glow & Gold", 
    decription: "Indulge in luxury with radiant cosmetics and dazzling jewellery that add sparkle to every moment.",
    item: [{
        itemid: "1",
        imgPath: "./asset/GG1.webp",
        itemname: "Pendent Type 1",
        cost: "700 Rs"
    },
    {
        itemid: "2",
        imgPath: "./assets/GG2.webp",
        itemname: "Pendent Type 2",
        cost: "500 Rs"
    },
    {
        itemid: "3",
        imgPath: "./assets/GG3.webp",
        itemname: "Lovely Lipstick",
        cost: "300 Rs"
    }],
},
{   sectionId: "#ModuNest",
    shopid: "4",
    shopname: "ModuNest", 
    decription: "From designer furniture to fashion-forward bags, find all things bold, functional, and beautiful.",
    item: [{
        itemid: "1",
        imgPath: "./asset/MN1.jpg",
        itemname: "Elegant Sofa",
        cost: "1000 Rs"
    },
    {
        itemid: "2",
        imgPath: "./assets/MN2.webp",
        itemname: "Beautiful Sofa",
        cost: "1500 Rs"
    },
    {
        itemid: "3",
        imgPath: "./assets/MN3.jpg",
        itemname: "Sober Table",
        cost: "1300 Rs"
    }],
},
{   sectionId: "#FreshBasketMart",
    shopid: "5",
    shopname: "Fresh Basket Mart", 
    decription: "Your one-stop superstore for fresh groceries, pantry essentials, and daily household needs.",
    item: [{
        itemid: "1",
        imgPath: "./asset/FM1.webp",
        itemname: "Oranges",
        cost: "100Rs/kg"
    },
    {
        itemid: "2",
        imgPath: "./assets/FM2.jpg",
        itemname: "Apples",
        cost: "200Rs/kg"
    },
    {
        itemid: "3",
        imgPath: "./assets/FM3.webp",
        itemname: "Kiwi",
        cost: "150Rs/kg"
    }],
},
{   sectionId: "#TinyTrendz",
    shopid: "6",
    shopname: "TinyTrendz", 
    decription: "A fun and colorful world of kids' clothing, toys, and essentials designed to delight every little one.",
    item: [{
        itemid: "1",
        imgPath: "./asset/KC1.webp",
        itemname: "SpongeBob Shirt",
        cost: "200 Rs"
    },
    {
        itemid: "2",
        imgPath: "./assets/KC2.jpg",
        itemname: "Cute Lion Shirt",
        cost: "150 Rs"
    },
    {
        itemid: "3",
        imgPath: "./assets/KC3.webp",
        itemname: "Blue Green Shirt",
        cost: "350 Rs"
    }],
},
]

function sectionShop(){
    const divCreate = document.getElementById('mainClass');
    shops.forEach((data)=>{ 
    divCreate.innerHTML += `
    <section id="#DecorDen" class="sectionClass">
      <section class="py-2 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto" id="paraInShopPg">
            <h1 class="fw-light" id="headerTitle">DécorDen</h1>
            <p class="lead text-body-dark" id="paraTitle">Discover elegant and contemporary home 
            decor pieces that transform your living space 
            into a haven of style.</p>
          </div>
        </div>
      </section>
    <div class="album py-5 bg-body-tertiary" id="containerInSZ">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id="cardShop">
            <div class="col">
              <div class="card shadow-sm colClassSZ"><img src="./assets/DD1.jpg"/>
                <div class="card-body">
                  <h4 class="card-title" id="headerItem">Flower Wall Hanging (1)</h4>
                  <h4 class="card-title" id="costItem">Cost: 400 Rs</h4>
                  <div class="d-flex justify-content-flex-start py-2">
                    <div class="btn-group"> 
                      <button type="button" class="btn btn-sm btn-success">+</button>
                      <button type="button" class="btn btn-sm btn-dark inputId">
                      <input type="number" id="cart" name="DD">
                      </button>
                      <button type="button" class="btn btn-sm btn-danger">-</button></div> 
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm colClassSZ"><img src="./assets/DD2.jpg"/>
                <div class="card-body">
                  <h4 class="card-title" id="headerItem">Dish Wall Hanging</h4>
                  <h4 class="card-title" id="costItem">Cost: 500 Rs</h4>
                  <div class="d-flex justify-content-flex-start py-2">
                    <div class="btn-group"> 
                      <button type="button" class="btn btn-sm btn-success">+</button>
                      <button type="button" class="btn btn-sm btn-dark inputId">
                      <input type="number" id="cart" name="DD">
                      </button>
                      <button type="button" class="btn btn-sm btn-danger">-</button></div> 
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm colClassSZ"><img src="./assets/DD3.jpg"/>
                <div class="card-body">
                  <h4 class="card-title" id="headerItem">Flower Wall Hanging (2)</h4>
                  <h4 class="card-title" id="costItem">Cost: 700 Rs</h4>
                  <div class="d-flex justify-content-flex-start py-2">
                    <div class="btn-group"> 
                      <button type="button" class="btn btn-sm btn-success">+</button>
                      <button type="button" class="btn btn-sm btn-dark inputId">
                      <input type="number" id="cart" name="DD">
                      </button>
                      <button type="button" class="btn btn-sm btn-danger">-</button></div> 
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;
    divCreate.getElementsByClassName("sectionClass")[0].id = data.sectionId; 
    divCreate.getElementById("headerTitle").innerHTML = data.shopname; 
    divCreate.getElementsByClassName("paraTitle")[0] = data.decription;
for(let i=0;i<3;i++){
divCreate.getElementsByTagName("img")[i].src = data.item[i].imgPath;
const num = 0;
divCreate.getElementsByClassName("card-title")[0+num].innerHTML = data.item[i].itemname;
divCreate.getElementsByClassName("card-title")[1+num].innerHTML = `Cost is ${data.item[i].cost}`;
num = num + 2;
}
    // divMain.append(divCreate);
    });
}

sectionShop();
