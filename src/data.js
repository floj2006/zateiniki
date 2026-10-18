// ============================================================
//  ВЕСЬ КОНТЕНТ САЙТА — В ЭТОМ ФАЙЛЕ.
//  Данные взяты из групп ВК команды (октябрь 2026).
//  Цены и программы меняются — сверяй с «Товарами» и «Услугами» в ВК.
// ============================================================

export const brand = {
  name: 'Затейники',
  city: 'Великий Новгород',
  phone: '55-38-60',
  phoneFull: '+7 (8162) 55-38-60',
  phoneHref: 'tel:+78162553860',
  managers: [
    { name: 'Ольга', phone: '+7 (902) 284-06-28', href: 'tel:+79022840628' },
    { name: 'Мария', phone: '+7 (908) 226-09-20', href: 'tel:+79082260920' },
  ],
  venues: [
    { name: 'Loft Z', address: 'ул. Северная, 2' },
    { name: 'Квест-пространство «Под замком»', address: 'ул. Рахманинова, 10' },
  ],
  hours: 'С 10:00, по предварительной записи',
  vkWrite: 'https://vk.me/zateynikivn', // куда уходит заявка, если сервер не настроен
}

// Четыре направления команды (ссылки — реальные группы ВК)
export const directions = [
  {
    id: 'zateyniki',
    title: 'Затейники',
    tag: 'Организация праздников',
    text: 'Больше 14 лет делаем праздники в Великом Новгороде: дни рождения, выпускные, новогодние ёлки, корпоративы, ток-шоу и тимбилдинги. Авторские квесты для детей и подростков.',
    points: ['Дни рождения и выпускные', 'Новогодние ёлки для классов', 'Праздники на природе и корпоративы'],
    vk: 'https://vk.ru/zateynikivn',
    color: 'orange',
    icon: 'confetti',
    photo: '/photos/dir-zateyniki.webp',
  },
  {
    id: 'loft',
    title: 'Loft Z',
    tag: 'Пространство на Северной, 2',
    text: 'Зал полностью бронируется и закрывается под вас. Ведущие, квест или шоу-программа, дискотека — и всё это без посторонних.',
    points: ['День рождения — от 21 500 ₽', 'Квесты от 4+ до 8+', 'Вечеринки для взрослых'],
    vk: 'https://vk.ru/loftzvn',
    color: 'graphite',
    icon: 'disco-ball',
    photo: '/photos/dir-loft.webp',
  },
  {
    id: 'quest',
    title: '«Под замком»',
    tag: 'Квест-пространство, Рахманинова, 10',
    text: '170 м², пять тематических локаций и банкетный зал. Пока дети проходят квест, родители смотрят за ними по камерам из зала.',
    points: ['День рождения 2,5 ч — от 19 500 ₽', 'Doors, ОНО, Ночь в музее и другие', '3 фотозоны и неоновая дискотека'],
    vk: 'https://vk.ru/kvestzonevn',
    color: 'lime',
    icon: 'lock-key',
    photo: '/photos/dir-quest.webp',
  },
  {
    id: 'surprise',
    title: 'Сюрприз на праздник',
    tag: 'Ростовые куклы и «звёзды»',
    text: 'Артур Пирожков, Стас Михайлов, Ирина Аллегрова — или Мишка Тедди и Пони Единорожка. Приезжают в кафе, домой или на дачу, танцуют и фотографируются с гостями.',
    points: ['Поздравление от 3 500 ₽', '10–15 минут чистого «вау»', 'Шары и букет — по желанию'],
    vk: 'https://vk.ru/surprisenaprazdnik',
    color: 'gold',
    icon: 'star',
    photo: '/photos/dir-surprise.webp',
  },
]

// Дополнительные группы команды — показываются в контактах
export const moreLinks = [
  { title: 'Праздник на природе', vk: 'https://vk.ru/zelenoparkvn' },
  { title: 'Корпоративы и тимбилдинг', vk: 'https://vk.ru/zateynikievent' },
]

// Площадки для конструктора и каталога
export const venues = {
  loft: 'Loft Z',
  lock: '«Под замком»',
  out: 'Выезд',
}

// Каталог программ. group — для фильтра: kids (до 7), teen (8+), adult, surprise
export const programs = [
  { title: 'Doors', venue: 'lock', group: 'teen', age: [8, 16], price: 19500, kind: 'Квест', icon: 'door-open', color: 'graphite', text: 'Найти ключи и открыть все двери за 60 минут: библиотека, канализация, клетка, туннель.' },
  { title: 'ОНО', venue: 'lock', group: 'teen', age: [8, 16], price: 19500, kind: 'Хоррор-квест', icon: 'balloon', color: 'orange', text: 'Страшновесело: для тех, кто не боится красных шариков.' },
  { title: 'Ночь в музее', venue: 'lock', group: 'teen', age: [8, 16], price: 19500, kind: 'Квест-приключение', icon: 'bank', color: 'gold', text: 'Путешествие по залам музея, где экспонаты оживают ночью.' },
  { title: 'Тайна Форта', venue: 'lock', group: 'teen', age: [8, 16], price: 20500, kind: 'Квест', icon: 'castle-turret', color: 'lime', text: 'Испытания в духе «Форт Боярд»: ловкость, смекалка и ключи.' },
  { title: 'Логово', venue: 'lock', group: 'teen', age: [8, 16], price: 19500, kind: 'Квест-экшн', icon: 'paw-print', color: 'graphite', text: 'Новинка: динамичный экшн по локациям квест-пространства.' },
  { title: 'Бабка Гренни', venue: 'lock', group: 'teen', age: [8, 16], price: 19500, kind: 'Хоррор-квест', icon: 'eye', color: 'orange', text: '«Cats House»: выбраться из дома, пока бабка не проснулась.' },
  { title: 'Заброшенный дом', venue: 'lock', group: 'teen', age: [8, 16], price: 19500, kind: 'Квест-экшн', icon: 'ghost', color: 'gold', text: 'Скрипящие двери, тайники и загадки старого дома.' },
  { title: 'Очень странные дела', venue: 'loft', group: 'teen', age: [8, 16], price: 21500, kind: 'Квест', icon: 'flying-saucer', color: 'graphite', text: 'Изнанка, Демогоргон и команда друзей из Хоукинса.' },
  { title: 'Game Over', venue: 'loft', group: 'teen', age: [8, 16], price: 21500, kind: 'Квест', icon: 'game-controller', color: 'lime', text: 'Игроки попадают внутрь видеоигры — нужно пройти все уровни.' },
  { title: 'Куб', venue: 'loft', group: 'teen', age: [8, 16], price: 21500, kind: 'Квест', icon: 'cube', color: 'gold', text: 'Командная головоломка, из которой не выйти поодиночке.' },
  { title: 'Колесо фортуны', venue: 'loft', group: 'teen', age: [8, 16], price: 21500, kind: 'Шоу-программа', icon: 'microphone-stage', color: 'orange', text: 'Шоу с ведущим, раундами и призами, как на ТВ.' },
  { title: 'ТрендоМания', venue: 'loft', group: 'teen', age: [7, 14], price: 21500, kind: 'Программа', icon: 'device-mobile', color: 'lime', text: 'Все тренды из соцсетей в одной программе: челленджи и батлы.' },
  { title: 'Супергеройский бум', venue: 'loft', group: 'kids', age: [5, 9], price: 21500, kind: 'Квест', icon: 'lightning', color: 'orange', text: 'Активный квест для юных супергероев от 5 лет.' },
  { title: 'КотоКвест', venue: 'loft', group: 'kids', age: [6, 10], price: 21500, kind: 'Квест', icon: 'cat', color: 'gold', text: 'Спасаем пушистиков! Для девочек и мальчиков от 6 лет.' },
  { title: 'МультКвест', venue: 'loft', group: 'kids', age: [4, 7], price: 21500, kind: 'Квест', icon: 'smiley-wink', color: 'lime', text: 'Любимые мультгерои и задания для самых маленьких.' },
  { title: 'Сладкая вечеринка', venue: 'loft', group: 'kids', age: [4, 8], price: 21500, kind: 'Программа', icon: 'ice-cream', color: 'orange', text: 'Конфетная вечеринка с играми, дискотекой и сладостями.' },
  { title: 'ДР «ХАЙП»', venue: 'loft', group: 'teen', age: [10, 16], price: 35500, kind: 'Премиум', icon: 'crown', color: 'graphite', text: 'Максимальная версия дня рождения в Loft Z.' },
  { title: 'Прожарка', venue: 'loft', group: 'adult', age: [18, 99], price: 19500, kind: 'Для взрослых', icon: 'fire', color: 'orange', text: 'Игра-шоу для взрослой компании: шутки, раунды, смех.' },
  { title: 'СОТКА', venue: 'loft', group: 'adult', age: [18, 99], price: 19500, kind: 'Для взрослых', icon: 'list-numbers', color: 'gold', text: 'Командная игра «100 к 1» для друзей и коллег.' },
  { title: 'Вечеринка 90-х', venue: 'loft', group: 'adult', age: [18, 99], price: 19500, kind: 'Для взрослых', icon: 'cassette-tape', color: 'lime', text: 'Музыка, конкурсы и дресс-код лихих девяностых.' },
  { title: 'Ростовая кукла', venue: 'out', group: 'surprise', age: [1, 99], price: 3500, kind: 'Сюрприз', icon: 'mask-happy', color: 'gold', text: 'Мишка Тедди, Зайка Печенька, Пони Единорожка, Кошечка Лили, Собачка Фиона.' },
  { title: 'Поздравление «звезды»', venue: 'out', group: 'surprise', age: [1, 99], price: 3500, kind: 'Сюрприз', icon: 'shooting-star', color: 'orange', text: 'Пирожков, Михайлов, Аллегрова, Лазарев, Жуков — танцы и фото с гостями.' },
  { title: 'Живые статуи', venue: 'out', group: 'surprise', age: [1, 99], price: 5500, kind: 'Шоу', icon: 'person-simple-tai-chi', color: 'graphite', text: 'Эффектное шоу для юбилеев, свадеб и открытий.' },
]

// Конструктор: формат праздника определяет, как считается цена
//   price — фиксированная цена за праздник
//   perPerson — цена за человека (умножается на число гостей)
//   venue — если указано, в шаге «Программа» показываются программы этой площадки
export const calc = {
  occasions: [
    { id: 'bday', label: 'День рождения' },
    { id: 'grad', label: 'Выпускной' },
    { id: 'ny', label: 'Новый год' },
    { id: 'adult', label: 'Для взрослых' },
    { id: 'surprise', label: 'Сюрприз-поздравление' },
  ],
  formats: [
    { id: 'loft', occ: 'bday', label: 'В Loft Z', hint: 'Северная, 2 · зал под вас', venue: 'loft' },
    { id: 'lock', occ: 'bday', label: 'В «Под замком»', hint: 'Рахманинова, 10 · 2,5 ч · 8+', venue: 'lock' },
    { id: 'kg', occ: 'bday', label: 'В детском саду', hint: 'выездной праздник', price: 8500 },
    { id: 'grad-kg', occ: 'grad', label: 'Детский сад', hint: '2 500 ₽ / чел', perPerson: 2500 },
    { id: 'grad-school', occ: 'grad', label: 'Начальная школа', hint: '2 500 ₽ / чел', perPerson: 2500 },
    { id: 'grad-nature', occ: 'grad', label: 'На природе', hint: '2 500 ₽ / чел', perPerson: 2500 },
    { id: 'ny-class', occ: 'ny', label: 'Только для своего класса', hint: '1,5 ч · от 20 чел · 1 500 ₽ / чел', perPerson: 1500 },
    { id: 'ny-quest', occ: 'ny', label: 'Новогодний квест', hint: '«Миссия невыполнима» · 1 500 ₽ / чел', perPerson: 1500 },
    { id: 'ny-max', occ: 'ny', label: 'Ёлка в клубе MAX', hint: 'Германа, 23 · 2 ч · 1 500 ₽ / чел', perPerson: 1500 },
    { id: 'adult-loft', occ: 'adult', label: 'Вечеринка в Loft Z', hint: 'Прожарка, СОТКА, 90-е', venue: 'loft', groups: ['adult'] },
    { id: 'doll', occ: 'surprise', label: 'Ростовая кукла / «звезда»', hint: '10–15 мин · по городу', price: 3500 },
    { id: 'statues', occ: 'surprise', label: 'Живые статуи', hint: 'шоу', price: 5500 },
  ],
  extras: [
    { id: 'doll', label: 'Ростовая кукла', price: 3500 },
    { id: 'balloons10', label: 'Гелиевые шары, 10 шт', price: 1500 },
    { id: 'balloons15', label: 'Гелиевые шары, 15 шт', price: 2000 },
    { id: 'bouquet', label: 'Букет', price: 2000, from: true },
    { id: 'statues', label: 'Живые статуи', price: 5500 },
  ],
}

export const steps = [
  { title: 'Заявка', text: 'Звоните 55-38-60, пишите в ВК или оставьте номер на сайте.' },
  { title: 'Сценарий', text: 'Подбираем площадку и программу под возраст и интересы гостей.' },
  { title: 'Бронь', text: 'Фиксируем дату и время. Пришлём стилизованные электронные пригласительные.' },
  { title: 'Праздник', text: 'Встречаем гостей, ведём программу, выносим торт под музыку и софиты.' },
]

export const stats = [
  { value: 14, suffix: '+', label: 'лет делаем праздники' },
  { value: 10, suffix: 'K+', label: 'подписчиков в ВК' },
  { value: 3, suffix: '', label: 'своих площадки' },
  { value: 20, suffix: '+', label: 'авторских квестов и программ' },
]

// Фото с реальных праздников (из групп ВК)
export const gallery = [
  { src: '/photos/g-01.webp', caption: 'Неоновая дискотека' },
  { src: '/photos/g-02.webp', caption: 'Кошечка Лили' },
  { src: '/photos/g-03.webp', caption: 'Квест в «Под замком»' },
  { src: '/photos/g-04.webp', caption: 'Зайка Печенька на юбилее' },
  { src: '/photos/g-05.webp', caption: 'Локации квестов' },
  { src: '/photos/g-06.webp', caption: 'Праздник на природе' },
  { src: '/photos/g-07.webp', caption: 'Вечеринка в Loft' },
  { src: '/photos/g-08.webp', caption: 'Сюрприз имениннице' },
  { src: '/photos/g-09.webp', caption: '«Звезда» на дне рождения' },
  { src: '/photos/g-10.webp', caption: 'Прятки в темноте' },
  { src: '/photos/g-11.webp', caption: 'Эмоции, ради которых всё' },
  { src: '/photos/g-12.webp', caption: 'Новогодний праздник' },
]

export const faq = [
  { q: 'Сколько длится день рождения?', a: 'В квест-пространстве «Под замком» — 2,5–3 часа: встреча гостей, квест, дискотека, вручение подарков и вынос торта. Новогодние праздники для класса — 1,5 часа, ёлки в клубе MAX — 2 часа.' },
  { q: 'Будут ли на празднике посторонние?', a: 'Нет. Loft Z и «Под замком» полностью бронируются и закрываются под ваше мероприятие.' },
  { q: 'Что делают родители, пока дети на квесте?', a: 'Отдыхают в банкетном зале: кофейный столик с чаем и кофе, кулер с водой. В каждой локации «Под замком» есть камеры — можно смотреть, как ребята проходят квест.' },
  { q: 'Можно ли со своим тортом?', a: 'Конечно. Мы устроим торжественный вынос торта под волшебную музыку и софиты.' },
  { q: 'Как устроен Новый год только для своего класса?', a: 'Класс от 20 человек, 1 500 ₽ за ребёнка, 3–4 сопровождающих родителя — бесплатно. В программе квест или шоу, челленджи, дискотека, Дед Мороз и сладкое угощение.' },
  { q: 'Куда приезжают ростовые куклы?', a: 'В кафе, ресторан, домой, на дачу. Поздравление длится 10–15 минут. Цена действует по городу, выезд за город оговаривается отдельно. Шары и букет можно заказать вместе с артистом.' },
]
