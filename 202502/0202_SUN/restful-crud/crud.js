class StudentInfo {
    constructor(id) {
        this.id = id;
        this.data = null;
        this.id=0;
    }
    url(address = "") {
        return `http://localhost:5000/info${address}`;
    }
    $(element) {
        return document.getElementById(element);
    }
    initDom() {
        const htmlTemplate = `
        <div id="dataListArea"></div>
        <br/><hr/><br/>
        <div>
            <input type="text" id="name" placeholder="name">
            <input type="text" id="hobby" placeholder="hobby">
            <input type="text" id="description" placeholder="description">
            <button id="createBtn">저장</button>
        </div>
        `;
        this.$("wrapper").innerHTML = `${htmlTemplate}`;
    }
    getData() {
        fetch(this.url())
            .then((response) => response.json())
            .then((data) => {
                this.data = data;
                this.id = (data.length > 0) ? Math.max(...data.map(d => d.id)) + 1 : 1;
                this.displayDom();
            })
            .catch((err) => {
                console.log("GET_ERR: ", err);
            });
    }
    postData(data) {
        fetch(this.url(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...data })
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => {
                console.log("POST_ERR: ", err);
            });
    }
    deleteData(id){
        fetch(this.url(`/${id}`),{
            method: "DELETE"
        })
        .then((response)=>response.json())
        .catch((err)=>{
            console.log("DELETE_ERR: ", err);
        })
    }
    putData(data){
        fetch(this.url(`/${data["id"]}`),{
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...data})
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data))
        .catch((err)=>{
            console.log("PUT_ERR: ", err);
        })
    }
    getDomData(id, name, hobby, description){
        return {
            id: id,
            name: name,
            hobby: hobby,
            description: description
        }
    }
    eventManager() {
        window.addEventListener("click", (e) => {
            switch (e.target.id) {
                case "createBtn":
                    const dataObj = this.getDomData(this.id, this.$("name").value, this.$("hobby").value, this.$("description").value);
                    this.postData(dataObj);
                    break;
            }

            if(/deleteBtn/.test(e.target.id)){
                const id = Number(e.target.id.split("_")[1]);
                this.deleteData(id);
            }   

            if(/updateBtn/.test(e.target.id)){
                const id = e.target.id.split("_")[1];
                const dataObj = this.getDomData(id, (this.$(`name_${id}`).value),(this.$(`hobby_${id}`).value), (this.$(`description_${id}`).value));
                this.putData(dataObj);
            }   

        });
    }
    displayDom() {
        const htmlString = this.data.reduce((acc, cur) => {
            return acc += (`
                <div>
                    <input type="text" id="id_${cur["id"]}" value="${cur["id"]}" disabled>
                    <input type="text" id="name_${cur["id"]}" value="${cur["name"]}">
                    <input type="text" id="hobby_${cur["id"]}" value="${cur["hobby"]}">
                    <input type="text" id="description_${cur["id"]}" value="${cur["description"]}">
                    <button id="updateBtn_${cur["id"]}">update</button>
                    <button id="deleteBtn_${cur["id"]}">delete</button>
                </div>`);
        }, "<div>");
        this.$("dataListArea").innerHTML = `${htmlString}</div>`;
    }
    run() {
        this.initDom();
        this.getData();
        this.eventManager();
    }
}

const studentInfo = new StudentInfo("info");
studentInfo.run();