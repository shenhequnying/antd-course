const random_cards = [
    {
        id: 1,
        title: 'What is the object oriented way to get wealthy ?',
        name: 'Inheritance',
        url: 'www.baidu.com'
    },
    {
        id: 2,
        title: 'To understand what recursion is...',
        name: "You must",
        url: 'www.sina.com'
    },
    {
        id: 3,
        title: 'What do you call a factory that sells passable products?',
        name: 'A satisfactory',
        url: 'www.sohu.com'
    },
];

let random_cards_call_count = 0;

export default {
    'get /dev/random_card': function (req, res) {
        const responseObj = random_cards[random_cards_call_count % random_cards.length];
        random_cards_call_count += 1;
        setTimeout(() => {
            res.json(responseObj);
        }, 500);
    },
};