///////////////////////////////////////////////////////////////////////////
//THE CLOCK
///////////////////////////////////////////////////////////////////////////
const clock = document.querySelector("#clock");
function timer(){
  let actualTime = new Date();
  let hours = actualTime.getHours().toString().padStart(2, "0");
  let minutes = actualTime.getMinutes().toString().padStart(2, "0");
  let seconds = actualTime.getSeconds().toString().padStart(2, "0");
  clock.textContent = hours + ":" + minutes + ":" + seconds;
};
setInterval(function(){timer();}, 1000);
///////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
const formulaire = document.querySelector("#formulaire");
const user = document.querySelector("#user");
const textForSend = document.querySelector("#msg");
const sendButton = document.querySelector("#form-button");
const messageBox = document.querySelector("#message-box");
const scrollBox = document.querySelector(".boxView");
const settings = document.querySelector("#settings");
let refreshControl = setInterval(function(){displayAllTouits();}, 10000);

let idCommentBuffer = 0;
let touitCommentActive = false;
let checkBoxOpened = [];

let customAPI;
let customAPIControl = false;
///////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
function displayTouit(name, message, nbLike, nbCom, ts, idNote, ipNote){

  let touitContainer = document.createElement("div");
  let touitUser = document.createElement("div");
  let touitMsgContainer = document.createElement("div");
  let touitSubContainer = document.createElement("div");
  let touitLike = document.createElement("p");
  let touitLikeButton = document.createElement("button");
  let touitDislikeButton = document.createElement("button");
  let touitComment = document.createElement("p");
  let touitCommentButton = document.createElement("button");
  let touitCommentContainer = document.createElement("div");
  
  let touitDate = document.createElement("p");
  let dadate = new Date(ts * 1000);
  let daHours = dadate.getHours().toString().padStart(2, "0");
  let daMinutes = dadate.getMinutes().toString().padStart(2, "0");
  let daDay = dadate.getDate().toString().padStart(2, "0");
  let daMonth = dadate.getMonth().toString().padStart(2, "0");

  touitContainer.className = "card";
  touitContainer.style.whiteSpace = "pre-wrap";
  touitUser.className = "card-title";
  touitMsgContainer.className = "card-text";
  touitMsgContainer.style.wordBreak = 'break-word';
  touitSubContainer.className = "card-sub";
  touitLike.className = "card-like";
  touitLikeButton.className = "card-like-button";
  touitDislikeButton.className = "card-dislike-button";
  touitComment.className = "card-like";
  touitCommentButton.className = "card-comment-button";
  touitDate.className = "card-footer";
  
  touitUser.textContent = name + ":";
  touitMsgContainer.textContent = message;
  touitLike.textContent = "Likes: " + nbLike;

  touitLikeButton.addEventListener("click", function(){
    likeATouit(idNote);
    clearInterval(refreshControl);
    refreshControl = null;
    refreshControl = setInterval(function(){displayAllTouits();}, 1000);
  });

  touitDislikeButton.addEventListener("click", function(){
    dislikeATouit(idNote);
    clearInterval(refreshControl);
    refreshControl = null;
    refreshControl = setInterval(function(){displayAllTouits();}, 1000);
  });


  touitCommentButton.addEventListener("click", function(){
    if(checkBoxOpened[idNote] !== true){
      checkBoxOpened[idNote] = true;
      idCommentBuffer = idNote;
      sendButton.className = "form-button2";
      touitContainer.className = "card2";
      touitCommentActive = true;
    } else {
      checkBoxOpened[idNote] = false;
      sendButton.className = "form-button";
      touitCommentContainer.textContent = "";
      touitCommentContainer.style.marginBottom = "0";
      touitCommentActive = false;
    }
    clearInterval(refreshControl);
    refreshControl = null;
    refreshControl = setInterval(function(){displayAllTouits();}, 1000);
  });

    // touitCommentActive = !touitCommentActive;
    if(checkBoxOpened[idNote] === true && idNote === idCommentBuffer){
      function displayAllComs(idNote){
        const request = new XMLHttpRequest();
        request.open("GET", "https://" + customAPI + "/comments/list?message_id=" + idNote, true);
        request.addEventListener("readystatechange", function() {
          if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            const response = JSON.parse(request.responseText);
            touitCommentContainer.textContent = "";
            clearInterval(refreshControl);
            refreshControl = null;
            for (let comment of response.comments){
              let commentUser = document.createElement("p");
              let commentTxt = document.createElement("p");
              let commentContainer = document.createElement("div");
              let commentDate = document.createElement("p");
              let daComdate = new Date(comment.ts * 1000);
              let daComHours = daComdate.getHours().toString().padStart(2, "0");
              let daComMinutes = daComdate.getMinutes().toString().padStart(2, "0");
              let daComDay = daComdate.getDate().toString().padStart(2, "0");
              let daComMonth = daComdate.getMonth().toString().padStart(2, "0");

              commentUser.className = "card-title";
              commentTxt.className = "card-text";
              commentContainer.className = "card";
              commentContainer.style.wordBreak = 'break-word';
              commentContainer.style.paddingBottom = "2rem";
              touitCommentContainer.style.marginBottom = "2rem";
              commentDate.className = "card-footer";

              commentUser.textContent = comment.name + ":";
              commentTxt.textContent = comment.comment;
              commentDate.textContent = daComHours + ":" + daComMinutes + " // " + daComDay + "/" + daComMonth + "/" + daComdate.getFullYear();

              commentContainer.appendChild(commentUser);
              commentContainer.appendChild(commentTxt);
              commentContainer.appendChild(commentDate);
              touitCommentContainer.appendChild(commentContainer);
              touitContainer.appendChild(touitCommentContainer);
              // console.log(comment.ts)
            }
          }
        });
        request.send();
      }
      displayAllComs(idNote);
    };
    
  

  touitComment.textContent = "Coms: " + nbCom;
  touitDate.textContent = ipNote + "///" + daHours + ":" + daMinutes + " // " + daDay + "/" + daMonth + "/" + dadate.getFullYear();
  
  touitContainer.appendChild(touitUser);
  touitContainer.appendChild(touitMsgContainer);
  touitContainer.appendChild(touitDate);
  touitSubContainer.appendChild(touitLike);
  touitSubContainer.appendChild(touitLikeButton);
  touitSubContainer.appendChild(touitDislikeButton);
  touitSubContainer.appendChild(touitComment);
  touitSubContainer.appendChild(touitCommentButton);
  touitContainer.appendChild(touitSubContainer);
  messageBox.appendChild(touitContainer);
};
displayAllTouits();
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
function addNote(){
  if (customAPIControl === true){
    customAPI = textForSend.value;
    let touitContainer = document.createElement("div");
    touitContainer.className = "card";
    touitContainer.style.color = "#fff";
    
    
    const request = new XMLHttpRequest();
    request.open("GET", "https://" + customAPI + "/list", true);
    request.addEventListener("readystatechange", function() {
      if(request.readyState === XMLHttpRequest.LOADING){
        messageBox.textContent = "";
        touitContainer.textContent = "Loading...";
        messageBox.appendChild(touitContainer);
      }else if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        messageBox.textContent = "";
        touitContainer.textContent = "Connected!";
        messageBox.appendChild(touitContainer);
        customAPIControl = false;
        displayAllTouits();
        refreshControl = setInterval(function(){displayAllTouits();}, 10000);
      }
    });
  request.send();
  }


  if(!touitCommentActive){
    const request = new XMLHttpRequest();
    // alert(request.status);
    request.open("POST", "https://" + customAPI + "/send", true);
    request.setRequestHeader( "Content-type", "application/x-www-form-urlencoded");
    request.send("name=" + user.value + "&message=" + textForSend.value);
    event.preventDefault();
    // event.stopPropagation();
    displayAllTouits();
  } else if(touitCommentActive){
    const request = new XMLHttpRequest();
    request.open("POST", "https://" + customAPI + "/comments/send", true);
    request.setRequestHeader( "Content-type", "application/x-www-form-urlencoded");
    
    request.send("message_id=" + idCommentBuffer + "&name=" + user.value + "&comment=" + textForSend.value);
    event.preventDefault();
    event.stopPropagation();

    clearInterval(refreshControl);
    refreshControl = null;
    displayAllTouits();    
  }

}



///****************************************************** */
///****************************************************** */
///****************************************************** */
formulaire.addEventListener('submit', addNote);
///****************************************************** */
///****************************************************** */
///****************************************************** */
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
function likeATouit(idLike){
  const request = new XMLHttpRequest();
  request.open("PUT", "https://" + customAPI + "/likes/send", true);
  request.setRequestHeader( "Content-type", "application/x-www-form-urlencoded");
  request.send("message_id=" + idLike);
}
///////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
function dislikeATouit(idDislike){
  const request = new XMLHttpRequest();
  request.open("DELETE", "https://" + customAPI + "/likes/remove", true);
  request.setRequestHeader( "Content-type", "application/x-www-form-urlencoded");
  request.send("message_id=" + idDislike);
}
///////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
function displayAllTouits(){
  if (customAPI === undefined){
    clearInterval(refreshControl);
    refreshControl = null;
    let touitContainer = document.createElement("div");
    touitContainer.className = "card";
    touitContainer.style.color = "#fff";
    touitContainer.textContent = "Enter an URL";
    messageBox.appendChild(touitContainer);

  }
  else if (customAPI !== undefined){
    const request = new XMLHttpRequest();
    request.open("GET", "https://" + customAPI + "/list", true);
    request.addEventListener("readystatechange", function() {
      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        const response = JSON.parse(request.responseText);
        messageBox.textContent = "";
        for (let touit of response.messages){
          displayTouit(touit.name, touit.message, touit.likes, touit.comments_count, touit.ts, touit.id, touit.ip)
        }
      }
    });
    request.send();
  }

}
///////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
scrollBox.addEventListener('scroll', function(){
  let position = messageBox.getBoundingClientRect();
  if (position.y < 92){
    clearInterval(refreshControl);
    refreshControl = null;
  } else if (refreshControl === null){
    refreshControl = setInterval(function(){displayAllTouits();}, 10000);
  }
});
///////////////////////////////////////////////////////////////////////////


settings.addEventListener("click", function(){
  customAPIControl = true;
  clearInterval(refreshControl);
  refreshControl = null;
});
