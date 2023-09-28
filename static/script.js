const chatContent = document.getElementById('chatContent');
const chatInputs = document.getElementById('chatInputs');
const hrPulseDiv = document.querySelector('.chatcustomchange[data-type="hrPulse"]');
const itDiv = document.querySelector('.chatcustomchange[data-type="itService"]');
const travelDiv = document.querySelector('.chatcustomchange[data-type="travel"]');
const mediclaimDiv = document.querySelector('.chatcustomchange[data-type="mediclaim"]');
const faqDiv = document.querySelector('.chatcustomchange[data-type="faq"]');
const options1= ['--SELECT--','Leaves', 'medical', 'payroll', 'comp & ben', 'claims', 'ESIC', 'careers' ];
const optionsHR = ['--SELECT--','Leave balance','Holiday calendar','RM Change Request','My Current Location','Location Change Request'];
const optionsForIt = ['--SELECT--','PC Slowness','Blue Screen','Account Unlock','Password Reset','Software Installation','Software Uninstallation','Network Slowness Issue','Others'];
const optiontravel=['--SELECT--','Domestic Travel Policy','International Travel Policy','Others'];
const optionsmediclaim=['--SELECT--','My Group Policy Number','Download Group Policy','Intimation for Treatment','Others'];
const optionsfaq=['--SELECT--','List of FAQ','Others'];
let fdetails = {};
let isMuted = false;
let timer;
let activeSection = null;

hrPulseDiv.addEventListener('click', function() {
	clearTimeout(timer); 
    appendUserMessage('HR Pulse');
     if (activeSection !== null) {
        removeOptions();
    }
    askForHrPulse();
    activeSection = 'hrPulse'; 
});

itDiv.addEventListener('click', function() {
	clearTimeout(timer); 
    appendUserMessage('IT SERVICE');
	if (activeSection !== null) {
        removeOptions();
    }
   askForItService();
    activeSection = 'itService'; 
});

travelDiv.addEventListener('click', function() {
	clearTimeout(timer); 
    appendUserMessage('TRAVEL');
	if (activeSection !== null) {
        removeOptions();
    }
	askForTravel();
    activeSection = 'travel'; 
});

mediclaimDiv.addEventListener('click', function() {
	clearTimeout(timer); 
    appendUserMessage('MEDICLAIM');
	if (activeSection !== null) {
        removeOptions();
    }
	askFormediclaim();
    activeSection = 'mediclaim'; 
});

faqDiv.addEventListener('click', function() {
	clearTimeout(timer); 
    appendUserMessage('FAQ');
	if (activeSection !== null) {
        removeOptions();
    }
	askforfaq();
    activeSection = 'faq';
});

function removeOptions() {
    const botOptions = document.querySelector('.chat-messageOptions.bot-messageOptions');
    if (botOptions) {
        botOptions.remove();
    }
}

timer = setTimeout(function() {
    appendBotMessage("Is there any concern you are facing,Would you like to raise a ticket? ");
	if (activeSection !== null) {
        removeOptions();
    }
	askForYesOrNo();
    activeSection = 'hrPulse';
}, 15000);

function appendUserMessage(message) {
	const userMsg = document.createElement('div');
	userMsg.className = 'chat-message user-message';
	userMsg.textContent = message;
	chatContent.appendChild(userMsg);
	scrollToBottom();
}

function appendBotMessage(message) {
	const botMsg = document.createElement('div');
	botMsg.className = 'chat-message bot-message';
	botMsg.textContent = message;
	chatContent.appendChild(botMsg);
	textToSpeech(message);
	scrollToBottom();
}

function scrollToBottom() {
	chatContent.scrollTop = chatContent.scrollHeight;
}

function askForYesOrNo(){
	chatInputs.innerHTML = `
        <button onclick="collectYes()">Yes</button>
		<button onclick="collectNO()">No</button>
    `;
}

function collectYes(){
	chatInputs.innerHTML = ` `;
	appendUserMessage('yes');
	appendBotMessage("Which section are you facing the concern?");
	appendBotOptions(options1);
	scrollToBottom();
}

function askForHrPulse() {
    appendBotMessage('Which option do you like to choose? ');
	appendBotOptions(optionsHR);
}

function askForItService(){
	 appendBotMessage('What issue you are facing?');
	 appendBotOptions(optionsForIt);
}

function askForTravel(){
	 appendBotMessage('Which Travel policy do you want to know about?');
	 appendBotOptions(optiontravel);
}

function askFormediclaim(){
	 appendBotMessage('Which Mediclaim policy do you want to know about?');
	 appendBotOptions(optionsmediclaim);
}

function askforfaq(){
	appendBotMessage('Please select your question...');
	appendBotOptions(optionsfaq);
}


function appendBotOptions(options) {
	debugger
    const chatMessage = document.createElement('div');
    chatMessage.className = 'chat-messageOptions bot-messageOptions';

    if (options && options.length > 0) {
        const select = document.createElement('select');

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.text = option;
            select.appendChild(optionElement);
        });
		select.addEventListener('change', function () {
            const selectedOption = select.options[select.selectedIndex].text;
            appendUserMessage(selectedOption); 
			if(selectedOption=='Leave balance'){
				appendBotMessage('Redirecting you to the Hono portal....');
				window.open( 'https://3i.honohr.com/login','_blank');
			}else if(selectedOption=='claims'){
				appendBotMessage('Redirecting you to the IAssist Portal');
				window.open('http://14.141.70.64/TicketingSystem/Login.aspx','_blank');
			}else if(selectedOption=='Holiday calendar'){
				appendBotMessage('Redirecting you to the Holiday calendar');
				window.open('https://pulse.3i-infotech.com/HRIntranet/ViewDocs?t=holidaylist','_blank');
			}else if(selectedOption=='RM Change Request'||selectedOption=='My Current Location'||selectedOption=='Location Change Request'||selectedOption=='Domestic Travel Policy'||selectedOption=='International Travel Policy'||selectedOption=='PC Slowness'||selectedOption=='Blue Screen'||selectedOption=='My Group Policy Number'||selectedOption=='Others'){
				appendBotMessage('Coming Soon....');
			}
        });

        chatMessage.appendChild(select);

    } else {
        chatMessage.textContent = 'No options available.';
    }

//    chatContent.appendChild(chatMessage);
    chatInputs.appendChild(chatMessage);
    scrollToBottom();
}

function finish() {
	let HideMydiv = document.getElementById("chatInputs");
	let myDiv = document.getElementById("chat-bar-bottom");
	let btn = document.createElement("button");
	HideMydiv.style.display = "none";
	myDiv.style.display = "block";
	btn.innerHTML = "Submit";
	btn.type = "submit";
	btn.name = "formBtn";
	myDiv.appendChild(btn);
	btn.addEventListener("click", displayMessage);
	chatInputs.innerHTML = '';
}
function displayMessage() {

	const myObject = {
		applicationId: fdetails.applicationId,
		name: fdetails.name,
		state: fdetails.state,
		district: fdetails.district,
		taluka: fdetails.taluka,
		village: fdetails.village,
		surveyNumber: fdetails.surveyNumber,
		cause: fdetails.cause,
		date: fdetails.date

	};
	//sendDataToAngular(myObject);
	//document.getElementById("chat-bar-bottom").innerHTML = "Thank you for submitting your details!";
	//console.log(fdetails);
	let sucessMsg = document.getElementById("sucessMsg");
	const chatBarBottom = document.getElementById("ThankYouContainer");
	sucessMsg.style.display = "block";
	chatBarBottom.innerHTML = "🎉 Thank you for submitting your details! 🎉"; 
	chatBarBottom.style.opacity = '1';
	chatBarBottom.style.animation = 'thankYouAnimation 1s ease-out'; 
	console.log(fdetails);
}
function sendDataToAngular(data) {
	var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
	scope.receiveDataFromJS(data);
	scope.$apply();
}
function textToSpeech(text) {
	if (isMuted) {
		return; 
	}
	let synth = window.speechSynthesis;
	let utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = 'en-US'; 
	synth.speak(utterance);
}


// Start the chatbot
document.addEventListener("DOMContentLoaded", function() {
	//askForName();
});

function toggleMute() {
  isMuted = !isMuted;
  const soundImage = document.getElementById('soundImage');
  const muteImage = document.getElementById('muteImage');
  const speakImage = document.getElementById('speakImage');
  if(isMuted) {
	soundImage.style.display='none';
    muteImage.style.display = 'block';
    speakImage.style.display = 'none';
  } else {
	soundImage.style.display='none';
    muteImage.style.display = 'none';
    speakImage.style.display = 'block';
  }
}

document.getElementById("allincall-popup").addEventListener("click", function() {
	var chatbotDiv = document.querySelector(".chatbot");
	var chatboatImg = document.querySelector("#allincall-popup");
	if (chatbotDiv.style.display === "none" || chatbotDiv.style.display === "") {
		chatbotDiv.style.display = "block";
		chatboatImg.style.display = "none";
		textToSpeech("Hello I am Astor, how may I help you? Check out quick links below ");
	} else {
		initializeChatbot();
		chatbotDiv.style.display = "none";
		$(this).style.display = "block";
	}
});

document.getElementById("closeButton").addEventListener("click", function() {
	var chatbotDiv = document.querySelector(".chatbot");
	var chatboatImg = document.querySelector("#allincall-popup");
	if (chatbotDiv.style.display === "block" || chatbotDiv.style.display === "") {
		chatbotDiv.style.display = "none";
		chatboatImg.style.display = "block";
	} else {
		initializeChatbot();
		chatbotDiv.style.display = "block";
		$(this).style.display = "none";
	}
});

function initializeChatbot() {
	chatContent.innerHTML = ''; 
	//askForName();
}

document.getElementById('refreshbutton').addEventListener('click', function() {
		refreshLanguageChat('chatContent', 'chatInputs', 'chat-bar-bottom');
	});
	
function refreshLanguageChat(chatContentId, chatInputsId, chatBarBottomId) {
	debugger
    const chatContainer = document.getElementById(chatContentId);
    while (chatContainer.children.length > 2) {
        chatContainer.removeChild(chatContainer.lastChild);
    }
    document.getElementById(chatBarBottomId).style.display = 'none';
	const chatInputs = document.getElementById(chatInputsId);
    if (chatInputs.children.length > 0) {
        chatInputs.removeChild(chatInputs.lastChild);
    }
}


