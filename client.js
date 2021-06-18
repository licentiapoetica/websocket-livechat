const connection = new WebSocket("wss://<server_here>");
const button = document.querySelector("#send");

connection.onopen = (event) => {
    console.log("WebSocket is open now.");
};

connection.onclose = (event) => {
    console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
  // append received message from the server to the DOM element 
  const chat = document.querySelector("#chat");
  chat.innerHTML += event.data;
  chat.scrollTo(0, 99999999);
};

/* button.addEventListener("click", () => {
  const name = document.querySelector("#name");
  const message = document.querySelector("#message");
  const data = `<pre>${name.value}: ${message.value}</pre>`;

  // Send composed message to the server
  connection.send(data);

  // clear input fields
  //name.value = "";
  message.value = "";
}); */

(() => {
  const f = document.querySelector("form[name='lulform']");
  f.addEventListener("submit", e => {
    e.preventDefault();
    
    const name = f.querySelector("input[placeholder='name']");
    const message = f.querySelector("input[placeholder='message']");
    
    if(name.value.length < 3 || message.value.length < 3)
    	return alert("fick dich");
      
    const data = `<p>${name.value}: ${message.value}</p>`;
    
    connection.send(data); // connection.send(data);
    
    //name.value = "";
    message.value = "";
    message.focus();
    
    const chat = document.querySelector("#chat");
    
    return false;
  });
})();
