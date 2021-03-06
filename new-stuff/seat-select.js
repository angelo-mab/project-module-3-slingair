
const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");
const username = "";
const surname = "";
const email = "";
const seatSelect = "";

let selection = "";

const renderSeats = data => {
 //console.log(data)
 document.querySelector(".form-container").style.display = "block";
 let availability = [];
 //console.log(data);
 for (let chair in data) {
  //console.log(chair);
  if (data[chair].isAvailable == true) {
   availability.push(data[chair].id);
  }
 }
 //console.log(availability);
 const alpha = ["A", "B", "C", "D", "E", "F"];

 // for (let r = 1; r < 11; r++) {
 //   const row = document.createElement("ol");
 //   row.classList.add("row");
 //   row.classList.add("fuselage");
 //   seatsDiv.appendChild(row);
 //   for (let s = 1; s < 7; s++) {
 //     const seatNumber = `${r}${alpha[s - 1]}`;
 //       const seat = document.createElement("li");
 //       const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
 //       const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;
 //       seat.innerHTML = seatAvailable;
 //       row.appendChild(seat);
 //     }
 //  }
 for (let r = 1; r < 11; r++) {
  const row = document.createElement("ol");
  row.classList.add("row");
  row.classList.add("fuselage");
  seatsDiv.appendChild(row);
  for (let s = 1; s < 7; s++) {
   const seatNumber = `${r}${alpha[s - 1]}`;
   const seat = document.createElement("li");
   const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
   const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;
   seat.innerHTML = availability.includes(seatNumber)
    ? seatAvailable
    : seatOccupied;
   row.appendChild(seat);
   //console.log("Row: ", row);
  }
 }

 let seatMap = document.forms["seats"].elements["seat"];
 console.log("document.forms[seats]******: ", document.forms["seats"]);
 seatMap.forEach(seat => {
  seat.onclick = () => {
   selection = seat.value;
   seatMap.forEach(x => {
    if (x.value !== seat.value) {
     document.getElementById(x.value).classList.remove("selected");
    }
   });
   document.getElementById(seat.value).classList.add("selected");
   document.getElementById("seat-number").innerText = `(${selection})`;
   confirmButton.disabled = false;
  };
 });
};

const toggleFormContent = event => {
 const flightNumber = flightInput.value;
 console.log("toggleFormContent: ", flightNumber);
 fetch(`/seat-select/${flightNumber}`)
  .then(res => res.json())
  .then(data => renderSeats(data));

 // TODO: contact the server to get the seating availability
 //      - only contact the server if the flight number is this format 'SA###'.
 //      - Do I need to create an error message if the number is not valid?

 // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
 //renderSeats(); Removed since you are rendering seats in your fetch
};

const handleConfirmSeat = event => {
 event.preventDefault();
 //let chosenseat = event.target.elements.chosenseat.value;
 username = event.target.elements.givenName.value;
 surname = event.target.elements.surname.value;
 email = event.target.elements.email.value;

 console.log("*********************************EVENT");
 console.log(event.target.elements);
 console.log(event.target.elements.givenName.value);
 console.log(event.target.elements.surname.value);
 console.log(event.target.elements.email.value);
 let userInfo = {
  username: username,
  surname: surname,
  email: email
 };

 fetch(`/seat-select/confirmed`, {
  method: "POST",
  body: JSON.stringify(userInfo),
  headers: new Headers({
   'Content-Type': 'application/json'
  })
 })
  .then(res => res.json())
  .then(confirmation => {
   console.log(data);
   window.location.href = `localhost:8000/seat-select/confirmed.html/?username=${username}`;
  });
};

flightInput.addEventListener("blur", toggleFormContent);
confirmButton.addEventListener("blur", handleConfirmSeat);