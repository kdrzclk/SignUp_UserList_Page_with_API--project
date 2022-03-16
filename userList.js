const tbody = document.getElementById("tbodyUserList"); // kullanıcı bilgilerini bunun içerisine vereceğiz.
const loading = document.getElementById("loading");

window.onload = () => {
  // alert("Your apiKey is: " + DecryptStringAES(localStorage.getItem("apiKey")));
  getApiUserList();
  setInterval(getApiUserList, 5000);
};

const getApiUserList = async () => {
  //   showLoading();

  //////  axios
  try {
    // const responseData = await axios("https://reqres.in/api/users?page=1");

    const responseData = await axios({
      url: "https://reqres.in/api/users?page=1",
      method: "get",
      //   data: bodyData,  --> get ile buna gerek yok, post kullansaydık veri göndermek için bunu yazmalıydık
    });

    //   console.log(responseData);
    const { data: userListArray } = responseData.data;
    console.log(userListArray);

    if (userListArray.length === 0) {
      alert("userList not found");
      removeLoading();
    } else {
      tbody.innerHTML = "";
      userListArray.forEach((customer) => {
        tbody.innerHTML += `
        <tr>
            <td>
                ${customer.id}
            </td>
            <td>
                <img src="${customer.avatar}">
            </td>
            <td>
                ${customer.email}
            </td>
            <td>
                ${customer.first_name}
            </td>
            <td>
                ${customer.last_name}
            </td>
      </tr>`;
      });
      removeLoading();
    }
  } catch (error) {
    alert(error);

    removeLoading();
  }
  removeLoading();
};
