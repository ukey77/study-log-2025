const userMap = new Map();

/* 
- set으로 key, value 선언
- key에 object,function, number 가능
*/
userMap.set("name","Yujin");
userMap.set("email","test@naver.com");
userMap.set("phone","010-1111-2222");

// console.log(userMap);

/* 
get으로 keyname 지정
*/
// console.log("name:",userMap.get("name"));

const mapGuest = new Map();
const guestArr = [
    {id: 1, name: "CDR", city: "Seoul"},
    {id: 2, name: "ZARD", city: "Busan"},
    {id: 3, name: "LOVE", city: "Jeju"},
    {id: 4, name: "KYJ", city: "Seoul"},
    {id: 5, name: "IJK", city: "Jeju"}
];

guestArr.forEach((item)=>{
    if(!mapGuest.has(item["city"])){
        mapGuest.set(item["city"],[]);
    }
    mapGuest.get(item["city"]).push(item);
});

console.log(mapGuest);