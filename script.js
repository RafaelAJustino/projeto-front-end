const burger = document.getElementById('burger')
const nav = document.querySelector('nav')
const inputTitle = document.getElementById('form-title')
const inputContent = document.getElementById('form-content')
const errTitle = document.getElementById('err-title')
const errContent = document.getElementById('err-content')
const postSection = document.getElementById('post')

const storageItem = 'cool-list';

burger.addEventListener('click', function () {
    nav.classList.toggle('active');
})

function addItem() {
    if (inputTitle.value.length > 0 && inputContent.value.length > 0) {
        const getStorageList = JSON.parse(window.localStorage.getItem(storageItem));
        if (!getStorageList) {
            const list = []
            list.push({
                id: 1,
                title: inputTitle.value,
                content: inputContent.value,
                date: `${JSON.stringify(new Date().getDate()).padStart(2, 0)}/${JSON.stringify(new Date().getMonth() + 1).padStart(2, 0)}/${JSON.stringify(new Date().getFullYear())}`,
            })
            window.localStorage.setItem(storageItem, JSON.stringify(list))
        } else {
            const list = JSON.parse(window.localStorage.getItem(storageItem));
            list.push({
                id: list.length + 1,
                title: inputTitle.value,
                content: inputContent.value,
                date: `${JSON.stringify(new Date().getDate()).padStart(2, 0)}/${JSON.stringify(new Date().getMonth() + 1).padStart(2, 0)}/${JSON.stringify(new Date().getFullYear())}`,
            })
            window.localStorage.setItem(storageItem, JSON.stringify(list))
        }

        const getStorageList2 = JSON.parse(window.localStorage.getItem(storageItem));


        createItem(getStorageList2[getStorageList2.length - 1]);

        errTitle.classList.remove('show');
        errContent.classList.remove('show');
        inputTitle.value = '';
        inputContent.value = '';
    } else if (inputTitle.value.length > 0 && inputContent.value.length == 0) {
        errTitle.classList.remove('show');
        errContent.classList.add('show');
    } else if (inputTitle.value.length == 0 && inputContent.value.length > 0) {
        errTitle.classList.add('show');
        errContent.classList.remove('show');
    } else {
        errTitle.classList.add('show');
        errContent.classList.add('show');
    }
}

function createItem(item) {

    const div = document.createElement('div');
    div.classList.add('post-item');
    div.id = `post-${item.id}`

    const h1 = document.createElement('h1');
    h1.innerText = item.title;

    const h5 = document.createElement('h5');
    h5.innerText = item.date;

    const p = document.createElement('p');
    p.innerText = item.content;

    const button = document.createElement('button');
    button.classList.add('btn-delete')
    button.innerText = 'Apagar';
    button.value = `post-${item.id}`;

    button.addEventListener('click', function () {
        const deleteId = parseInt(this.value.split('-')[1]);
        const storageList = JSON.parse(window.localStorage.getItem(storageItem));
        const temp = storageList.filter((a) => a.id != deleteId)

        window.localStorage.setItem(storageItem, JSON.stringify(temp))

        postSection.innerText = '';

        if (!!temp || temp.length > 0) {
            temp.map((a) => {
                createItem(a)
            })
        }

    })

    div.append(h1);
    div.append(h5);
    div.append(p);
    div.append(button);

    postSection.append(div)
}



function search() {

}

window.onload = function () {
    const storageList = JSON.parse(window.localStorage.getItem(storageItem));
    postSection.innerText = '';

    if (!!storageList) {
        storageList.map((a) => {
            createItem(a)
        })
    }
}