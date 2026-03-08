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
     <div class=" h-[330px] rounded-md mt-7 bg-white p-4 shadow-sm rounded-lg shadow border-t-4 ${borderColor} w-10/12 mx-auto">
    
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
