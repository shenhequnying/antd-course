const random_cards = [
    {
        id: 1,
        name: 'What is the object oriented way to get wealthy ?',
        desc: 'Inheritance',
        url: 'www.baidu.com'
    },
    {
        id: 2,
        name: 'To understand what recursion is...',
        desc: "You must",
        url: 'www.sina.com'
    },
    {
        id: 3,
        name: 'What do you call a factory that sells passable products?',
        desc: 'A satisfactory',
        url: 'www.sohu.com'
    },
];

let random_cards_call_count = 0;

export default {
    'get /dev/random_card': function (req, res){
        setTimeout(()=> {
            res.json({
                result: random_cards,
            }, 250)
        })
    },
    'post /dev/random_card_add': function (req, res){
        data = [ ...random_cards, {
            ...req.body,
            id: random_cards[random_cards.length - 1].id + 1,
        }];
        res.json({
            success: true,
        });
    },
    // 'get /dev/random_card': function (req, res) {
    //     const responseObj = random_cards[random_cards_call_count % random_cards.length];
    //     random_cards_call_count += 1;
    //     setTimeout(() => {
    //         res.json(responseObj);
    //     }, 500);
    // },
};