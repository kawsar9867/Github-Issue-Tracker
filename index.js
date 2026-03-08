// Login function
function login() {
  let user = document.getElementById("userID").value;
  let pass = document.getElementById("password").value;

  let correctUser = "admin";
  let currectPass = "admin123";

  if (user === correctUser && pass === currectPass) {
    window.location.href = "home.html";
    alert("Login Successful");
  } else {
    alert("User ID or Password Incorrect");
  }
}

// Show-Modal-Card
const loadCardInfo = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const info = await res.json();
  displayCardInfo(info.data)
};
const displayCardInfo = (data) =>{
  console.log(data);
  const cardBox = document.getElementById("details-container");

// Modal date & Time
function formatDate(createdAt) {
      const date = new Date(createdAt);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    }

  // Modal label status function
 const labelButtons = data.labels
  ?.map((label) => {
    let colorClass = "bg-gray-200 text-gray-700";

    if (label.toLowerCase() === "bug")
      colorClass = "bg-red-200 text-red-500";
    else if (label.toLowerCase() === "help wanted")
      colorClass = "bg-yellow-200 text-yellow-600";
    else if (label.toLowerCase() === "enhancement")
      colorClass = "bg-green-200 text-green-600";

    return `<button class="rounded-full px-2 border-l border-r ${colorClass}">${label}</button>`;
  })
  .join(" ");


  // Modal-Priority-Color
  const priorityColor =
    data.priority === "high"
      ? "text-red-500"
      : data.priority === "medium"
      ? "text-yellow-500"
      : "text-green-500";

  cardBox.innerHTML=` <div>
    <h1 class="font-semibold text-[18px]">${data.title}</h1>

    <div class="text-[#64748B] mt-2">
      <span class="bg-[#00A96E] text-white px-2 rounded-full">Opened</span>
      <span>• Opened by ${data.author} • <span>${formatDate(data.createdAt)}</span></span>
    </div>

    <div class="mt-3 mb-2 flex gap-2">
      ${labelButtons}
    </div>

    <div>
      <p>${data.description}</p>
    </div>

    <div class="flex justify-between">
    <div class="flex mt-2">
      <p class="text-black font-semibold"><span class="text-gray-400">Assignee:</span>  ${data.assignee ? data.assignee: data.author}</p>
      </div>
      <div class="mt-2 font-semibold text-gray-400">
      <span>Priority-</span>
      <button class="rounded-full px-2 ${priorityColor} border-t border-b">
        ${data.priority}
      </button>
    </div>
  </div>`;
  document.getElementById("my_modal_5").showModal();
}

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((res) => res.json())
  .then((data) => cardContainer(data.data));

function cardContainer(values) {
  const container = document.getElementById("card-container");
  values.forEach((value) => {
    // status-bar-color
    let borderColor;
    if (value.status === "open") borderColor = "border-[#00A96E]";
    else borderColor = "border-[#A855F7]";

    // status-button-icon
    let statusIcon;
    if (value.status === "open") statusIcon = "assets/Status.png";
    else statusIcon = "assets/Status (1).png";

    // Priority-Color-change
    let priorityColor;
    if (value.priority === "high") priorityColor = "bg-red-200 text-red-600";
    else if (value.priority === "medium")
      priorityColor = "bg-yellow-200 text-yellow-600";
    else if (value.priority === "low")
      priorityColor = "bg-gray-300 text-[9CA3AF]";

    // label-color correction & devided label
    const labelButtons = value.labels
      .map((label) => {
        let colorClass = "bg-gray-200 text-gray-700";
        if (label.toLowerCase() === "bug")
          colorClass = "bg-red-200 text-red-500 ";
        else if (label.toLowerCase() === "help wanted")
          colorClass = "bg-yellow-200 text-yellow-600";
        else if (label.toLowerCase() === "enhancement")
          colorClass = "bg-green-200 text-green-600";

        return `<button class="rounded-full px-2 border-l border-r ${colorClass}">${label}</button>`;
      })
      .join(" ");

    // Date Update Function
    function formatDate(createdAt) {
      const date = new Date(createdAt);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    }

    const card = document.createElement("div");
    card.innerHTML = `
     <div onclick="loadCardInfo(${value.id})" class=" h-[330px] rounded-md mt-7 bg-white p-4 shadow-sm rounded-lg shadow border-t-4 ${borderColor} w-10/12 mx-auto">
    
  <div class=" flex justify-between ">
    <img class=" rounded-full" src="${statusIcon}" alt="">
    <button class="rounded-full  px-2 ${priorityColor} border-t border-b">${value.priority}</button>
  </div>
  <div class="mt-3">
    <h1 class="font-semibold text-[18px]">${value.title}</h1>
    <p class="text-sm text-gray-500 mt-1">${value.description}</p>
    <div class="mt-3">
  
    <div class="mt-3 flex gap-2">
          ${labelButtons}
        </div>
    </div>
  </div>
   <div class="divider divider-start -mx-3"></div>
  <div class="flex justify-between">
  <p class="text-[#64748B]"><span class="text-gray-800">Author:</span> ${value.author}</p>
  
  </div>
  
  <p>Date: ${formatDate(value.createdAt)}</p>
  </div>
  

    `;
    container.appendChild(card);
  });
}

// Filter-Buttons
const displayFilter = (buttons) => {
  const filterButtons = document.getElementById("filter-buttons");
  filterButtons.innerHTML = "";
  for (let button of buttons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    
    `;
  }
};
