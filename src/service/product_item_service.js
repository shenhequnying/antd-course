import request from "../util/request";

export function queryList() {
  return request("http://127.0.0.1:5000/student_qr_code_list");
  // return request("http://172.16.109.99:5000/product_discoveryfilter");
}

export function update(id, data) {
  // console.log("我在service里，传过来的id值为:",id)
  // console.log("我在service里，传过来的form值为:",data)
  return request(`http://127.0.0.1:5000/student_qr_code_single/${id}`, {
    // return request(`http://172.16.109.99:5000/product_discovery_single/${id}`, {
    headers: {
      "content-type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function search(data) {
  // console.log("我在service里，传过来的id值为:",id)
  const item_no = data.item_no;
  console.log("我在service里，传过来的form值为:", item_no);
  // console.log("")
  // return request(`http://172.16.109.99:5000/product_discoveryfilter`, {
  return request(`http://127.0.0.1:5000/student_qr_code_filter`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(item_no),
  });
}

// export function addOne(data) {
//   //   console.log("我被调用了？----");
//   return request(`http://127.0.0.1:5000/product_discovery_single_add`, {
//     headers: {
//       "content-type": "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }
