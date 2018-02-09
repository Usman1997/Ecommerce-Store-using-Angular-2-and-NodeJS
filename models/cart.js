module.exports = function Cart(oldCart){

this.items  = oldCart.items || {}
this.totalPrice = oldCart.totalPrice || 0;
this.totalQty = oldCart.totalQty || 0;


   this.add = function(item,id){
       var storeItem = this.items[id];
       if(!storeItem){
           storeItem = this.items[id]  ={ item:item,qty:0,price:0};

       }
       storeItem.qty++;
       storeItem.price = storeItem.item.price *storeItem.qty;
       this.totalPrice += storeItem.item.price;
       this.totalQty++;
   }

   this.generateArray = function(){
       var arr = [];
       for(var id in items){
           arr.push(this.items[id]);
       }
       return arr;
   };
};