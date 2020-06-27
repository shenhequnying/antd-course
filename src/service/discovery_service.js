import request from "../util/request";

export function queryList(){
    return request('http://127.0.0.1:5000/product_discovery_lists');
}

export function update(id, data){
    // console.log("我在service里，传过来的id值为:",id)
    // console.log("我在service里，传过来的form值为:",data)
    return request(`http://127.0.0.1:5000/product_discovery_single/${id}`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export function search(data){
    // console.log("我在service里，传过来的id值为:",id)
    const item_no = data.item_no
    // console.log("我在service里，传过来的form值为:",item_no)
    // console.log("")
    return request(`http://127.0.0.1:5000/product_discoveryfilter`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(item_no),
    });
}
