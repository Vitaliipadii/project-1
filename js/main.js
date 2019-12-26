
let data = {
    title: 'Netflix раскрыл данные просмотров фильма «Ирландец»',
    preview: 'Более 26 млн просмотров за первые семь дней с момента релиза.',
    image: 'https://rozetked.me/images/uploads/N0NzEdYtGEFq.jpg',
    date: 'Web Dec 14 2019 20:37:34 GMT+0200',
    tags: ['кино', 'Netflix'],
}

let dataArray = [
    {
        title: 'В новой подборке апдейтов приложений недели: большое обновление Chrome для мобильных операционных систем, возможность инициировать и принимать звонки со смартфона на компьютере с Windows 10, а также новая навигация в приложении «Google Карты».',
        preview: 'Более 10 млн просмотров за первые семь дней с момента релиза.',
        image: 'https://rozetked.me/images/uploads/pXCC2nnKm5nd.jpg',
        date: 'Web Dec 01 2019 20:37:34 GMT+0200',
        tags: ['maps', 'maps']
    },
    {
        title: 'Бренд чипсов Pringles и компания Cartoon Network выпустят чипсы со вкусом «Огурчика Рика» — шуточного персонажа анимационного сериала «Рик и Морти». Об этом Pringles написала в своём аккаунте в Twitter.',
        preview: 'Более 26 млн просмотров за первые семь дней с момента релиза.',
        image: 'https://rozetked.me/images/uploads/Nbivaro9wIlh.jpg',
        date: 'Web Dec 08 2019 20:37:34 GMT+0200',
        tags: ['chips']
    },
    {
        title: 'Из машины менеджера Facebook украли жёсткие диски с личными данными сотрудников',
        preview: 'Более 26 млн просмотров за первые семь дней с момента релиза.',
        image: 'https://rozetked.me/images/uploads/AzY1LFLvG2WV.jpg',
        date: 'Web Dec 12 2019 20:37:34 GMT+0200',
        tags: ['facebook']
    },
    {
        title: 'Canalys: рынок носимых устройств вырос на 65% в третьем квартале года',
        preview: 'Более 26 млн просмотров за первые семь дней с момента релиза.',
        image: 'https://rozetked.me/images/uploads/gOVNfzPrUGqV.jpg',
        date: 'Web Dec 14 2019 20:37:34 GMT+0200',
        tags: ['gadjets']
    },
    {
        title: 'Смартфон Oppo Reno 3 5G с номером модели PDCM00 появился в базе китайского регулятора TENAA. Благодаря этому стали известны характеристики и дизайн устройства.',
        preview: 'Более 24 млн просмотров за первые семь дней с момента релиза.',
        image: 'https://rozetked.me/images/uploads/qkNLRQvlnmTS.jpg',
        date: 'Web Dec 03 2019 20:37:34 GMT+0200',
        tags: ['telephone']
    },
    {
        title: 'В честь нового года в игре World of Tanks стартует крупнейшее внутриигровое событие «Новогоднее наступление 2020». Ивент стартовал 13 декабря в 9:00 по МСК и будет длиться до 9:00 14 января 2020 года.',
        preview: 'Более 30 млн просмотров за первые семь дней с момента релиза.',
        image: 'https://rozetked.me/images/uploads/8LFd3YIVD8g6.jpg',
        date: 'Web Dec 11 2019 20:37:34 GMT+0200',
        tags: ['game']
    },
];


class NewsItem {
    constructor(data) {
        this.title = data.title;
        this.preview = data.preview;
        this.image = data.image;
        this.date = data.date;
        this.tags = data.tags;
        this.index = data.index || '';
    }

    print() {
        let result = ``;
        result += `<div class="grid__cell"><div class="block-news">`;
        result += `<div class="block-news__image"style="background-image: url('${this.image}');"></div>`;
        result += `<div class="block-news__caption">${this.title}</div>`;
        result += `<div class="block-news__preview">${this.preview}</div>`;


        let date;
        if (moment(this.date).diff(moment()) < 0) {
            if (moment(this.date).diff(moment()) < -60 * 60 * 24 * 1000 * 7) {
                date = moment(this.date).format('LL');
            } else {
                date = moment(this.date).fromNow('LL');
            }
        } else {
            date = moment(this.date).format('LL');
        }



        result += `<div class="block-news__like block-news__like--active" onclick="addLike(this)"><i class="far fa-heart"></i> <span>0</span></div>`;
        result += `<div class="block-news__data">${date}</div>`;


        if (this.tags.length) {
            result += `<div class="block-nems__tags">`;

            for (let tag of this.tags) {
                result += `<span class="block-news__tag-item">${tag}</span>`
            }
            result += `</div>`
        }

        result += `<div class="block-news__remove" onclick="removeNews(${this.index})">X</div>`;

        result += `</div></div>`
        document.getElementById('data').innerHTML += result;
    }
}

let newsElement = new NewsItem(data);
newsElement.print()






class NewsList {
    constructor(_list) {
        this.list = _list;
    }
    get count() {
        return this.list.length;
    }
    set addNews(data) {
        this.list = this.list.concat(data);
    }
    set removeNews(index) {
        this.list.splice(index, 1);
    }
    set searchByTag(str) {
        let result = [];
        for (let item of this.list) {
            if (item.tags.length) {
                for (let tag of item.tags) {
                    if (str === tag) {
                        result.push(item);

                    }
                }
            }
        }
        newsElements.clearData();
        if (result.length && str !== '') {
            let serchResults = new NewsList(result);
            serchResults.print();
        } else {
            if (str === '') {
                this.print();
            }
        }
    }

    print() {
        for (let item of this.list) {

            let newsItem = new NewsItem(item);
            newsItem.index = this.list.indexOf(item);
            newsItem.print();
        }
    }
    sortByDate(direction) {
        this.list.sort((a, b) => {
            if (direction === 'asc') {
                return moment(b.date) - moment(a.date);
            } else {
                return moment(a.date) - moment(b.date);
            }

        });
    }
    clearData() {
        document.getElementById('data').innerHTML = '';
    }
}
let newsElements = new NewsList(dataArray);
newsElements.print();


sort = (direction) => {
    newsElements.clearData();
    newsElements.sortByDate(direction);
    newsElements.print();
}

addNews = () => {
    document.querySelector('.js-modal-add-news').style.display = 'block';
}

btnCancel = () => {
    document.querySelector('.js-modal-add-news').style.display = 'none';
}

sendData = (form) => {
    const newsTitle = form.querySelector("[name = 'title']").value;
    const newsPreview = form.querySelector("[name = 'preview']").value;
    const newsImage = form.querySelector("[name = 'image']").value;
    const newsTags = form.querySelector("[name = 'tags']").value;

    const newsData = {
        title: newsTitle,
        preview: newsPreview,
        image: newsImage == '' ? 'images/6.jpg' : newsImage,
        date: moment(),
        tags: newsTags == '' ? [] : newsTags.split(','),
    }
    newsElements.addNews = newsData;
    newsElements.clearData();
    newsElements.print();
}




removeNews = (index) => {
    const allow = confirm('A you sure to delete this');
    if (allow) {
        newsElements.removeNews = index;
        newsElements.clearData();
        newsElements.print();
    }

}


searchByTag = (element) => {
    newsElements.searchByTag = element.value;
}



document.body.addEventListener('click', (event) => {
    const blockFilter = document.querySelector('.js-filter');
    let target = event.target;
    let buttonElement = target.closest('.js-filter-toggle');
    if (!target.classList.contains('js-filter-toggle') && !buttonElement) {
        if (!blockFilter.classList.contains('filter--hidden')) {
            if (!event.target.classList.contains('js-filter-toggle')) {
                blockFilter.classList.add('filter--hidden');
                if (!target.classList.contains('.js-filter') && target.classList.contains('pole-vvoda')) {
                    blockFilter.classList.remove('filter--hidden');
                }
            }
        }
    }
});

// Домашка сделать проверку что б не закрывалась менюха при вводе
// чтоб не реагировало на содержимое фильтра




filterToggle = () => {
    const blockFilter = document.querySelector('.js-filter');
    blockFilter.classList.toggle('filter--hidden');
}

togglePages = (page, link) => {
    const list = document.querySelectorAll('.js-menu-item');
    for (let item of list) {
        item.classList.remove('menu__item--active')
    }
    link.classList.add('menu__item--active');

    document.querySelector('.js-content-news').style.display = 'none';
    document.querySelector('.js-content-about-us').style.display = 'none';
    document.querySelector('.js-content-contacts').style.display = 'none';
    document.querySelector('.js-content-' + page).style.display = 'block';
}



// document.body.addEventListener('contextmenu', (event) => {
//     event.preventDefault();
// });

document.body.addEventListener('keydown', (e) => {
    e = e || window.event;
    let key = e.which || e.keyCode; // keyCode detection
    let ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false); // ctrl detection

    // if (key == 86 && ctrl) {
    //     console.log("Ctrl + V Pressed !");
    // } else if (key == 67 && ctrl) {
    //     console.log("Ctrl + C Pressed !");
    // }

    if (key == 70 && ctrl) {
        const filterInput = document.querySelector('.js-filter').querySelector('input');
        filterToggle();
        filterInput.focus();
        e.preventDefault();
    }

});


addLike = (element) => {
    let block = element.childNodes[element.childNodes.length - 1];
    let count = +block.innerHTML;
    block.innerHTML = ++count;
    element.classList.add('.block-news__like--active');
    element.childNodes[0].classList.remove('far');
    element.childNodes[0].classList.add('fas');
}