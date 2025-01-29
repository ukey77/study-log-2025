const set = new Set();
console.log("set: ",set);

const set1 = new Set([1,2,3,4]);
console.log("set1: ",set1);

const set_string = new Set("Hello World"); //  { 'H', 'e', 'l', 'o', ' ', 'W', 'r', 'd' }
console.log("set_string: ",set_string);

const {size} = set_string; // size 확인
// console.log(size);

/* 
size 프로퍼티는 setter함수 없이 getter만 존재하는 접근자 프로퍼티.
따라서 size 프로퍼티에 숫자를 할당하여 Set객체의 요소 개수를 변경할 수 없다.
*/

// 요소 추가 (add)

const set_add = new Set();
set_add.add(1);
console.log(set_add);

set_add.add(1).add(2).add(3).add(1); //체인 형식으로 이어쓰기 가능. 
console.log(set_add); // 중복은 무시됨.  => Set(3) { 1, 2, 3 }


/* 
일치 비교 연산자 === 을 사용하면 NaN과 NaN을 다르다고 평가함.
but, Set객체는 NaN과 NaN을 같다고 평가하여 중복 추가를 허용하지 않음.
+0, -0또한 같다고 평가하여 중복 추가를 허용하지 않는다. (비교연산자도 동일)
*/

const set_compare = new Set();
console.log("==test==");
console.log("NaN===NaN: ",NaN===NaN, "+0 === -0: ",+0 === -0);
set_compare.add(NaN).add(NaN).add(+0).add(-0).add(0);
console.log("set_compare: ", set_compare);


// == 요소 존재 여부 확인 == (has)
const set_has = new Set([1,2,3]);
console.log("set.has(2): ", set.has(2));
console.log("set.has(4): ", set.has(4));

// == 요소 삭제 == (delete)
const set_delete = new Set([1,2,3]);
set_delete.delete(2);
console.log("set_delete: ", set_delete);

// == 요소 일괄 삭제 == (clear)
const set_clear = new Set([1,2,3]);
console.log("set_clear :", set_clear);
set_clear.clear();
console.log("set_clear :", set_clear);

// == 요소 순회 ==
/* 
 첫번째 인수: 현재 순회 중인 요소 값
 두번째 인수: 현재 순회 중인 요소 값
 세번째 인수: 현재 순회중인 Set객체 자체

- 첫번째 인수와 두번째 인수는 같은 값이다.
- forEach메서드와 인터페이스를 통일하기 위함이며 다른 의미는 없다.
- forEach메서드의 콜백함수는 두번째 인수로 현재 순회중인 요소의 인덱스를 전달받는다.
  하지만 Set객체에는 순서에 의미가 없어 배열과 같이 인덱스를 같지 않는다.
*/

console.log("== 요소 순회 ==")
const set_iterable = new Set([1,2,3]);
set_iterable.forEach((v,i,a)=>{
   console.log(v,i,a); 
});


// Set객체는 이터러블이다 따라서 forOf문으로 순회할 수 있으며 , 스프레드 문법과 배열 디스트럭처링의 대상이다.

for(const value of set_iterable){
    console.log("set_iterable: ",value);
}

console.log("spread: ",[...set_iterable]);