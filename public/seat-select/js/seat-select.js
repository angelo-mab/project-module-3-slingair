const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');
const givenName = '';
const surname = "";
const email = "";
const seatSelect = '';

let selection = '';

const renderSeats = (data) => {
    console.log(data)
    document.querySelector('.form-container').style.display = 'block';

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s - 1]}`;
            const seat = document.createElement('li')
            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
            const seatAvailable =
                `<li>
                <label class="seat">
                    <input type="radio" name="seat" value="${seatNumber}" />
                        <span id="${seatNumber}" class="avail">${seatNumber}</span>
                </label>
            </li>`
            // seat.innerHTML = seatAvailable;
            // console.log(data.value);
            // const availability = data.find(chair => chair.id === seatNumber);
            let availability;
            for (let chair in data) {
                console.log(data[chair])
                if (chair.id === seatNumber) {
                    availability = data[chair]
                }
            }

            console.log("availability1: ", availability);
            if (availability.isAvailable) seat.innerHTML = seatAvailable;
            else seat.innerHTML = seatOccupied;

            row.appendChild(seat);
        }
    }

    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');
            document.getElementById('seat-number').innerText = `(${selection})`;
            confirmButton.disabled = false;
        }
    });
}


const toggleFormContent = (event) => {
    const flightNumber = flightInput.value;
    console.log('toggleFormContent: ', flightNumber);
    fetch(`/seat-select/${flightNumber}`)
        .then(res => res.json())
        .then(data => renderSeats(data))

    // TODO: contact the server to get the seating availability
    //      - only contact the server if the flight number is this format 'SA###'.
    //      - Do I need to create an error message if the number is not valid?

    // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
    renderSeats();
}

const handleConfirmSeat = (event) => {
    // TODO: everything in here!
    givenName = document.getElementById(givenName).value;
    console.log(givenName);
    // window.location.href=`localhost:8000/seat-select/confirmed.html/?seat=${}`
}

flightInput.addEventListener('blur', toggleFormContent);
confirmButton.addEventListener('blur', handleConfirmSeat);